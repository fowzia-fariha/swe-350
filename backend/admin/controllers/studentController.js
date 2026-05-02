import pool from '../../db/connection.js';

// GET all students with details
export const getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, u.is_active, u.created_at,
             s.department, s.semester, s.batch_year, s.cgpa, s.attendance_percent, s.roll_number
      FROM users u
      JOIN students s ON u.user_id = s.user_id
      WHERE u.role = 'student'
      ORDER BY u.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET single student by ID
export const getStudentById = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, u.is_active, u.created_at,
             s.department, s.semester, s.batch_year, s.cgpa, s.attendance_percent, s.roll_number,
             s.phone_number, s.address, s.date_of_birth, s.guardian_name, s.guardian_phone
      FROM users u
      JOIN students s ON u.user_id = s.user_id
      WHERE u.user_id = ? AND u.role = 'student'
    `, [req.params.userId]);
    
    if (!rows.length) return res.status(404).json({ error: 'Student not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE new student
export const createStudent = async (req, res) => {
  const { 
    name, email, password, 
    department, semester, batch_year, roll_number,
    phone_number, address, date_of_birth, guardian_name, guardian_phone 
  } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Generate student_id
    const year = batch_year || new Date().getFullYear();
    const [[countRow]] = await conn.query(
      "SELECT COUNT(*) as cnt FROM users WHERE role = 'student'"
    );
    const seq = String(countRow.cnt + 1).padStart(4, '0');
    const user_id = `ST${year}${seq}`;

    // Hash password
    const bcrypt = await import('bcrypt');
    const password_hash = await bcrypt.hash(password, 10);
    
    // Insert into users table
    await conn.query(
      'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, name, email, password_hash, 'student', 1]
    );
    
    // Insert into students table
    await conn.query(`
      INSERT INTO students (user_id, department, semester, batch_year, roll_number, 
                           phone_number, address, date_of_birth, guardian_name, guardian_phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_id, department || null, semester || null, year, roll_number || null,
        phone_number || null, address || null, date_of_birth || null, guardian_name || null, guardian_phone || null]);

    await conn.commit();
    res.status(201).json({ message: 'Student created successfully', user_id });
  } catch (error) {
    await conn.rollback();
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email or Roll Number already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
};

// UPDATE student
export const updateStudent = async (req, res) => {
  const { 
    name, email, is_active, department, semester, batch_year, 
    cgpa, attendance_percent, roll_number, phone_number, address,
    date_of_birth, guardian_name, guardian_phone 
  } = req.body;
  
  try {
    // Update users table
    await pool.query(
      'UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?',
      [name, email, is_active, req.params.userId]
    );
    
    // Update students table
    await pool.query(`
      UPDATE students 
      SET department = ?, semester = ?, batch_year = ?, cgpa = ?, 
          attendance_percent = ?, roll_number = ?, phone_number = ?,
          address = ?, date_of_birth = ?, guardian_name = ?, guardian_phone = ?
      WHERE user_id = ?
    `, [department, semester, batch_year, cgpa, attendance_percent, roll_number,
        phone_number, address, date_of_birth, guardian_name, guardian_phone, req.params.userId]);
    
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE student
export const deleteStudent = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    
    // Delete enrollments first
    await conn.query('DELETE FROM enrollments WHERE student_user_id = ?', [req.params.userId]);
    
    // Delete from students table
    await conn.query('DELETE FROM students WHERE user_id = ?', [req.params.userId]);
    
    // Delete from users table
    await conn.query('DELETE FROM users WHERE user_id = ?', [req.params.userId]);
    
    await conn.commit();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
};

// GET student enrollments
export const getStudentEnrollments = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.id, c.course_code, c.course_name, c.credits, c.semester, 
             e.enrolled_at, e.status, e.grade
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_user_id = ?
      ORDER BY e.enrolled_at DESC
    `, [req.params.userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET student results
export const getStudentResults = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, c.course_code, c.course_name, c.credits, r.grade, r.semester, r.status
      FROM results r
      JOIN courses c ON r.course_id = c.id
      WHERE r.student_user_id = ?
      ORDER BY r.semester DESC
    `, [req.params.userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET student GPA
export const getStudentGPA = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ROUND(AVG(CASE 
          WHEN grade = 'A+' THEN 4.0
          WHEN grade = 'A' THEN 4.0
          WHEN grade = 'A-' THEN 3.7
          WHEN grade = 'B+' THEN 3.3
          WHEN grade = 'B' THEN 3.0
          WHEN grade = 'B-' THEN 2.7
          WHEN grade = 'C+' THEN 2.3
          WHEN grade = 'C' THEN 2.0
          WHEN grade = 'C-' THEN 1.7
          WHEN grade = 'D' THEN 1.0
          WHEN grade = 'F' THEN 0.0
          ELSE NULL
        END), 2) as cgpa,
        COUNT(*) as total_courses,
        SUM(CASE WHEN grade NOT IN ('F', 'D') THEN 1 ELSE 0 END) as passed_courses
      FROM results
      WHERE student_user_id = ? AND status = 'published'
    `, [req.params.userId]);
    
    res.json({
      cgpa: rows[0].cgpa || 0,
      total_courses: rows[0].total_courses || 0,
      passed_courses: rows[0].passed_courses || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET student statistics
export const getStudentStats = async (req, res) => {
  try {
    const [[total]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const [[active]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
    const [[byDepartment]] = await pool.query(`
      SELECT department, COUNT(*) as count 
      FROM students 
      GROUP BY department
    `);
    const [[byYear]] = await pool.query(`
      SELECT batch_year as year, COUNT(*) as count 
      FROM students 
      GROUP BY batch_year 
      ORDER BY batch_year DESC
    `);
    
    res.json({
      total: total.count,
      active: active.count,
      byDepartment,
      byYear
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE student attendance
export const updateAttendance = async (req, res) => {
  const { attendance_percent } = req.body;
  
  try {
    await pool.query(
      'UPDATE students SET attendance_percent = ? WHERE user_id = ?',
      [attendance_percent, req.params.userId]
    );
    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE student CGPA
export const updateCGPA = async (req, res) => {
  const { cgpa } = req.body;
  
  try {
    await pool.query(
      'UPDATE students SET cgpa = ? WHERE user_id = ?',
      [cgpa, req.params.userId]
    );
    res.json({ message: 'CGPA updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
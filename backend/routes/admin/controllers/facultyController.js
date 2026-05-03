import pool from '../../db/connection.js';

// GET all faculty members with details
export const getAllFaculty = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, u.is_active, u.created_at,
             f.department, f.designation, f.specialization, f.qualification, 
             f.joining_date, f.office_hours, f.research_area, f.phone_extension
      FROM users u
      JOIN faculty f ON u.user_id = f.user_id
      WHERE u.role = 'teacher'
      ORDER BY u.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET single faculty by ID
export const getFacultyById = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, u.is_active, u.created_at,
             f.department, f.designation, f.specialization, f.qualification, 
             f.joining_date, f.office_hours, f.research_area, f.phone_extension,
             f.office_location, f.website, f.bio
      FROM users u
      JOIN faculty f ON u.user_id = f.user_id
      WHERE u.user_id = ? AND u.role = 'teacher'
    `, [req.params.userId]);
    
    if (!rows.length) return res.status(404).json({ error: 'Faculty not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE new faculty member
export const createFaculty = async (req, res) => {
  const { 
    name, email, password, 
    department, designation, specialization, qualification,
    joining_date, office_hours, research_area, phone_extension,
    office_location, website, bio
  } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Generate faculty ID
    const year = new Date().getFullYear();
    const [[countRow]] = await conn.query(
      "SELECT COUNT(*) as cnt FROM users WHERE role = 'teacher'"
    );
    const seq = String(countRow.cnt + 1).padStart(4, '0');
    const user_id = `TC${year}${seq}`;

    // Hash password
    const bcrypt = await import('bcrypt');
    const password_hash = await bcrypt.hash(password, 10);
    
    // Insert into users table
    await conn.query(
      'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, name, email, password_hash, 'teacher', 1]
    );
    
    // Insert into faculty table
    await conn.query(`
      INSERT INTO faculty (
        user_id, department, designation, specialization, qualification, 
        joining_date, office_hours, research_area, phone_extension,
        office_location, website, bio
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_id, department || null, designation || null, specialization || null, 
        qualification || null, joining_date || null, office_hours || null, 
        research_area || null, phone_extension || null, office_location || null, 
        website || null, bio || null]);

    await conn.commit();
    res.status(201).json({ message: 'Faculty created successfully', user_id });
  } catch (error) {
    await conn.rollback();
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
};

// UPDATE faculty member
export const updateFaculty = async (req, res) => {
  const { 
    name, email, is_active, 
    department, designation, specialization, qualification,
    joining_date, office_hours, research_area, phone_extension,
    office_location, website, bio
  } = req.body;
  
  try {
    // Update users table
    await pool.query(
      'UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?',
      [name, email, is_active !== undefined ? is_active : 1, req.params.userId]
    );
    
    // Update faculty table
    await pool.query(`
      UPDATE faculty 
      SET department = ?, designation = ?, specialization = ?, qualification = ?,
          joining_date = ?, office_hours = ?, research_area = ?, phone_extension = ?,
          office_location = ?, website = ?, bio = ?
      WHERE user_id = ?
    `, [department, designation, specialization, qualification, joining_date, 
        office_hours, research_area, phone_extension, office_location, website, bio, 
        req.params.userId]);
    
    res.json({ message: 'Faculty updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE faculty member
export const deleteFaculty = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    
    // Delete faculty_courses assignments first
    await conn.query('DELETE FROM faculty_courses WHERE faculty_user_id = ?', [req.params.userId]);
    
    // Delete from faculty table
    await conn.query('DELETE FROM faculty WHERE user_id = ?', [req.params.userId]);
    
    // Delete from users table
    await conn.query('DELETE FROM users WHERE user_id = ?', [req.params.userId]);
    
    await conn.commit();
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
};

// GET faculty assigned courses
export const getFacultyCourses = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT fc.id, c.course_code, c.course_name, c.credits, c.semester, 
             fc.section, fc.schedule, fc.room_number, fc.assigned_at
      FROM faculty_courses fc
      JOIN courses c ON fc.course_id = c.id
      WHERE fc.faculty_user_id = ?
      ORDER BY c.semester DESC
    `, [req.params.userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ASSIGN course to faculty
export const assignCourse = async (req, res) => {
  const { course_id, section, schedule, room_number } = req.body;
  
  if (!course_id) {
    return res.status(400).json({ error: 'Course ID is required' });
  }
  
  try {
    // Check if already assigned
    const [existing] = await pool.query(`
      SELECT id FROM faculty_courses 
      WHERE faculty_user_id = ? AND course_id = ?
    `, [req.params.userId, course_id]);
    
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Course already assigned to this faculty' });
    }
    
    const [result] = await pool.query(`
      INSERT INTO faculty_courses (faculty_user_id, course_id, section, schedule, room_number)
      VALUES (?, ?, ?, ?, ?)
    `, [req.params.userId, course_id, section || null, schedule || null, room_number || null]);
    
    res.status(201).json({ 
      message: 'Course assigned successfully',
      assignment_id: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// REMOVE course assignment
export const removeCourseAssignment = async (req, res) => {
  try {
    await pool.query('DELETE FROM faculty_courses WHERE id = ?', [req.params.assignmentId]);
    res.json({ message: 'Course assignment removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET faculty statistics for dashboard
export const getFacultyStats = async (req, res) => {
  try {
    const [[total]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher'");
    
    const [[active]] = await pool.query(`
      SELECT COUNT(*) as count FROM users 
      WHERE role = 'teacher' AND is_active = 1
    `);
    
    const [byDepartment] = await pool.query(`
      SELECT department, COUNT(*) as count 
      FROM faculty 
      GROUP BY department
    `);
    
    const [byDesignation] = await pool.query(`
      SELECT designation, COUNT(*) as count 
      FROM faculty 
      WHERE designation IS NOT NULL
      GROUP BY designation
    `);
    
    const [topCourseLoad] = await pool.query(`
      SELECT f.user_id, u.name, COUNT(fc.course_id) as course_count
      FROM faculty f
      JOIN users u ON f.user_id = u.user_id
      LEFT JOIN faculty_courses fc ON f.user_id = fc.faculty_user_id
      GROUP BY f.user_id, u.name
      ORDER BY course_count DESC
      LIMIT 5
    `);
    
    const [recentFaculty] = await pool.query(`
      SELECT u.name, u.user_id, f.department, f.designation, u.created_at
      FROM faculty f
      JOIN users u ON f.user_id = u.user_id
      ORDER BY u.created_at DESC
      LIMIT 5
    `);
    
    res.json({
      total: total.count,
      active: active.count,
      byDepartment,
      byDesignation,
      topCourseLoad,
      recentFaculty
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET faculty availability (office hours)
export const getFacultyAvailability = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.name, u.user_id, f.office_hours, f.office_location, f.phone_extension
      FROM faculty f
      JOIN users u ON f.user_id = u.user_id
      WHERE f.office_hours IS NOT NULL
      ORDER BY u.name
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE faculty office hours
export const updateOfficeHours = async (req, res) => {
  const { office_hours } = req.body;
  
  try {
    await pool.query(
      'UPDATE faculty SET office_hours = ? WHERE user_id = ?',
      [office_hours, req.params.userId]
    );
    res.json({ message: 'Office hours updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET faculty by department
export const getFacultyByDepartment = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, f.designation, f.specialization, f.office_hours
      FROM users u
      JOIN faculty f ON u.user_id = f.user_id
      WHERE f.department = ? AND u.is_active = 1
      ORDER BY u.name
    `, [req.params.department]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET faculty course load summary
export const getFacultyCourseLoad = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.user_id, u.name, 
        COUNT(fc.course_id) as total_courses,
        GROUP_CONCAT(DISTINCT c.course_code ORDER BY c.course_code SEPARATOR ', ') as course_codes
      FROM faculty f
      JOIN users u ON f.user_id = u.user_id
      LEFT JOIN faculty_courses fc ON f.user_id = fc.faculty_user_id
      LEFT JOIN courses c ON fc.course_id = c.id
      GROUP BY u.user_id, u.name
      ORDER BY total_courses DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
import pool from '../../db/connection.js';

export const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, u.name as teacher_name 
      FROM courses c 
      LEFT JOIN users u ON c.teacher_user_id = u.user_id
      ORDER BY c.created_at DESC
    `);
    res.json(rows);
  } catch { res.status(500).json({ error: 'Server error' }); }
};

export const createCourse = async (req, res) => {
  const { course_code, course_name, department, credits, teacher_user_id, semester } = req.body;
  if (!course_code || !course_name) return res.status(400).json({ error: 'course_code and course_name required' });
  try {
    await pool.query(
      'INSERT INTO courses (course_code, course_name, department, credits, teacher_user_id, semester) VALUES (?,?,?,?,?,?)',
      [course_code, course_name, department, credits || 3, teacher_user_id || null, semester || null]
    );
    res.status(201).json({ message: 'Course created' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Course code already exists' });
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCourse = async (req, res) => {
  const { course_name, department, credits, teacher_user_id, semester, is_active } = req.body;
  try {
    await pool.query(
      'UPDATE courses SET course_name=?, department=?, credits=?, teacher_user_id=?, semester=?, is_active=? WHERE id=?',
      [course_name, department, credits, teacher_user_id, semester, is_active, req.params.id]
    );
    res.json({ message: 'Course updated' });
  } catch { res.status(500).json({ error: 'Server error' }); }
};

export const deleteCourse = async (req, res) => {
  try {
    await pool.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
    res.json({ message: 'Course deleted' });
  } catch { res.status(500).json({ error: 'Server error' }); }
};
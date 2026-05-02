import express from 'express';
import pool from '../../db/connection.js';
import { verifyToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

// Summary report
router.get('/summary', async (req, res) => {
  try {
    const [[students]] = await pool.query("SELECT COUNT(*) as total FROM users WHERE role='student'");
    const [[teachers]] = await pool.query("SELECT COUNT(*) as total FROM users WHERE role='teacher'");
    const [[courses]] = await pool.query("SELECT COUNT(*) as total FROM courses");
    const [[enrollments]] = await pool.query("SELECT COUNT(*) as total FROM enrollments");
    const [topCourses] = await pool.query(`
      SELECT c.course_name, COUNT(e.id) as enrolled
      FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.id ORDER BY enrolled DESC LIMIT 5
    `);
    res.json({ students: students.total, teachers: teachers.total, courses: courses.total, enrollments: enrollments.total, topCourses });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

export default router;
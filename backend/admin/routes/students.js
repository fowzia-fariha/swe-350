import express from 'express';
import pool from '../../db/connection.js';
import { verifyToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

// Get all students with details
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, u.is_active, u.created_at,
             s.department, s.semester, s.batch_year, s.cgpa, s.attendance_percent, s.roll_number
      FROM users u
      JOIN students s ON u.user_id = s.user_id
      ORDER BY u.created_at DESC
    `);
    res.json(rows);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// Get student enrollments
router.get('/:userId/enrollments', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.course_code, c.course_name, c.credits, e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_user_id = ?
    `, [req.params.userId]);
    res.json(rows);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

export default router;
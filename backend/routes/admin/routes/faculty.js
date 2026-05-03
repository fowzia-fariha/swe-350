import express from 'express';
import pool from '../../db/connection.js';
import { verifyToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

// Get all faculty members with details
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, u.is_active, u.created_at,
             f.department, f.designation, f.specialization, f.qualification, f.joining_date,
             f.office_hours, f.research_area, f.phone_extension
      FROM users u
      JOIN faculty f ON u.user_id = f.user_id
      ORDER BY u.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single faculty by ID
router.get('/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, u.is_active, u.created_at,
             f.department, f.designation, f.specialization, f.qualification, f.joining_date,
             f.office_hours, f.research_area, f.phone_extension
      FROM users u
      JOIN faculty f ON u.user_id = f.user_id
      WHERE u.user_id = ?
    `, [req.params.userId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get faculty assigned courses
router.get('/:userId/courses', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.course_code, c.course_name, c.credits, c.semester, c.academic_year,
             fc.section, fc.schedule, fc.room_number, fc.assigned_at
      FROM faculty_courses fc
      JOIN courses c ON fc.course_id = c.id
      WHERE fc.faculty_user_id = ?
      ORDER BY c.academic_year DESC, c.semester DESC
    `, [req.params.userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Assign course to faculty
router.post('/:userId/courses', async (req, res) => {
  const { course_id, section, schedule, room_number } = req.body;
  
  try {
    const [result] = await pool.query(`
      INSERT INTO faculty_courses (faculty_user_id, course_id, section, schedule, room_number)
      VALUES (?, ?, ?, ?, ?)
    `, [req.params.userId, course_id, section, schedule, room_number]);
    
    res.status(201).json({ 
      message: 'Course assigned successfully',
      assignment_id: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove course assignment
router.delete('/courses/:assignmentId', async (req, res) => {
  try {
    await pool.query(`DELETE FROM faculty_courses WHERE id = ?`, [req.params.assignmentId]);
    res.json({ message: 'Course assignment removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update faculty details
router.put('/:userId', async (req, res) => {
  const { department, designation, specialization, qualification, office_hours, research_area, phone_extension } = req.body;
  
  try {
    await pool.query(`
      UPDATE faculty 
      SET department = ?, designation = ?, specialization = ?, 
          qualification = ?, office_hours = ?, research_area = ?, phone_extension = ?
      WHERE user_id = ?
    `, [department, designation, specialization, qualification, office_hours, research_area, phone_extension, req.params.userId]);
    
    res.json({ message: 'Faculty updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get faculty statistics (dashboard)
router.get('/stats/summary', async (req, res) => {
  try {
    const [total] = await pool.query(`SELECT COUNT(*) as total FROM faculty`);
    const [active] = await pool.query(`
      SELECT COUNT(*) as active FROM faculty f 
      JOIN users u ON f.user_id = u.user_id 
      WHERE u.is_active = 1
    `);
    const [byDepartment] = await pool.query(`
      SELECT department, COUNT(*) as count 
      FROM faculty 
      GROUP BY department
    `);
    const [courseLoad] = await pool.query(`
      SELECT f.user_id, u.name, COUNT(fc.course_id) as course_count
      FROM faculty f
      JOIN users u ON f.user_id = u.user_id
      LEFT JOIN faculty_courses fc ON f.user_id = fc.faculty_user_id
      GROUP BY f.user_id, u.name
      ORDER BY course_count DESC
      LIMIT 5
    `);
    
    res.json({
      total: total[0].total,
      active: active[0].active,
      byDepartment,
      topCourseLoad: courseLoad
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new faculty member
router.post('/', async (req, res) => {
  const { user_id, department, designation, specialization, qualification, joining_date, office_hours, research_area, phone_extension } = req.body;
  
  try {
    const [result] = await pool.query(`
      INSERT INTO faculty (user_id, department, designation, specialization, qualification, joining_date, office_hours, research_area, phone_extension)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_id, department, designation, specialization, qualification, joining_date, office_hours, research_area, phone_extension]);
    
    res.status(201).json({ 
      message: 'Faculty added successfully',
      faculty_id: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete faculty member
router.delete('/:userId', async (req, res) => {
  try {
    await pool.query(`DELETE FROM faculty WHERE user_id = ?`, [req.params.userId]);
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
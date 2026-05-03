import express from 'express';
import pool from '../../db/connection.js';
import { verifyToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

// Get all results with student and course details
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, r.student_user_id, r.course_id, r.grade, r.semester, r.status, 
             r.created_at, r.updated_at,
             u.name as student_name,
             c.course_code, c.course_name, c.credits
      FROM results r
      JOIN users u ON r.student_user_id = u.user_id
      JOIN courses c ON r.course_id = c.id
      ORDER BY r.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get results by student ID
router.get('/student/:studentId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, r.course_id, r.grade, r.semester, r.status,
             c.course_code, c.course_name, c.credits
      FROM results r
      JOIN courses c ON r.course_id = c.id
      WHERE r.student_user_id = ?
      ORDER BY r.semester DESC, c.course_code ASC
    `, [req.params.studentId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get results by course ID
router.get('/course/:courseId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, r.student_user_id, r.grade, r.semester, r.status,
             u.name as student_name, u.email
      FROM results r
      JOIN users u ON r.student_user_id = u.user_id
      WHERE r.course_id = ?
      ORDER BY u.name ASC
    `, [req.params.courseId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single result by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, r.student_user_id, r.course_id, r.grade, r.semester, r.status,
             u.name as student_name,
             c.course_code, c.course_name, c.credits
      FROM results r
      JOIN users u ON r.student_user_id = u.user_id
      JOIN courses c ON r.course_id = c.id
      WHERE r.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new result
router.post('/', async (req, res) => {
  const { student_id, course_id, grade, semester } = req.body;
  
  if (!student_id || !course_id || !grade) {
    return res.status(400).json({ error: 'Student ID, Course ID, and Grade are required' });
  }
  
  try {
    // Check if result already exists
    const [existing] = await pool.query(`
      SELECT id FROM results 
      WHERE student_user_id = ? AND course_id = ? AND semester = ?
    `, [student_id, course_id, semester || '']);
    
    if (existing.length > 0) {
      // Update existing result
      await pool.query(`
        UPDATE results 
        SET grade = ?, updated_at = CURRENT_TIMESTAMP
        WHERE student_user_id = ? AND course_id = ? AND semester = ?
      `, [grade, student_id, course_id, semester || '']);
      
      return res.json({ message: 'Result updated successfully' });
    }
    
    // Insert new result
    const [result] = await pool.query(`
      INSERT INTO results (student_user_id, course_id, grade, semester, status)
      VALUES (?, ?, ?, ?, 'published')
    `, [student_id, course_id, grade, semester || '']);
    
    res.status(201).json({ 
      message: 'Result added successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update result
router.put('/:id', async (req, res) => {
  const { grade, semester, status } = req.body;
  
  try {
    const [result] = await pool.query(`
      UPDATE results 
      SET grade = ?, semester = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [grade, semester, status, req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }
    
    res.json({ message: 'Result updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete result
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(`DELETE FROM results WHERE id = ?`, [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }
    
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get student GPA and summary
router.get('/student/:studentId/summary', async (req, res) => {
  try {
    // Get GPA calculation
    const [gpaResult] = await pool.query(`
      SELECT 
        AVG(CASE 
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
        END) as gpa,
        COUNT(*) as total_courses,
        SUM(CASE WHEN grade IN ('A+','A','A-','B+','B','B-','C+','C','C-') THEN 1 ELSE 0 END) as passed_courses
      FROM results
      WHERE student_user_id = ? AND status = 'published'
    `, [req.params.studentId]);
    
    res.json({
      gpa: parseFloat(gpaResult[0].gpa || 0).toFixed(2),
      total_courses: gpaResult[0].total_courses || 0,
      passed_courses: gpaResult[0].passed_courses || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk upload results
router.post('/bulk', async (req, res) => {
  const { results } = req.body;
  
  if (!results || !Array.isArray(results) || results.length === 0) {
    return res.status(400).json({ error: 'Results array is required' });
  }
  
  try {
    const inserted = [];
    const updated = [];
    
    for (const item of results) {
      const { student_id, course_id, grade, semester } = item;
      
      if (!student_id || !course_id || !grade) continue;
      
      const [existing] = await pool.query(`
        SELECT id FROM results 
        WHERE student_user_id = ? AND course_id = ? AND semester = ?
      `, [student_id, course_id, semester || '']);
      
      if (existing.length > 0) {
        await pool.query(`
          UPDATE results 
          SET grade = ?, updated_at = CURRENT_TIMESTAMP
          WHERE student_user_id = ? AND course_id = ? AND semester = ?
        `, [grade, student_id, course_id, semester || '']);
        updated.push({ student_id, course_id });
      } else {
        await pool.query(`
          INSERT INTO results (student_user_id, course_id, grade, semester, status)
          VALUES (?, ?, ?, ?, 'published')
        `, [student_id, course_id, grade, semester || '']);
        inserted.push({ student_id, course_id });
      }
    }
    
    res.json({ 
      message: 'Bulk upload completed',
      inserted: inserted.length,
      updated: updated.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get grade distribution for a course
router.get('/course/:courseId/distribution', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT grade, COUNT(*) as count
      FROM results
      WHERE course_id = ? AND status = 'published'
      GROUP BY grade
      ORDER BY 
        FIELD(grade, 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F')
    `, [req.params.courseId]);
    
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
import express from 'express';
import pool from '../../db/connection.js';
import { verifyToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

// Get all calendar events
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, created_by, created_at, updated_at
      FROM academic_calendar
      ORDER BY date ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date
      FROM academic_calendar
      WHERE date >= CURDATE()
      ORDER BY date ASC
      LIMIT 10
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get events by date range
router.get('/range', async (req, res) => {
  const { start_date, end_date } = req.query;
  
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date
      FROM academic_calendar
      WHERE date BETWEEN ? AND ?
      ORDER BY date ASC
    `, [start_date, end_date]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, created_by, created_at, updated_at
      FROM academic_calendar
      WHERE id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new calendar event
router.post('/', async (req, res) => {
  const { title, description, date } = req.body;
  
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }
  
  try {
    const [result] = await pool.query(`
      INSERT INTO academic_calendar (title, description, date, created_by)
      VALUES (?, ?, ?, ?)
    `, [title, description || '', date, req.user.user_id]);
    
    res.status(201).json({ 
      message: 'Event added successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update calendar event
router.put('/:id', async (req, res) => {
  const { title, description, date } = req.body;
  
  try {
    const [result] = await pool.query(`
      UPDATE academic_calendar
      SET title = ?, description = ?, date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, description || '', date, req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete calendar event
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(`DELETE FROM academic_calendar WHERE id = ?`, [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get calendar statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const [total] = await pool.query(`SELECT COUNT(*) as total FROM academic_calendar`);
    
    const [upcoming] = await pool.query(`
      SELECT COUNT(*) as upcoming 
      FROM academic_calendar 
      WHERE date >= CURDATE()
    `);
    
    const [past] = await pool.query(`
      SELECT COUNT(*) as past 
      FROM academic_calendar 
      WHERE date < CURDATE()
    `);
    
    const [thisMonth] = await pool.query(`
      SELECT COUNT(*) as this_month 
      FROM academic_calendar 
      WHERE MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
    `);
    
    const [nextMonth] = await pool.query(`
      SELECT COUNT(*) as next_month 
      FROM academic_calendar 
      WHERE date BETWEEN DATE_ADD(CURDATE(), INTERVAL 1 MONTH) AND DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
    `);
    
    res.json({
      total: total[0].total,
      upcoming: upcoming[0].upcoming,
      past: past[0].past,
      thisMonth: thisMonth[0].this_month,
      nextMonth: nextMonth[0].next_month
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk delete events
router.delete('/bulk/delete', async (req, res) => {
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Event IDs array is required' });
  }
  
  try {
    const placeholders = ids.map(() => '?').join(',');
    await pool.query(`DELETE FROM academic_calendar WHERE id IN (${placeholders})`, ids);
    res.json({ message: `${ids.length} events deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
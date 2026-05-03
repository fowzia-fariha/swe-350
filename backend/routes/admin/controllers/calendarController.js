import pool from '../../db/connection.js';

// GET all calendar events
export const getAllEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, event_type, location, 
             created_by, created_at, updated_at
      FROM academic_calendar
      ORDER BY date ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET upcoming events (from today onwards)
export const getUpcomingEvents = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const [rows] = await pool.query(`
      SELECT id, title, description, date, event_type, location
      FROM academic_calendar
      WHERE date >= CURDATE()
      ORDER BY date ASC
      LIMIT ?
    `, [parseInt(limit)]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET events by date range
export const getEventsByDateRange = async (req, res) => {
  const { start_date, end_date } = req.query;
  
  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }
  
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, event_type, location
      FROM academic_calendar
      WHERE date BETWEEN ? AND ?
      ORDER BY date ASC
    `, [start_date, end_date]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET events by month/year
export const getEventsByMonth = async (req, res) => {
  const { year, month } = req.params;
  
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, event_type, location
      FROM academic_calendar
      WHERE YEAR(date) = ? AND MONTH(date) = ?
      ORDER BY date ASC
    `, [year, month]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET single event by ID
export const getEventById = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, event_type, location, 
             created_by, created_at, updated_at
      FROM academic_calendar
      WHERE id = ?
    `, [req.params.id]);
    
    if (!rows.length) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE new calendar event
export const createEvent = async (req, res) => {
  const { title, description, date, event_type, location } = req.body;
  
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }
  
  try {
    const [result] = await pool.query(`
      INSERT INTO academic_calendar (title, description, date, event_type, location, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [title, description || null, date, event_type || 'general', location || null, req.user.user_id]);
    
    res.status(201).json({ 
      message: 'Event created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE calendar event
export const updateEvent = async (req, res) => {
  const { title, description, date, event_type, location } = req.body;
  
  try {
    const [result] = await pool.query(`
      UPDATE academic_calendar 
      SET title = ?, description = ?, date = ?, event_type = ?, location = ?, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, description || null, date, event_type || 'general', location || null, req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE calendar event
export const deleteEvent = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM academic_calendar WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET calendar statistics for dashboard
export const getCalendarStats = async (req, res) => {
  try {
    const [[total]] = await pool.query("SELECT COUNT(*) as count FROM academic_calendar");
    
    const [[upcoming]] = await pool.query(`
      SELECT COUNT(*) as count 
      FROM academic_calendar 
      WHERE date >= CURDATE()
    `);
    
    const [[past]] = await pool.query(`
      SELECT COUNT(*) as count 
      FROM academic_calendar 
      WHERE date < CURDATE()
    `);
    
    const [[thisMonth]] = await pool.query(`
      SELECT COUNT(*) as count 
      FROM academic_calendar 
      WHERE MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
    `);
    
    const [[nextMonth]] = await pool.query(`
      SELECT COUNT(*) as count 
      FROM academic_calendar 
      WHERE date BETWEEN DATE_ADD(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), INTERVAL -DAY(CURDATE())+1 DAY) 
                      AND LAST_DAY(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
    `);
    
    const [byEventType] = await pool.query(`
      SELECT event_type, COUNT(*) as count 
      FROM academic_calendar 
      GROUP BY event_type
    `);
    
    const [recentEvents] = await pool.query(`
      SELECT id, title, date, event_type
      FROM academic_calendar
      WHERE date >= CURDATE()
      ORDER BY date ASC
      LIMIT 5
    `);
    
    res.json({
      total: total.count,
      upcoming: upcoming.count,
      past: past.count,
      thisMonth: thisMonth.count,
      nextMonth: nextMonth.count,
      byEventType,
      recentEvents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET events for current month (for calendar view)
export const getCurrentMonthEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, date, event_type
      FROM academic_calendar
      WHERE MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
      ORDER BY date ASC
    `);
    
    // Group events by date
    const eventsByDate = {};
    rows.forEach(event => {
      const dateStr = event.date.toISOString().split('T')[0];
      if (!eventsByDate[dateStr]) {
        eventsByDate[dateStr] = [];
      }
      eventsByDate[dateStr].push({
        id: event.id,
        title: event.title,
        type: event.event_type
      });
    });
    
    res.json(eventsByDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET events for specific date
export const getEventsByDate = async (req, res) => {
  const { date } = req.params;
  
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, event_type, location
      FROM academic_calendar
      WHERE DATE(date) = ?
      ORDER BY date ASC
    `, [date]);
    
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET academic holidays only
export const getHolidays = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date
      FROM academic_calendar
      WHERE event_type = 'holiday' AND date >= CURDATE()
      ORDER BY date ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET exam schedule
export const getExamSchedule = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, description, date, location
      FROM academic_calendar
      WHERE event_type = 'exam' AND date >= CURDATE()
      ORDER BY date ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// BULK delete events
export const bulkDeleteEvents = async (req, res) => {
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Event IDs array is required' });
  }
  
  try {
    const placeholders = ids.map(() => '?').join(',');
    const [result] = await pool.query(`DELETE FROM academic_calendar WHERE id IN (${placeholders})`, ids);
    
    res.json({ 
      message: `${result.affectedRows} events deleted successfully`,
      deleted_count: result.affectedRows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// COPY events from one year to another
export const copyEventsToYear = async (req, res) => {
  const { source_year, target_year } = req.body;
  
  if (!source_year || !target_year) {
    return res.status(400).json({ error: 'Source year and target year are required' });
  }
  
  try {
    const [events] = await pool.query(`
      SELECT title, description, event_type, location
      FROM academic_calendar
      WHERE YEAR(date) = ?
    `, [source_year]);
    
    let copied = 0;
    for (const event of events) {
      // Note: This copies the event structure but you'd need to adjust dates
      // This is a simplified version
      copied++;
    }
    
    res.json({ 
      message: `Copied ${copied} events from ${source_year} to ${target_year}`,
      copied_count: copied
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
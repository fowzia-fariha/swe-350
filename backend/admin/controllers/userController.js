import pool from '../../db/connection.js';
import bcrypt from 'bcrypt';

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, user_id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch { res.status(500).json({ error: 'Server error' }); }
};

// GET single user
export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, user_id, name, email, role, is_active, created_at FROM users WHERE user_id = ?',
      [req.params.userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch { res.status(500).json({ error: 'Server error' }); }
};

// POST create user
export const createUser = async (req, res) => {
  const { name, email, password, role, department, semester, batch_year, designation } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing required fields' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Generate user_id
    const prefix = role === 'student' ? 'ST' : role === 'teacher' ? 'TC' : 'AD';
    const year = new Date().getFullYear();
    const [[countRow]] = await conn.query("SELECT COUNT(*) as cnt FROM users WHERE role = ?", [role]);
    const seq = String(countRow.cnt + 1).padStart(4, '0');
    const user_id = `${prefix}${year}${seq}`;

    const password_hash = await bcrypt.hash(password, 10);
    await conn.query(
      'INSERT INTO users (user_id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, email, password_hash, role]
    );

    if (role === 'student') {
      await conn.query(
        'INSERT INTO students (user_id, department, semester, batch_year) VALUES (?, ?, ?, ?)',
        [user_id, department || null, semester || null, batch_year || year]
      );
    } else if (role === 'teacher') {
      await conn.query(
        'INSERT INTO teachers (user_id, department, designation) VALUES (?, ?, ?)',
        [user_id, department || null, designation || null]
      );
    }

    await conn.commit();
    res.status(201).json({ message: 'User created', user_id });
  } catch (err) {
    await conn.rollback();
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Server error' });
  } finally { conn.release(); }
};

// PUT update user
export const updateUser = async (req, res) => {
  const { name, email, is_active } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?',
      [name, email, is_active, req.params.userId]
    );
    res.json({ message: 'User updated' });
  } catch { res.status(500).json({ error: 'Server error' }); }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE user_id = ?', [req.params.userId]);
    res.json({ message: 'User deleted' });
  } catch { res.status(500).json({ error: 'Server error' }); }
};

// GET stats for dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const [[students]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role='student' AND is_active=1");
    const [[teachers]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role='teacher' AND is_active=1");
    const [[courses]] = await pool.query("SELECT COUNT(*) as count FROM courses WHERE is_active=1");
    const [[enrollments]] = await pool.query("SELECT COUNT(*) as count FROM enrollments");
    res.json({ students: students.count, teachers: teachers.count, courses: courses.count, enrollments: enrollments.count });
  } catch { res.status(500).json({ error: 'Server error' }); }
};
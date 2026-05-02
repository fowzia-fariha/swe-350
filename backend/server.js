// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import pool from './db/connection.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ============= AUTH ROUTES =============
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
//     if (users.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     const user = users[0];
    
//     res.json({ 
//       token: 'test-token-' + Date.now(), 
//       user: { 
//         user_id: user.user_id, 
//         name: user.name, 
//         email: user.email, 
//         role: user.role 
//       } 
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // ============= USER ROUTES =============
// app.get('/api/admin/users', async (req, res) => {
//   try {
//     const [users] = await pool.query('SELECT user_id, name, email, role, is_active, created_at FROM users');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/users', async (req, res) => {
//   const { user_id, name, email, password_hash, role, is_active } = req.body;
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, ?)',
//       [user_id, name, email, password_hash, role, is_active || 1]
//     );
//     res.status(201).json({ id: result.insertId, message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/users/:user_id', async (req, res) => {
//   const { name, email, is_active } = req.body;
//   const { user_id } = req.params;
//   try {
//     await pool.query('UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?', [name, email, is_active, user_id]);
//     res.json({ message: 'User updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/users/:user_id', async (req, res) => {
//   const { user_id } = req.params;
//   try {
//     await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/admin/users/stats', async (req, res) => {
//   try {
//     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
//     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher'");
//     const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
//     res.json({ students: students[0].count, teachers: teachers[0].count, admins: admins[0].count });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= STUDENT ROUTES =============
// app.get('/api/admin/students', async (req, res) => {
//   try {
//     const [students] = await pool.query(`
//       SELECT u.user_id, u.name, u.email, s.roll_number, s.department, s.semester, s.cgpa 
//       FROM users u 
//       JOIN students s ON u.user_id = s.user_id 
//       WHERE u.role = 'student'
//     `);
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/students', async (req, res) => {
//   const { user_id, name, email, password_hash, roll_number, department, semester } = req.body;
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();
//     await connection.query('INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "student", 1)', [user_id, name, email, password_hash]);
//     await connection.query('INSERT INTO students (user_id, roll_number, department, semester) VALUES (?, ?, ?, ?)', [user_id, roll_number, department, semester]);
//     await connection.commit();
//     res.status(201).json({ message: 'Student created successfully' });
//   } catch (error) {
//     await connection.rollback();
//     res.status(500).json({ error: error.message });
//   } finally {
//     connection.release();
//   }
// });

// // ============= COURSE ROUTES (FULL CRUD) =============
// app.get('/api/admin/courses', async (req, res) => {
//   try {
//     const [courses] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/courses', async (req, res) => {
//   const { course_code, course_name, credits, department, description, semester } = req.body;
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO courses (course_code, course_name, credits, department, description, semester, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)',
//       [course_code, course_name, credits, department, description, semester || 'Spring 2025']
//     );
//     res.status(201).json({ id: result.insertId, message: 'Course created successfully', course: { course_code, course_name, credits, department, description } });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/courses/:id', async (req, res) => {
//   const { course_name, credits, department, description } = req.body;
//   const { id } = req.params;
//   try {
//     await pool.query('UPDATE courses SET course_name = ?, credits = ?, department = ?, description = ? WHERE id = ?', [course_name, credits, department, description, id]);
//     res.json({ message: 'Course updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/courses/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM courses WHERE id = ?', [id]);
//     res.json({ message: 'Course deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= FACULTY ROUTES =============
// app.get('/api/admin/faculty', async (req, res) => {
//   try {
//     const [faculty] = await pool.query(`
//       SELECT u.user_id, u.name, u.email, f.department, f.designation, f.specialization, f.qualification, f.phone_extension
//       FROM users u 
//       JOIN faculty f ON u.user_id = f.user_id 
//       WHERE u.role = 'teacher'
//     `);
//     res.json(faculty);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/faculty', async (req, res) => {
//   const { user_id, name, email, password_hash, department, designation, specialization, qualification, phone_extension } = req.body;
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();
//     await connection.query('INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "teacher", 1)', [user_id, name, email, password_hash]);
//     await connection.query('INSERT INTO faculty (user_id, department, designation, specialization, qualification, phone_extension) VALUES (?, ?, ?, ?, ?, ?)', [user_id, department, designation, specialization, qualification, phone_extension]);
//     await connection.commit();
//     res.status(201).json({ message: 'Faculty created successfully' });
//   } catch (error) {
//     await connection.rollback();
//     res.status(500).json({ error: error.message });
//   } finally {
//     connection.release();
//   }
// });

// // ============= RESULT ROUTES =============
// app.get('/api/admin/results', async (req, res) => {
//   try {
//     const [results] = await pool.query(`
//       SELECT r.id, u.name as student_name, c.course_name, r.grade, r.semester, r.status
//       FROM results r
//       JOIN users u ON r.student_user_id = u.user_id
//       JOIN courses c ON r.course_id = c.id
//       ORDER BY r.created_at DESC
//     `);
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/results', async (req, res) => {
//   const { student_user_id, course_id, grade, semester } = req.body;
//   try {
//     const [existing] = await pool.query('SELECT id FROM results WHERE student_user_id = ? AND course_id = ? AND semester = ?', [student_user_id, course_id, semester]);
//     if (existing.length > 0) {
//       await pool.query('UPDATE results SET grade = ? WHERE student_user_id = ? AND course_id = ? AND semester = ?', [grade, student_user_id, course_id, semester]);
//       res.json({ message: 'Result updated successfully' });
//     } else {
//       const [result] = await pool.query('INSERT INTO results (student_user_id, course_id, grade, semester, status) VALUES (?, ?, ?, ?, "published")', [student_user_id, course_id, grade, semester]);
//       res.status(201).json({ id: result.insertId, message: 'Result created successfully' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/results/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM results WHERE id = ?', [id]);
//     res.json({ message: 'Result deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= CALENDAR ROUTES =============
// app.get('/api/admin/calendar', async (req, res) => {
//   try {
//     const [events] = await pool.query('SELECT * FROM academic_calendar ORDER BY date ASC');
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/calendar', async (req, res) => {
//   const { title, description, date, event_type, location } = req.body;
//   try {
//     const [result] = await pool.query('INSERT INTO academic_calendar (title, description, date, event_type, location) VALUES (?, ?, ?, ?, ?)', [title, description, date, event_type || 'general', location]);
//     res.status(201).json({ id: result.insertId, message: 'Event created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/calendar/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM academic_calendar WHERE id = ?', [id]);
//     res.json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= DASHBOARD STATS =============
// app.get('/api/admin/dashboard/stats', async (req, res) => {
//   try {
//     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
//     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1");
//     const [courses] = await pool.query("SELECT COUNT(*) as count FROM courses WHERE is_active = 1");
//     const [pending] = await pool.query("SELECT COUNT(*) as count FROM users WHERE is_active = 0");
//     res.json({ totalStudents: students[0].count, totalTeachers: teachers[0].count, totalCourses: courses[0].count, pendingRequests: pending[0].count });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Health check
// app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'connected', timestamp: new Date() }));

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
//   console.log(`📍 Test URL: http://localhost:${PORT}/api/health`);
// });

// // import express from 'express';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import pool from './db/connection.js';

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // ============= AUTH ROUTES =============
// // app.post('/api/auth/login', async (req, res) => {
// //   const { email, password } = req.body;
  
// //   try {
// //     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
// //     if (users.length === 0) {
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }
    
// //     const user = users[0];
    
// //     res.json({ 
// //       token: 'test-token-' + Date.now(), 
// //       user: { 
// //         user_id: user.user_id, 
// //         name: user.name, 
// //         email: user.email, 
// //         role: user.role 
// //       } 
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // ============= USER ROUTES =============
// // app.get('/api/admin/users', async (req, res) => {
// //   try {
// //     const [users] = await pool.query('SELECT user_id, name, email, role, is_active, created_at FROM users');
// //     res.json(users);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.get('/api/admin/users/stats', async (req, res) => {
// //   try {
// //     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
// //     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher'");
// //     const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
// //     res.json({ 
// //       students: students[0].count, 
// //       teachers: teachers[0].count, 
// //       admins: admins[0].count 
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= STUDENT ROUTES =============
// // app.get('/api/admin/students', async (req, res) => {
// //   try {
// //     const [students] = await pool.query(`
// //       SELECT u.user_id, u.name, u.email, s.roll_number, s.department, s.semester, s.cgpa 
// //       FROM users u 
// //       JOIN students s ON u.user_id = s.user_id 
// //       WHERE u.role = 'student'
// //     `);
// //     res.json(students);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= COURSE ROUTES (FULL CRUD) =============
// // app.get('/api/admin/courses', async (req, res) => {
// //   try {
// //     const [courses] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
// //     res.json(courses);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/admin/courses', async (req, res) => {
// //   const { course_code, course_name, credits, department, description, semester } = req.body;
// //   try {
// //     const [result] = await pool.query(
// //       'INSERT INTO courses (course_code, course_name, credits, department, description, semester, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)',
// //       [course_code, course_name, credits, department, description, semester || 'Spring 2025']
// //     );
// //     res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.put('/api/admin/courses/:id', async (req, res) => {
// //   const { course_name, credits, department, description } = req.body;
// //   const { id } = req.params;
// //   try {
// //     await pool.query('UPDATE courses SET course_name = ?, credits = ?, department = ?, description = ? WHERE id = ?', 
// //       [course_name, credits, department, description, id]);
// //     res.json({ message: 'Course updated successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.delete('/api/admin/courses/:id', async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     await pool.query('DELETE FROM courses WHERE id = ?', [id]);
// //     res.json({ message: 'Course deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= FACULTY ROUTES =============
// // app.get('/api/admin/faculty', async (req, res) => {
// //   try {
// //     const [faculty] = await pool.query(`
// //       SELECT u.user_id, u.name, u.email, f.department, f.designation, f.specialization 
// //       FROM users u 
// //       JOIN faculty f ON u.user_id = f.user_id 
// //       WHERE u.role = 'teacher'
// //     `);
// //     res.json(faculty);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= RESULT ROUTES =============
// // app.get('/api/admin/results', async (req, res) => {
// //   try {
// //     const [results] = await pool.query(`
// //       SELECT r.id, u.name as student_name, c.course_name, r.grade, r.semester 
// //       FROM results r
// //       JOIN users u ON r.student_user_id = u.user_id
// //       JOIN courses c ON r.course_id = c.id
// //     `);
// //     res.json(results);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= CALENDAR ROUTES =============
// // app.get('/api/admin/calendar', async (req, res) => {
// //   try {
// //     const [events] = await pool.query('SELECT * FROM academic_calendar ORDER BY date ASC');
// //     res.json(events);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= DASHBOARD STATS =============
// // app.get('/api/admin/dashboard/stats', async (req, res) => {
// //   try {
// //     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
// //     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1");
// //     const [courses] = await pool.query("SELECT COUNT(*) as count FROM courses WHERE is_active = 1");
// //     const [pending] = await pool.query("SELECT COUNT(*) as count FROM users WHERE is_active = 0");
    
// //     res.json({
// //       totalStudents: students[0].count,
// //       totalTeachers: teachers[0].count,
// //       totalCourses: courses[0].count,
// //       pendingRequests: pending[0].count
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Health check
// // app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'connected', timestamp: new Date() }));

// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// //   console.log(`📍 Test URL: http://localhost:${PORT}/api/health`);
// // });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= AUTH ROUTES =============
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    res.json({ 
      token: 'test-token-' + Date.now(), 
      user: { 
        user_id: user.user_id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============= USER ROUTES =============
app.get('/api/admin/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT user_id, name, email, role, is_active, created_at FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/users', async (req, res) => {
  const { user_id, name, email, password_hash, role, is_active } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, name, email, password_hash, role, is_active || 1]
    );
    res.status(201).json({ id: result.insertId, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/users/:user_id', async (req, res) => {
  const { name, email, is_active } = req.body;
  const { user_id } = req.params;
  try {
    await pool.query('UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?', [name, email, is_active, user_id]);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/users/stats', async (req, res) => {
  try {
    const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher'");
    const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
    res.json({ students: students[0].count, teachers: teachers[0].count, admins: admins[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= STUDENT ROUTES =============
app.get('/api/admin/students', async (req, res) => {
  try {
    const [students] = await pool.query(`
      SELECT u.user_id, u.name, u.email, s.roll_number, s.department, s.semester, s.cgpa 
      FROM users u 
      JOIN students s ON u.user_id = s.user_id 
      WHERE u.role = 'student'
    `);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/students', async (req, res) => {
  const { user_id, name, email, password_hash, roll_number, department, semester } = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "student", 1)', [user_id, name, email, password_hash]);
    await connection.query('INSERT INTO students (user_id, roll_number, department, semester) VALUES (?, ?, ?, ?)', [user_id, roll_number, department, semester]);
    await connection.commit();
    res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// ============= COURSE ROUTES (FULL CRUD) =============
app.get('/api/admin/courses', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/courses', async (req, res) => {
  const { course_code, course_name, credits, department, description } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO courses (course_code, course_name, credits, department, description, is_active) VALUES (?, ?, ?, ?, ?, 1)',
      [course_code, course_name, credits, department, description]
    );
    res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/courses/:id', async (req, res) => {
  const { course_name, credits, department, description } = req.body;
  const { id } = req.params;
  try {
    await pool.query('UPDATE courses SET course_name = ?, credits = ?, department = ?, description = ? WHERE id = ?', 
      [course_name, credits, department, description, id]);
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= FACULTY ROUTES (FULL CRUD) =============
app.get('/api/admin/faculty', async (req, res) => {
  try {
    const [faculty] = await pool.query(`
      SELECT u.user_id, u.name, u.email, 
             f.department, f.designation, f.specialization, f.qualification, f.phone_extension,
             COUNT(fc.course_id) as course_count
      FROM users u 
      JOIN faculty f ON u.user_id = f.user_id 
      LEFT JOIN faculty_courses fc ON f.user_id = fc.faculty_user_id
      WHERE u.role = 'teacher'
      GROUP BY u.user_id, u.name, u.email, f.department, f.designation, f.specialization, f.qualification, f.phone_extension
      ORDER BY u.created_at DESC
    `);
    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/faculty', async (req, res) => {
  const { user_id, name, email, password_hash, department, designation, specialization, qualification, phone_extension } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const finalUserId = user_id || `FAC${Math.floor(Math.random() * 9000) + 1000}`;
    const finalPassword = password_hash || 'temp123';
    
    await connection.query(
      'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "teacher", 1)',
      [finalUserId, name, email, finalPassword]
    );
    
    await connection.query(
      'INSERT INTO faculty (user_id, department, designation, specialization, qualification, phone_extension) VALUES (?, ?, ?, ?, ?, ?)',
      [finalUserId, department || null, designation || null, specialization || null, qualification || null, phone_extension || null]
    );
    
    await connection.commit();
    res.status(201).json({ message: 'Faculty created successfully', user_id: finalUserId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email or User ID already exists' });
    }
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

app.put('/api/admin/faculty/:userId', async (req, res) => {
  const { name, department, designation, specialization, qualification, phone_extension } = req.body;
  const { userId } = req.params;
  
  try {
    await pool.query(
      'UPDATE users SET name = ? WHERE user_id = ?',
      [name, userId]
    );
    
    await pool.query(
      `UPDATE faculty 
       SET department = ?, designation = ?, specialization = ?, qualification = ?, phone_extension = ?
       WHERE user_id = ?`,
      [department, designation, specialization, qualification, phone_extension, userId]
    );
    
    res.json({ message: 'Faculty updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/faculty/:userId', async (req, res) => {
  const { userId } = req.params;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    await connection.query('DELETE FROM faculty_courses WHERE faculty_user_id = ?', [userId]);
    await connection.query('DELETE FROM faculty WHERE user_id = ?', [userId]);
    await connection.query('DELETE FROM users WHERE user_id = ?', [userId]);
    
    await connection.commit();
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// ============= RESULT ROUTES =============
app.get('/api/admin/results', async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT r.id, u.name as student_name, c.course_name, r.grade, r.semester, r.status
      FROM results r
      JOIN users u ON r.student_user_id = u.user_id
      JOIN courses c ON r.course_id = c.id
      ORDER BY r.created_at DESC
    `);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/results', async (req, res) => {
  const { student_user_id, course_id, grade, semester } = req.body;
  try {
    const [existing] = await pool.query('SELECT id FROM results WHERE student_user_id = ? AND course_id = ? AND semester = ?', [student_user_id, course_id, semester]);
    if (existing.length > 0) {
      await pool.query('UPDATE results SET grade = ? WHERE student_user_id = ? AND course_id = ? AND semester = ?', [grade, student_user_id, course_id, semester]);
      res.json({ message: 'Result updated successfully' });
    } else {
      const [result] = await pool.query('INSERT INTO results (student_user_id, course_id, grade, semester, status) VALUES (?, ?, ?, ?, "published")', [student_user_id, course_id, grade, semester]);
      res.status(201).json({ id: result.insertId, message: 'Result created successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/results/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM results WHERE id = ?', [id]);
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= CALENDAR ROUTES =============
app.get('/api/admin/calendar', async (req, res) => {
  try {
    const [events] = await pool.query('SELECT * FROM academic_calendar ORDER BY date ASC');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/calendar', async (req, res) => {
  const { title, description, date, event_type, location } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO academic_calendar (title, description, date, event_type, location) VALUES (?, ?, ?, ?, ?)', [title, description, date, event_type || 'general', location]);
    res.status(201).json({ id: result.insertId, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/calendar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM academic_calendar WHERE id = ?', [id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= DASHBOARD STATS =============
app.get('/api/admin/dashboard/stats', async (req, res) => {
  try {
    const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
    const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1");
    const [courses] = await pool.query("SELECT COUNT(*) as count FROM courses WHERE is_active = 1");
    const [pending] = await pool.query("SELECT COUNT(*) as count FROM users WHERE is_active = 0");
    
    res.json({
      totalStudents: students[0].count,
      totalTeachers: teachers[0].count,
      totalCourses: courses[0].count,
      pendingRequests: pending[0].count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'connected', timestamp: new Date() }));

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Test URL: http://localhost:${PORT}/api/health`);
});
// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const path = require("path");
// // // // const multer = require("multer");
// // // // const fs = require("fs");

// // // // const app = express();

// // // // app.use(cors());
// // // // app.use(express.json());
// // // // app.use(express.urlencoded({ extended: true }));

// // // // // Create upload directories
// // // // const uploadDir = path.join(__dirname, 'uploads');
// // // // const submissionsDir = path.join(__dirname, 'submissions');

// // // // if (!fs.existsSync(uploadDir)) {
// // // //   fs.mkdirSync(uploadDir, { recursive: true });
// // // // }
// // // // if (!fs.existsSync(submissionsDir)) {
// // // //   fs.mkdirSync(submissionsDir, { recursive: true });
// // // // }

// // // // // Configure multer
// // // // const storage = multer.diskStorage({
// // // //   destination: function (req, file, cb) {
// // // //     cb(null, 'submissions/');
// // // //   },
// // // //   filename: function (req, file, cb) {
// // // //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// // // //     cb(null, uniqueSuffix + '-' + file.originalname);
// // // //   }
// // // // });

// // // // const upload = multer({ 
// // // //   storage: storage,
// // // //   limits: { fileSize: 50 * 1024 * 1024 }
// // // // });

// // // // app.locals.upload = upload;

// // // // // Serve static files
// // // // app.use('/uploads', express.static(uploadDir));
// // // // app.use('/submissions', express.static(submissionsDir));

// // // // // Routes
// // // // const dashboardRoutes = require("./routes/student/dashboardRoutes");
// // // // const assignmentRoutes = require("./routes/student/assignmentRoutes");

// // // // const authRoutes = require("./routes/student/authRoutes");
// // // // app.use("/api/auth", authRoutes);
// // // // // Add this with other routes
// // // // const studyMaterialRoutes = require("./routes/student/studyMaterialRoutes");
// // // // app.use("/api/student", studyMaterialRoutes);

// // // // const liveSessionRoutes = require("./routes/student/liveSessionRoutes");
// // // // app.use("/api/student", liveSessionRoutes);

// // // // const crRoutes = require("./routes/student/crRoutes");
// // // // app.use("/api/student", crRoutes);


// // // // const teacherAssignmentRoutes = require("./routes/teacher/assignmentRoutes");
// // // // app.use("/api/teacher", teacherAssignmentRoutes);
// // // // // Add this with other route imports
// // // // const courseOverviewRoutes = require("./routes/student/courseOverviewRoutes");

// // // // // Add this with other app.use statements
// // // // app.use("/api/student", courseOverviewRoutes);

// // // // app.use("/api/student", dashboardRoutes);
// // // // app.use("/api/student", assignmentRoutes);

// // // // // Test endpoint
// // // // app.get("/test", (req, res) => {
// // // //   res.json({ message: "Backend working" });
// // // // });

// // // // const PORT = 5000;
// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on port ${PORT}`);
// // // // });



// // // import express from 'express';
// // // import cors from 'cors';
// // // import dotenv from 'dotenv';
// // // import path from 'path';
// // // import { fileURLToPath } from 'url';
// // // import fs from 'fs';
// // // import multer from 'multer';
// // // import pool from './db/connection.js';

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // dotenv.config();

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // // ============= MIDDLEWARE =============
// // // app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // ============= FILE UPLOAD SETUP =============
// // // // Create upload directories
// // // const uploadDir = path.join(__dirname, 'uploads');
// // // const submissionsDir = path.join(__dirname, 'submissions');

// // // if (!fs.existsSync(uploadDir)) {
// // //   fs.mkdirSync(uploadDir, { recursive: true });
// // // }
// // // if (!fs.existsSync(submissionsDir)) {
// // //   fs.mkdirSync(submissionsDir, { recursive: true });
// // // }

// // // // Configure multer
// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, 'submissions/');
// // //   },
// // //   filename: function (req, file, cb) {
// // //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// // //     cb(null, uniqueSuffix + '-' + file.originalname);
// // //   }
// // // });

// // // const upload = multer({ 
// // //   storage: storage,
// // //   limits: { fileSize: 50 * 1024 * 1024 }
// // // });

// // // app.locals.upload = upload;

// // // // Serve static files
// // // app.use('/uploads', express.static(uploadDir));
// // // app.use('/submissions', express.static(submissionsDir));

// // // // ============= STUDENT ROUTES =============
// // // // Note: Comment these out until you create the route files
// // // // const dashboardRoutes = require("./routes/student/dashboardRoutes");
// // // // const assignmentRoutes = require("./routes/student/assignmentRoutes");
// // // // const authRoutes = require("./routes/student/authRoutes");
// // // // const studyMaterialRoutes = require("./routes/student/studyMaterialRoutes");
// // // // const liveSessionRoutes = require("./routes/student/liveSessionRoutes");
// // // // const crRoutes = require("./routes/student/crRoutes");
// // // // const courseOverviewRoutes = require("./routes/student/courseOverviewRoutes");

// // // // app.use("/api/auth", authRoutes);
// // // // app.use("/api/student", studyMaterialRoutes);
// // // // app.use("/api/student", liveSessionRoutes);
// // // // app.use("/api/student", crRoutes);
// // // // app.use("/api/student", courseOverviewRoutes);
// // // // app.use("/api/student", dashboardRoutes);
// // // // app.use("/api/student", assignmentRoutes);

// // // // ============= TEACHER ROUTES =============
// // // // const teacherAssignmentRoutes = require("./routes/teacher/assignmentRoutes");
// // // // app.use("/api/teacher", teacherAssignmentRoutes);

// // // // ============= AUTH ROUTES =============
// // // app.post('/api/auth/login', async (req, res) => {
// // //   const { email, password } = req.body;
  
// // //   try {
// // //     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
// // //     if (users.length === 0) {
// // //       return res.status(401).json({ error: 'Invalid credentials' });
// // //     }
    
// // //     const user = users[0];
    
// // //     res.json({ 
// // //       token: 'test-token-' + Date.now(), 
// // //       user: { 
// // //         user_id: user.user_id, 
// // //         name: user.name, 
// // //         email: user.email, 
// // //         role: user.role 
// // //       } 
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // });

// // // // ============= USER ROUTES =============
// // // app.get('/api/admin/users', async (req, res) => {
// // //   try {
// // //     const [users] = await pool.query('SELECT user_id, name, email, role, is_active, created_at FROM users');
// // //     res.json(users);
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/users', async (req, res) => {
// // //   console.log('📝 POST /api/admin/users - Body:', req.body);
// // //   const { name, email, role } = req.body;
  
// // //   if (!name || !email) {
// // //     return res.status(400).json({ error: 'Name and email are required' });
// // //   }
  
// // //   try {
// // //     const user_id = `USR${Date.now()}`;
// // //     await pool.query(
// // //       'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, 1)',
// // //       [user_id, name, email, 'temp123', role || 'student']
// // //     );
// // //     console.log('✅ User created:', user_id);
// // //     res.status(201).json({ message: 'User created successfully', user_id });
// // //   } catch (error) {
// // //     console.error('❌ Error:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.put('/api/admin/users/:user_id', async (req, res) => {
// // //   const { name, email, is_active } = req.body;
// // //   const { user_id } = req.params;
// // //   console.log('✏️ UPDATE user:', user_id);
// // //   try {
// // //     await pool.query('UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?', [name, email, is_active, user_id]);
// // //     res.json({ message: 'User updated successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.delete('/api/admin/users/:user_id', async (req, res) => {
// // //   const { user_id } = req.params;
// // //   console.log('🗑️ DELETE user:', user_id);
// // //   try {
// // //     await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
// // //     res.json({ message: 'User deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.get('/api/admin/users/stats', async (req, res) => {
// // //   try {
// // //     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
// // //     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher'");
// // //     const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
// // //     res.json({ students: students[0].count, teachers: teachers[0].count, admins: admins[0].count });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= STUDENT RECORDS ROUTES =============
// // // app.get('/api/admin/students', async (req, res) => {
// // //   try {
// // //     const [students] = await pool.query(`
// // //       SELECT u.user_id, u.name, u.email, s.roll_number, s.department, s.semester, s.cgpa 
// // //       FROM users u 
// // //       JOIN students s ON u.user_id = s.user_id 
// // //       WHERE u.role = 'student'
// // //     `);
// // //     res.json(students);
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/students', async (req, res) => {
// // //   const { user_id, name, email, password_hash, roll_number, department, semester } = req.body;
// // //   const connection = await pool.getConnection();
// // //   try {
// // //     await connection.beginTransaction();
// // //     await connection.query('INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "student", 1)', [user_id, name, email, password_hash]);
// // //     await connection.query('INSERT INTO students (user_id, roll_number, department, semester) VALUES (?, ?, ?, ?)', [user_id, roll_number, department, semester]);
// // //     await connection.commit();
// // //     res.status(201).json({ message: 'Student created successfully' });
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     res.status(500).json({ error: error.message });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // ============= COURSE ROUTES =============
// // // app.get('/api/admin/courses', async (req, res) => {
// // //   try {
// // //     const [courses] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
// // //     res.json(courses);
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/courses', async (req, res) => {
// // //   const { course_code, course_name, credits, department, description } = req.body;
// // //   try {
// // //     const [result] = await pool.query(
// // //       'INSERT INTO courses (course_code, course_name, credits, department, description, is_active) VALUES (?, ?, ?, ?, ?, 1)',
// // //       [course_code, course_name, credits || 3, department || null, description || null]
// // //     );
// // //     res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.put('/api/admin/courses/:id', async (req, res) => {
// // //   const { course_name, credits, department, description } = req.body;
// // //   const { id } = req.params;
// // //   try {
// // //     await pool.query('UPDATE courses SET course_name = ?, credits = ?, department = ?, description = ? WHERE id = ?', 
// // //       [course_name, credits, department, description, id]);
// // //     res.json({ message: 'Course updated successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.delete('/api/admin/courses/:id', async (req, res) => {
// // //   const { id } = req.params;
// // //   try {
// // //     await pool.query('DELETE FROM courses WHERE id = ?', [id]);
// // //     res.json({ message: 'Course deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= FACULTY ROUTES =============
// // // app.get('/api/admin/faculty', async (req, res) => {
// // //   try {
// // //     const [faculty] = await pool.query(`
// // //       SELECT u.user_id, u.name, u.email, 
// // //              f.department, f.designation, f.specialization, f.qualification, f.phone_extension
// // //       FROM users u 
// // //       JOIN faculty f ON u.user_id = f.user_id 
// // //       WHERE u.role = 'teacher'
// // //       ORDER BY u.created_at DESC
// // //     `);
// // //     res.json(faculty);
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/faculty', async (req, res) => {
// // //   const { name, email, department, designation, specialization, qualification, phone_extension } = req.body;
  
// // //   if (!name || !email) {
// // //     return res.status(400).json({ error: 'Name and email are required' });
// // //   }
  
// // //   const connection = await pool.getConnection();
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     const user_id = `FAC${Date.now()}`;
// // //     await connection.query(
// // //       'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "teacher", 1)',
// // //       [user_id, name, email, 'temp123']
// // //     );
// // //     await connection.query(
// // //       'INSERT INTO faculty (user_id, department, designation, specialization, qualification, phone_extension) VALUES (?, ?, ?, ?, ?, ?)',
// // //       [user_id, department || null, designation || null, specialization || null, qualification || null, phone_extension || null]
// // //     );
    
// // //     await connection.commit();
// // //     res.status(201).json({ message: 'Faculty created successfully', user_id });
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     res.status(500).json({ error: error.message });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // app.delete('/api/admin/faculty/:userId', async (req, res) => {
// // //   const { userId } = req.params;
// // //   try {
// // //     await pool.query('DELETE FROM faculty WHERE user_id = ?', [userId]);
// // //     await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
// // //     res.json({ message: 'Faculty deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= RESULT ROUTES =============
// // // app.get('/api/admin/results', async (req, res) => {
// // //   try {
// // //     const [results] = await pool.query(`
// // //       SELECT r.id, u.name as student_name, c.course_name, r.grade, r.semester, r.status
// // //       FROM results r
// // //       JOIN users u ON r.student_user_id = u.user_id
// // //       JOIN courses c ON r.course_id = c.id
// // //       ORDER BY r.created_at DESC
// // //     `);
// // //     res.json(results);
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/results', async (req, res) => {
// // //   const { student_user_id, course_id, grade, semester } = req.body;
// // //   try {
// // //     const [existing] = await pool.query('SELECT id FROM results WHERE student_user_id = ? AND course_id = ? AND semester = ?', [student_user_id, course_id, semester]);
// // //     if (existing.length > 0) {
// // //       await pool.query('UPDATE results SET grade = ? WHERE student_user_id = ? AND course_id = ? AND semester = ?', [grade, student_user_id, course_id, semester]);
// // //       res.json({ message: 'Result updated successfully' });
// // //     } else {
// // //       const [result] = await pool.query('INSERT INTO results (student_user_id, course_id, grade, semester, status) VALUES (?, ?, ?, ?, "published")', [student_user_id, course_id, grade, semester]);
// // //       res.status(201).json({ id: result.insertId, message: 'Result created successfully' });
// // //     }
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.delete('/api/admin/results/:id', async (req, res) => {
// // //   const { id } = req.params;
// // //   try {
// // //     await pool.query('DELETE FROM results WHERE id = ?', [id]);
// // //     res.json({ message: 'Result deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= CALENDAR ROUTES =============
// // // app.get('/api/admin/calendar', async (req, res) => {
// // //   try {
// // //     const [events] = await pool.query('SELECT * FROM academic_calendar ORDER BY date ASC');
// // //     res.json(events);
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/calendar', async (req, res) => {
// // //   const { title, description, date, event_type, location } = req.body;
// // //   try {
// // //     const [result] = await pool.query(
// // //       'INSERT INTO academic_calendar (title, description, date, event_type, location) VALUES (?, ?, ?, ?, ?)',
// // //       [title, description || null, date, event_type || 'general', location || null]
// // //     );
// // //     res.status(201).json({ id: result.insertId, message: 'Event created successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.delete('/api/admin/calendar/:id', async (req, res) => {
// // //   const { id } = req.params;
// // //   try {
// // //     await pool.query('DELETE FROM academic_calendar WHERE id = ?', [id]);
// // //     res.json({ message: 'Event deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= REPORTS ROUTES =============
// // // app.get('/api/admin/reports', async (req, res) => {
// // //   try {
// // //     const [reports] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
// // //     res.json(reports);
// // //   } catch (error) {
// // //     console.error('Error fetching reports:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/reports', async (req, res) => {
// // //   const { title, description, type, config } = req.body;
  
// // //   if (!title || !type) {
// // //     return res.status(400).json({ error: 'Title and type are required' });
// // //   }
  
// // //   try {
// // //     const [result] = await pool.query(
// // //       'INSERT INTO reports (title, description, type, config, created_by, is_active) VALUES (?, ?, ?, ?, ?, 1)',
// // //       [title, description || '', type, JSON.stringify(config || {}), 'ADMIN001']
// // //     );
// // //     res.status(201).json({ id: result.insertId, message: 'Report created successfully' });
// // //   } catch (error) {
// // //     console.error('Error creating report:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.put('/api/admin/reports/:id', async (req, res) => {
// // //   const { title, description, type, config, is_active } = req.body;
// // //   const { id } = req.params;
  
// // //   try {
// // //     await pool.query(
// // //       'UPDATE reports SET title = ?, description = ?, type = ?, config = ?, is_active = ?, updated_at = NOW() WHERE id = ?',
// // //       [title, description, type, JSON.stringify(config || {}), is_active !== undefined ? is_active : 1, id]
// // //     );
// // //     res.json({ message: 'Report updated successfully' });
// // //   } catch (error) {
// // //     console.error('Error updating report:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.delete('/api/admin/reports/:id', async (req, res) => {
// // //   const { id } = req.params;
// // //   try {
// // //     await pool.query('DELETE FROM reports WHERE id = ?', [id]);
// // //     res.json({ message: 'Report deleted successfully' });
// // //   } catch (error) {
// // //     console.error('Error deleting report:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/reports/:id/generate', async (req, res) => {
// // //   const { id } = req.params;
// // //   const { format } = req.body;
  
// // //   try {
// // //     const [reports] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
// // //     if (reports.length === 0) {
// // //       return res.status(404).json({ error: 'Report not found' });
// // //     }
    
// // //     const report = reports[0];
// // //     let data = [];
    
// // //     switch(report.type) {
// // //       case 'student-enrollment':
// // //         const [students] = await pool.query('SELECT department, COUNT(*) as count FROM students GROUP BY department');
// // //         data = students;
// // //         break;
// // //       case 'academic-performance':
// // //         const [grades] = await pool.query('SELECT grade, COUNT(*) as count FROM results GROUP BY grade');
// // //         data = grades;
// // //         break;
// // //       case 'faculty-workload':
// // //         const [faculty] = await pool.query(`
// // //           SELECT u.name, COUNT(fc.course_id) as course_count 
// // //           FROM faculty f 
// // //           JOIN users u ON f.user_id = u.user_id 
// // //           LEFT JOIN faculty_courses fc ON f.user_id = fc.faculty_user_id 
// // //           GROUP BY u.name
// // //         `);
// // //         data = faculty;
// // //         break;
// // //       default:
// // //         data = { message: 'Report data generated', timestamp: new Date() };
// // //     }
    
// // //     res.json({ 
// // //       message: 'Report generated successfully', 
// // //       data, 
// // //       format: format || 'json',
// // //       report: { id: report.id, title: report.title, type: report.type }
// // //     });
// // //   } catch (error) {
// // //     console.error('Error generating report:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= ADMIN PROFILE ROUTES =============
// // // let adminProfile = {
// // //   name: 'EduAdmin',
// // //   email: 'eduadmin@swehub.com',
// // //   role: 'Super Administrator',
// // //   phone: '+1 (555) 123-4567',
// // //   location: 'New York, USA',
// // //   bio: 'Experienced system administrator with over 8 years in educational technology management.',
// // //   avatar_initials: 'EA'
// // // };

// // // app.get('/api/admin/profile', (req, res) => {
// // //   res.json(adminProfile);
// // // });

// // // app.put('/api/admin/profile', (req, res) => {
// // //   console.log('📥 Updating profile:', req.body);
// // //   const { name, email, role, phone, location, bio, avatar_initials } = req.body;
  
// // //   adminProfile = {
// // //     name: name || adminProfile.name,
// // //     email: email || adminProfile.email,
// // //     role: role || adminProfile.role,
// // //     phone: phone || adminProfile.phone,
// // //     location: location || adminProfile.location,
// // //     bio: bio || adminProfile.bio,
// // //     avatar_initials: avatar_initials || adminProfile.avatar_initials
// // //   };
  
// // //   res.json({ message: 'Profile updated successfully', profile: adminProfile });
// // // });

// // // // ============= SYSTEM SETTINGS ROUTES =============
// // // app.get('/api/admin/settings', async (req, res) => {
// // //   try {
// // //     const [settings] = await pool.query('SELECT setting_key, setting_value, setting_group FROM system_settings');
// // //     res.json(settings);
// // //   } catch (error) {
// // //     console.error('Error fetching settings:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.get('/api/admin/settings/:group', async (req, res) => {
// // //   const { group } = req.params;
// // //   try {
// // //     const [settings] = await pool.query('SELECT setting_key, setting_value FROM system_settings WHERE setting_group = ?', [group]);
// // //     res.json(settings);
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.put('/api/admin/settings/:key', async (req, res) => {
// // //   const { key } = req.params;
// // //   const { value } = req.body;
// // //   try {
// // //     await pool.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
// // //     res.json({ message: 'Setting updated successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.post('/api/admin/settings/bulk', async (req, res) => {
// // //   const { settings } = req.body;
// // //   const connection = await pool.getConnection();
// // //   try {
// // //     await connection.beginTransaction();
// // //     for (const [key, value] of Object.entries(settings)) {
// // //       await connection.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
// // //     }
// // //     await connection.commit();
// // //     res.json({ message: 'All settings saved successfully' });
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error saving settings:', error);
// // //     res.status(500).json({ error: error.message });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // app.post('/api/admin/settings/reset', async (req, res) => {
// // //   try {
// // //     await pool.query(`UPDATE system_settings SET setting_value = CASE setting_key
// // //       WHEN 'grading_scale' THEN '4.0 Scale'
// // //       WHEN 'passing_grade' THEN '60%'
// // //       WHEN 'auto_calculate_gpa' THEN 'true'
// // //       WHEN 'show_gpa_to_students' THEN 'true'
// // //       WHEN 'two_factor_auth' THEN 'true'
// // //       WHEN 'password_expiry_days' THEN '90'
// // //       WHEN 'auto_lock_sessions' THEN 'true'
// // //       WHEN 'failed_login_lockout' THEN 'true'
// // //       WHEN 'email_notifications' THEN 'true'
// // //       WHEN 'sms_alerts' THEN 'false'
// // //       WHEN 'grade_publication_alerts' THEN 'true'
// // //       WHEN 'system_maintenance_alerts' THEN 'true'
// // //       WHEN 'auto_backup' THEN 'true'
// // //       WHEN 'backup_frequency' THEN 'Weekly'
// // //       WHEN 'data_retention_years' THEN '7'
// // //       WHEN 'auto_archive_records' THEN 'true'
// // //       WHEN 'system_language' THEN 'English (US)'
// // //       WHEN 'date_format' THEN 'MM/DD/YYYY'
// // //       WHEN 'time_zone' THEN 'UTC-5 (EST)'
// // //       WHEN 'currency_format' THEN 'USD ($)'
// // //       WHEN 'email_service' THEN 'SMTP'
// // //       WHEN 'sms_gateway' THEN 'Twilio'
// // //       WHEN 'payment_gateway' THEN 'Stripe'
// // //       WHEN 'api_access' THEN 'true'
// // //       ELSE setting_value END`);
// // //     res.json({ message: 'Settings reset to default successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= DASHBOARD STATS =============
// // // app.get('/api/admin/dashboard/stats', async (req, res) => {
// // //   try {
// // //     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
// // //     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1");
// // //     const [courses] = await pool.query("SELECT COUNT(*) as count FROM courses WHERE is_active = 1");
    
// // //     res.json({
// // //       totalStudents: students[0].count,
// // //       totalTeachers: teachers[0].count,
// // //       totalCourses: courses[0].count,
// // //       pendingRequests: 0
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // ============= TEST ENDPOINT =============
// // // app.get("/api/test", (req, res) => {
// // //   res.json({ message: "Backend working" });
// // // });

// // // // ============= HEALTH CHECK =============
// // // app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'connected', timestamp: new Date() }));

// // // // ============= START SERVER =============
// // // app.listen(PORT, () => {
// // //   console.log(`✅ Server running on http://localhost:${PORT}`);
// // //   console.log(`📍 Test URL: http://localhost:${PORT}/api/health`);
// // //   console.log(`📁 Uploads directory: ${uploadDir}`);
// // //   console.log(`📁 Submissions directory: ${submissionsDir}`);
// // // });


// // import express from 'express';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import path from 'path';
// // import { fileURLToPath } from 'url';
// // import fs from 'fs';
// // import multer from 'multer';
// // import pool from './config/db.js';

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // ============= MIDDLEWARE =============
// // app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // ============= FILE UPLOAD SETUP =============
// // // Create upload directories
// // const uploadDir = path.join(__dirname, 'uploads');
// // const submissionsDir = path.join(__dirname, 'submissions');

// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir, { recursive: true });
// // }
// // if (!fs.existsSync(submissionsDir)) {
// //   fs.mkdirSync(submissionsDir, { recursive: true });
// // }

// // // Configure multer
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'submissions/');
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, uniqueSuffix + '-' + file.originalname);
// //   }
// // });

// // const upload = multer({ 
// //   storage: storage,
// //   limits: { fileSize: 50 * 1024 * 1024 }
// // });

// // app.locals.upload = upload;

// // // Serve static files
// // app.use('/uploads', express.static(uploadDir));
// // app.use('/submissions', express.static(submissionsDir));

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

// // app.post('/api/admin/users', async (req, res) => {
// //   console.log('📝 POST /api/admin/users - Body:', req.body);
// //   const { name, email, role } = req.body;
  
// //   if (!name || !email) {
// //     return res.status(400).json({ error: 'Name and email are required' });
// //   }
  
// //   try {
// //     const user_id = `USR${Date.now()}`;
// //     await pool.query(
// //       'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, 1)',
// //       [user_id, name, email, 'temp123', role || 'student']
// //     );
// //     console.log('✅ User created:', user_id);
// //     res.status(201).json({ message: 'User created successfully', user_id });
// //   } catch (error) {
// //     console.error('❌ Error:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.put('/api/admin/users/:user_id', async (req, res) => {
// //   const { name, email, is_active } = req.body;
// //   const { user_id } = req.params;
// //   console.log('✏️ UPDATE user:', user_id);
// //   try {
// //     await pool.query('UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?', [name, email, is_active, user_id]);
// //     res.json({ message: 'User updated successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.delete('/api/admin/users/:user_id', async (req, res) => {
// //   const { user_id } = req.params;
// //   console.log('🗑️ DELETE user:', user_id);
// //   try {
// //     await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
// //     res.json({ message: 'User deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.get('/api/admin/users/stats', async (req, res) => {
// //   try {
// //     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
// //     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher'");
// //     const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
// //     res.json({ students: students[0].count, teachers: teachers[0].count, admins: admins[0].count });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= STUDENT RECORDS ROUTES =============
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

// // app.post('/api/admin/students', async (req, res) => {
// //   const { user_id, name, email, password_hash, roll_number, department, semester } = req.body;
// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();
// //     await connection.query('INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "student", 1)', [user_id, name, email, password_hash]);
// //     await connection.query('INSERT INTO students (user_id, roll_number, department, semester) VALUES (?, ?, ?, ?)', [user_id, roll_number, department, semester]);
// //     await connection.commit();
// //     res.status(201).json({ message: 'Student created successfully' });
// //   } catch (error) {
// //     await connection.rollback();
// //     res.status(500).json({ error: error.message });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // // ============= COURSE OVERVIEW ROUTES (NEW) =============
// // // Get all course overviews
// // app.get('/api/admin/course-overview', async (req, res) => {
// //   try {
// //     const [courses] = await pool.query(`
// //       SELECT * FROM course_overview 
// //       WHERE is_active = 1 
// //       ORDER BY 
// //         FIELD(semester, '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'),
// //         course_code
// //     `);
// //     res.json(courses);
// //   } catch (error) {
// //     console.error('Error fetching course overview:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Get course overview by ID
// // app.get('/api/admin/course-overview/:id', async (req, res) => {
// //   try {
// //     const [courses] = await pool.query('SELECT * FROM course_overview WHERE id = ?', [req.params.id]);
// //     if (courses.length === 0) return res.status(404).json({ error: 'Course not found' });
// //     res.json(courses[0]);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Get courses by semester
// // app.get('/api/admin/course-overview/semester/:semester', async (req, res) => {
// //   try {
// //     const [courses] = await pool.query('SELECT * FROM course_overview WHERE semester = ? AND is_active = 1', [req.params.semester]);
// //     res.json(courses);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Create new course overview
// // app.post('/api/admin/course-overview', async (req, res) => {
// //   const { course_code, course_name, credits, department, semester, prerequisites, description } = req.body;
  
// //   if (!course_code || !course_name || !semester) {
// //     return res.status(400).json({ error: 'Course code, name, and semester are required' });
// //   }
  
// //   try {
// //     const [result] = await pool.query(
// //       'INSERT INTO course_overview (course_code, course_name, credits, department, semester, prerequisites, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
// //       [course_code, course_name, credits || 3, department || null, semester, prerequisites || null, description || null]
// //     );
// //     res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
// //   } catch (error) {
// //     if (error.code === 'ER_DUP_ENTRY') {
// //       return res.status(409).json({ error: 'Course code already exists' });
// //     }
// //     console.error('Error creating course:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Update course overview
// // app.put('/api/admin/course-overview/:id', async (req, res) => {
// //   const { course_code, course_name, credits, department, semester, prerequisites, description, is_active } = req.body;
  
// //   try {
// //     await pool.query(
// //       'UPDATE course_overview SET course_code = ?, course_name = ?, credits = ?, department = ?, semester = ?, prerequisites = ?, description = ?, is_active = ? WHERE id = ?',
// //       [course_code, course_name, credits, department, semester, prerequisites, description, is_active !== undefined ? is_active : 1, req.params.id]
// //     );
// //     res.json({ message: 'Course updated successfully' });
// //   } catch (error) {
// //     console.error('Error updating course:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Delete course overview
// // app.delete('/api/admin/course-overview/:id', async (req, res) => {
// //   try {
// //     const [result] = await pool.query('DELETE FROM course_overview WHERE id = ?', [req.params.id]);
// //     if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' });
// //     res.json({ message: 'Course deleted successfully' });
// //   } catch (error) {
// //     console.error('Error deleting course:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= COURSE ROUTES (Original - keep for compatibility) =============
// // app.get('/api/admin/courses', async (req, res) => {
// //   try {
// //     const [courses] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
// //     res.json(courses);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/admin/courses', async (req, res) => {
// //   const { course_code, course_name, credits, department, description } = req.body;
// //   try {
// //     const [result] = await pool.query(
// //       'INSERT INTO courses (course_code, course_name, credits, department, description, is_active) VALUES (?, ?, ?, ?, ?, 1)',
// //       [course_code, course_name, credits || 3, department || null, description || null]
// //     );
// //     res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
// //   } catch (error) {
// //     console.error(error);
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
// //       SELECT u.user_id, u.name, u.email, 
// //              f.department, f.designation, f.specialization, f.qualification, f.phone_extension
// //       FROM users u 
// //       JOIN faculty f ON u.user_id = f.user_id 
// //       WHERE u.role = 'teacher'
// //       ORDER BY u.created_at DESC
// //     `);
// //     res.json(faculty);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/admin/faculty', async (req, res) => {
// //   const { name, email, department, designation, specialization, qualification, phone_extension } = req.body;
  
// //   if (!name || !email) {
// //     return res.status(400).json({ error: 'Name and email are required' });
// //   }
  
// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();
    
// //     const user_id = `FAC${Date.now()}`;
// //     await connection.query(
// //       'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "teacher", 1)',
// //       [user_id, name, email, 'temp123']
// //     );
// //     await connection.query(
// //       'INSERT INTO faculty (user_id, department, designation, specialization, qualification, phone_extension) VALUES (?, ?, ?, ?, ?, ?)',
// //       [user_id, department || null, designation || null, specialization || null, qualification || null, phone_extension || null]
// //     );
    
// //     await connection.commit();
// //     res.status(201).json({ message: 'Faculty created successfully', user_id });
// //   } catch (error) {
// //     await connection.rollback();
// //     res.status(500).json({ error: error.message });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // app.delete('/api/admin/faculty/:userId', async (req, res) => {
// //   const { userId } = req.params;
// //   try {
// //     await pool.query('DELETE FROM faculty WHERE user_id = ?', [userId]);
// //     await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
// //     res.json({ message: 'Faculty deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= RESULT ROUTES =============
// // app.get('/api/admin/results', async (req, res) => {
// //   try {
// //     const [results] = await pool.query(`
// //       SELECT r.id, u.name as student_name, c.course_name, r.grade, r.semester, r.status
// //       FROM results r
// //       JOIN users u ON r.student_user_id = u.user_id
// //       JOIN courses c ON r.course_id = c.id
// //       ORDER BY r.created_at DESC
// //     `);
// //     res.json(results);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/admin/results', async (req, res) => {
// //   const { student_user_id, course_id, grade, semester } = req.body;
// //   try {
// //     const [existing] = await pool.query('SELECT id FROM results WHERE student_user_id = ? AND course_id = ? AND semester = ?', [student_user_id, course_id, semester]);
// //     if (existing.length > 0) {
// //       await pool.query('UPDATE results SET grade = ? WHERE student_user_id = ? AND course_id = ? AND semester = ?', [grade, student_user_id, course_id, semester]);
// //       res.json({ message: 'Result updated successfully' });
// //     } else {
// //       const [result] = await pool.query('INSERT INTO results (student_user_id, course_id, grade, semester, status) VALUES (?, ?, ?, ?, "published")', [student_user_id, course_id, grade, semester]);
// //       res.status(201).json({ id: result.insertId, message: 'Result created successfully' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.delete('/api/admin/results/:id', async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     await pool.query('DELETE FROM results WHERE id = ?', [id]);
// //     res.json({ message: 'Result deleted successfully' });
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

// // app.post('/api/admin/calendar', async (req, res) => {
// //   const { title, description, date, event_type, location } = req.body;
// //   try {
// //     const [result] = await pool.query(
// //       'INSERT INTO academic_calendar (title, description, date, event_type, location) VALUES (?, ?, ?, ?, ?)',
// //       [title, description || null, date, event_type || 'general', location || null]
// //     );
// //     res.status(201).json({ id: result.insertId, message: 'Event created successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.delete('/api/admin/calendar/:id', async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     await pool.query('DELETE FROM academic_calendar WHERE id = ?', [id]);
// //     res.json({ message: 'Event deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= REPORTS ROUTES =============
// // app.get('/api/admin/reports', async (req, res) => {
// //   try {
// //     const [reports] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
// //     res.json(reports);
// //   } catch (error) {
// //     console.error('Error fetching reports:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/admin/reports', async (req, res) => {
// //   const { title, description, type, config } = req.body;
  
// //   if (!title || !type) {
// //     return res.status(400).json({ error: 'Title and type are required' });
// //   }
  
// //   try {
// //     const [result] = await pool.query(
// //       'INSERT INTO reports (title, description, type, config, created_by, is_active) VALUES (?, ?, ?, ?, ?, 1)',
// //       [title, description || '', type, JSON.stringify(config || {}), 'ADMIN001']
// //     );
// //     res.status(201).json({ id: result.insertId, message: 'Report created successfully' });
// //   } catch (error) {
// //     console.error('Error creating report:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.put('/api/admin/reports/:id', async (req, res) => {
// //   const { title, description, type, config, is_active } = req.body;
// //   const { id } = req.params;
  
// //   try {
// //     await pool.query(
// //       'UPDATE reports SET title = ?, description = ?, type = ?, config = ?, is_active = ?, updated_at = NOW() WHERE id = ?',
// //       [title, description, type, JSON.stringify(config || {}), is_active !== undefined ? is_active : 1, id]
// //     );
// //     res.json({ message: 'Report updated successfully' });
// //   } catch (error) {
// //     console.error('Error updating report:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.delete('/api/admin/reports/:id', async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     await pool.query('DELETE FROM reports WHERE id = ?', [id]);
// //     res.json({ message: 'Report deleted successfully' });
// //   } catch (error) {
// //     console.error('Error deleting report:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/admin/reports/:id/generate', async (req, res) => {
// //   const { id } = req.params;
// //   const { format } = req.body;
  
// //   try {
// //     const [reports] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
// //     if (reports.length === 0) {
// //       return res.status(404).json({ error: 'Report not found' });
// //     }
    
// //     const report = reports[0];
// //     let data = [];
    
// //     switch(report.type) {
// //       case 'student-enrollment':
// //         const [students] = await pool.query('SELECT department, COUNT(*) as count FROM students GROUP BY department');
// //         data = students;
// //         break;
// //       case 'academic-performance':
// //         const [grades] = await pool.query('SELECT grade, COUNT(*) as count FROM results GROUP BY grade');
// //         data = grades;
// //         break;
// //       case 'faculty-workload':
// //         const [faculty] = await pool.query(`
// //           SELECT u.name, COUNT(fc.course_id) as course_count 
// //           FROM faculty f 
// //           JOIN users u ON f.user_id = u.user_id 
// //           LEFT JOIN faculty_courses fc ON f.user_id = fc.faculty_user_id 
// //           GROUP BY u.name
// //         `);
// //         data = faculty;
// //         break;
// //       default:
// //         data = { message: 'Report data generated', timestamp: new Date() };
// //     }
    
// //     res.json({ 
// //       message: 'Report generated successfully', 
// //       data, 
// //       format: format || 'json',
// //       report: { id: report.id, title: report.title, type: report.type }
// //     });
// //   } catch (error) {
// //     console.error('Error generating report:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= ADMIN PROFILE ROUTES =============
// // let adminProfile = {
// //   name: 'EduAdmin',
// //   email: 'eduadmin@swehub.com',
// //   role: 'Super Administrator',
// //   phone: '+1 (555) 123-4567',
// //   location: 'New York, USA',
// //   bio: 'Experienced system administrator with over 8 years in educational technology management.',
// //   avatar_initials: 'EA'
// // };

// // app.get('/api/admin/profile', (req, res) => {
// //   res.json(adminProfile);
// // });

// // app.put('/api/admin/profile', (req, res) => {
// //   console.log('📥 Updating profile:', req.body);
// //   const { name, email, role, phone, location, bio, avatar_initials } = req.body;
  
// //   adminProfile = {
// //     name: name || adminProfile.name,
// //     email: email || adminProfile.email,
// //     role: role || adminProfile.role,
// //     phone: phone || adminProfile.phone,
// //     location: location || adminProfile.location,
// //     bio: bio || adminProfile.bio,
// //     avatar_initials: avatar_initials || adminProfile.avatar_initials
// //   };
  
// //   res.json({ message: 'Profile updated successfully', profile: adminProfile });
// // });

// // // ============= SYSTEM SETTINGS ROUTES =============
// // app.get('/api/admin/settings', async (req, res) => {
// //   try {
// //     const [settings] = await pool.query('SELECT setting_key, setting_value, setting_group FROM system_settings');
// //     res.json(settings);
// //   } catch (error) {
// //     console.error('Error fetching settings:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.get('/api/admin/settings/:group', async (req, res) => {
// //   const { group } = req.params;
// //   try {
// //     const [settings] = await pool.query('SELECT setting_key, setting_value FROM system_settings WHERE setting_group = ?', [group]);
// //     res.json(settings);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.put('/api/admin/settings/:key', async (req, res) => {
// //   const { key } = req.params;
// //   const { value } = req.body;
// //   try {
// //     await pool.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
// //     res.json({ message: 'Setting updated successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/admin/settings/bulk', async (req, res) => {
// //   const { settings } = req.body;
// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();
// //     for (const [key, value] of Object.entries(settings)) {
// //       await connection.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
// //     }
// //     await connection.commit();
// //     res.json({ message: 'All settings saved successfully' });
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error saving settings:', error);
// //     res.status(500).json({ error: error.message });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // app.post('/api/admin/settings/reset', async (req, res) => {
// //   try {
// //     await pool.query(`UPDATE system_settings SET setting_value = CASE setting_key
// //       WHEN 'grading_scale' THEN '4.0 Scale'
// //       WHEN 'passing_grade' THEN '60%'
// //       WHEN 'auto_calculate_gpa' THEN 'true'
// //       WHEN 'show_gpa_to_students' THEN 'true'
// //       WHEN 'two_factor_auth' THEN 'true'
// //       WHEN 'password_expiry_days' THEN '90'
// //       WHEN 'auto_lock_sessions' THEN 'true'
// //       WHEN 'failed_login_lockout' THEN 'true'
// //       WHEN 'email_notifications' THEN 'true'
// //       WHEN 'sms_alerts' THEN 'false'
// //       WHEN 'grade_publication_alerts' THEN 'true'
// //       WHEN 'system_maintenance_alerts' THEN 'true'
// //       WHEN 'auto_backup' THEN 'true'
// //       WHEN 'backup_frequency' THEN 'Weekly'
// //       WHEN 'data_retention_years' THEN '7'
// //       WHEN 'auto_archive_records' THEN 'true'
// //       WHEN 'system_language' THEN 'English (US)'
// //       WHEN 'date_format' THEN 'MM/DD/YYYY'
// //       WHEN 'time_zone' THEN 'UTC-5 (EST)'
// //       WHEN 'currency_format' THEN 'USD ($)'
// //       WHEN 'email_service' THEN 'SMTP'
// //       WHEN 'sms_gateway' THEN 'Twilio'
// //       WHEN 'payment_gateway' THEN 'Stripe'
// //       WHEN 'api_access' THEN 'true'
// //       ELSE setting_value END`);
// //     res.json({ message: 'Settings reset to default successfully' });
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
    
// //     res.json({
// //       totalStudents: students[0].count,
// //       totalTeachers: teachers[0].count,
// //       totalCourses: courses[0].count,
// //       pendingRequests: 0
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ============= TEST ENDPOINT =============
// // app.get("/api/test", (req, res) => {
// //   res.json({ message: "Backend working" });
// // });

// // // ============= HEALTH CHECK =============
// // app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'connected', timestamp: new Date() }));

// // // ============= START SERVER =============
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// //   console.log(`📍 Test URL: http://localhost:${PORT}/api/health`);
// //   console.log(`📁 Uploads directory: ${uploadDir}`);
// //   console.log(`📁 Submissions directory: ${submissionsDir}`);
// // });




// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';
// import multer from 'multer';
// import pool from './config/db.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ============= MIDDLEWARE =============
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ============= FILE UPLOAD SETUP =============
// // Create upload directories
// const uploadDir = path.join(__dirname, 'uploads');
// const submissionsDir = path.join(__dirname, 'submissions');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// if (!fs.existsSync(submissionsDir)) {
//   fs.mkdirSync(submissionsDir, { recursive: true });
// }

// // Configure multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'submissions/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }
// });

// app.locals.upload = upload;

// // Serve static files
// app.use('/uploads', express.static(uploadDir));
// app.use('/submissions', express.static(submissionsDir));

// // ============= AUTH ROUTES =============
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
//     if (users.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     const user = users[0];
    
//     // Determine redirect URL based on role
//     let redirectUrl = '/dashboard';
//     if (user.role === 'student') redirectUrl = '/student-dashboard';
//     else if (user.role === 'teacher') redirectUrl = '/teacher-dashboard';
//     else if (user.role === 'admin') redirectUrl = '/admin-dashboard';
//     else if (user.role === 'cr') redirectUrl = '/cr-dashboard';
    
//     res.json({ 
//       token: 'test-token-' + Date.now(), 
//       user: { 
//         user_id: user.user_id, 
//         name: user.name, 
//         email: user.email, 
//         role: user.role 
//       },
//       redirectUrl: redirectUrl
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Registration endpoint
// app.post('/api/auth/register', async (req, res) => {
//   const { userId, email, password, name, role, department, batchId } = req.body;
  
//   console.log('📝 Registration attempt:', { userId, email, name, role });
  
//   try {
//     // Check if email already exists
//     const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (existingUsers.length > 0) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }
    
//     // Check if user_id already exists
//     const [existingIds] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
//     if (existingIds.length > 0) {
//       return res.status(400).json({ error: 'User ID already exists' });
//     }
    
//     const connection = await pool.getConnection();
//     try {
//       await connection.beginTransaction();
      
//       // Insert into users table
//       await connection.query(
//         'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, 1)',
//         [userId, name, email, password, role]
//       );
      
//       // Insert role-specific data
//       if (role === 'student') {
//         await connection.query(
//           'INSERT INTO students (user_id, batch_id) VALUES (?, ?)',
//           [userId, batchId || null]
//         );
//       } else if (role === 'teacher') {
//         await connection.query(
//           'INSERT INTO faculty (user_id, department) VALUES (?, ?)',
//           [userId, department || null]
//         );
//       }
      
//       await connection.commit();
//       console.log('✅ User registered successfully:', userId);
//       res.status(201).json({ message: 'Registration successful' });
//     } catch (error) {
//       await connection.rollback();
//       throw error;
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('❌ Registration error:', error);
//     res.status(500).json({ error: error.message || 'Registration failed' });
//   }
// });

// // Email availability check endpoint
// app.get('/api/auth/check-email/:email', async (req, res) => {
//   const { email } = req.params;
  
//   try {
//     const [users] = await pool.query('SELECT user_id FROM users WHERE email = ?', [email]);
//     res.json({ exists: users.length > 0 });
//   } catch (error) {
//     console.error('Email check error:', error);
//     res.status(500).json({ error: error.message });
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
//   console.log('📝 POST /api/admin/users - Body:', req.body);
//   const { name, email, role } = req.body;
  
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required' });
//   }
  
//   try {
//     const user_id = `USR${Date.now()}`;
//     await pool.query(
//       'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, 1)',
//       [user_id, name, email, 'temp123', role || 'student']
//     );
//     console.log('✅ User created:', user_id);
//     res.status(201).json({ message: 'User created successfully', user_id });
//   } catch (error) {
//     console.error('❌ Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/users/:user_id', async (req, res) => {
//   const { name, email, is_active } = req.body;
//   const { user_id } = req.params;
//   console.log('✏️ UPDATE user:', user_id);
//   try {
//     await pool.query('UPDATE users SET name = ?, email = ?, is_active = ? WHERE user_id = ?', [name, email, is_active, user_id]);
//     res.json({ message: 'User updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/users/:user_id', async (req, res) => {
//   const { user_id } = req.params;
//   console.log('🗑️ DELETE user:', user_id);
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

// // ============= STUDENT RECORDS ROUTES =============
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

// // ============= COURSE OVERVIEW ROUTES =============
// app.get('/api/admin/course-overview', async (req, res) => {
//   try {
//     const [courses] = await pool.query(`
//       SELECT * FROM course_overview 
//       WHERE is_active = 1 
//       ORDER BY 
//         FIELD(semester, '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'),
//         course_code
//     `);
//     res.json(courses);
//   } catch (error) {
//     console.error('Error fetching course overview:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/admin/course-overview/:id', async (req, res) => {
//   try {
//     const [courses] = await pool.query('SELECT * FROM course_overview WHERE id = ?', [req.params.id]);
//     if (courses.length === 0) return res.status(404).json({ error: 'Course not found' });
//     res.json(courses[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/admin/course-overview/semester/:semester', async (req, res) => {
//   try {
//     const [courses] = await pool.query('SELECT * FROM course_overview WHERE semester = ? AND is_active = 1', [req.params.semester]);
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/course-overview', async (req, res) => {
//   const { course_code, course_name, credits, department, semester, prerequisites, description } = req.body;
  
//   if (!course_code || !course_name || !semester) {
//     return res.status(400).json({ error: 'Course code, name, and semester are required' });
//   }
  
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO course_overview (course_code, course_name, credits, department, semester, prerequisites, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
//       [course_code, course_name, credits || 3, department || null, semester, prerequisites || null, description || null]
//     );
//     res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
//   } catch (error) {
//     if (error.code === 'ER_DUP_ENTRY') {
//       return res.status(409).json({ error: 'Course code already exists' });
//     }
//     console.error('Error creating course:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/course-overview/:id', async (req, res) => {
//   const { course_code, course_name, credits, department, semester, prerequisites, description, is_active } = req.body;
  
//   try {
//     await pool.query(
//       'UPDATE course_overview SET course_code = ?, course_name = ?, credits = ?, department = ?, semester = ?, prerequisites = ?, description = ?, is_active = ? WHERE id = ?',
//       [course_code, course_name, credits, department, semester, prerequisites, description, is_active !== undefined ? is_active : 1, req.params.id]
//     );
//     res.json({ message: 'Course updated successfully' });
//   } catch (error) {
//     console.error('Error updating course:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/course-overview/:id', async (req, res) => {
//   try {
//     const [result] = await pool.query('DELETE FROM course_overview WHERE id = ?', [req.params.id]);
//     if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' });
//     res.json({ message: 'Course deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting course:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= COURSE ROUTES =============
// app.get('/api/admin/courses', async (req, res) => {
//   try {
//     const [courses] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/courses', async (req, res) => {
//   const { course_code, course_name, credits, department, description } = req.body;
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO courses (course_code, course_name, credits, department, description, is_active) VALUES (?, ?, ?, ?, ?, 1)',
//       [course_code, course_name, credits || 3, department || null, description || null]
//     );
//     res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/courses/:id', async (req, res) => {
//   const { course_name, credits, department, description } = req.body;
//   const { id } = req.params;
//   try {
//     await pool.query('UPDATE courses SET course_name = ?, credits = ?, department = ?, description = ? WHERE id = ?', 
//       [course_name, credits, department, description, id]);
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
//       SELECT u.user_id, u.name, u.email, 
//              f.department, f.designation, f.specialization, f.qualification, f.phone_extension
//       FROM users u 
//       JOIN faculty f ON u.user_id = f.user_id 
//       WHERE u.role = 'teacher'
//       ORDER BY u.created_at DESC
//     `);
//     res.json(faculty);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/faculty', async (req, res) => {
//   const { name, email, department, designation, specialization, qualification, phone_extension } = req.body;
  
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required' });
//   }
  
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();
    
//     const user_id = `FAC${Date.now()}`;
//     await connection.query(
//       'INSERT INTO users (user_id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, "teacher", 1)',
//       [user_id, name, email, 'temp123']
//     );
//     await connection.query(
//       'INSERT INTO faculty (user_id, department, designation, specialization, qualification, phone_extension) VALUES (?, ?, ?, ?, ?, ?)',
//       [user_id, department || null, designation || null, specialization || null, qualification || null, phone_extension || null]
//     );
    
//     await connection.commit();
//     res.status(201).json({ message: 'Faculty created successfully', user_id });
//   } catch (error) {
//     await connection.rollback();
//     res.status(500).json({ error: error.message });
//   } finally {
//     connection.release();
//   }
// });

// app.delete('/api/admin/faculty/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     await pool.query('DELETE FROM faculty WHERE user_id = ?', [userId]);
//     await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
//     res.json({ message: 'Faculty deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
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
//     const [result] = await pool.query(
//       'INSERT INTO academic_calendar (title, description, date, event_type, location) VALUES (?, ?, ?, ?, ?)',
//       [title, description || null, date, event_type || 'general', location || null]
//     );
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

// // ============= REPORTS ROUTES =============
// app.get('/api/admin/reports', async (req, res) => {
//   try {
//     const [reports] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
//     res.json(reports);
//   } catch (error) {
//     console.error('Error fetching reports:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/reports', async (req, res) => {
//   const { title, description, type, config } = req.body;
  
//   if (!title || !type) {
//     return res.status(400).json({ error: 'Title and type are required' });
//   }
  
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO reports (title, description, type, config, created_by, is_active) VALUES (?, ?, ?, ?, ?, 1)',
//       [title, description || '', type, JSON.stringify(config || {}), 'ADMIN001']
//     );
//     res.status(201).json({ id: result.insertId, message: 'Report created successfully' });
//   } catch (error) {
//     console.error('Error creating report:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/reports/:id', async (req, res) => {
//   const { title, description, type, config, is_active } = req.body;
//   const { id } = req.params;
  
//   try {
//     await pool.query(
//       'UPDATE reports SET title = ?, description = ?, type = ?, config = ?, is_active = ?, updated_at = NOW() WHERE id = ?',
//       [title, description, type, JSON.stringify(config || {}), is_active !== undefined ? is_active : 1, id]
//     );
//     res.json({ message: 'Report updated successfully' });
//   } catch (error) {
//     console.error('Error updating report:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/reports/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM reports WHERE id = ?', [id]);
//     res.json({ message: 'Report deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting report:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/reports/:id/generate', async (req, res) => {
//   const { id } = req.params;
//   const { format } = req.body;
  
//   try {
//     const [reports] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
//     if (reports.length === 0) {
//       return res.status(404).json({ error: 'Report not found' });
//     }
    
//     const report = reports[0];
//     let data = [];
    
//     switch(report.type) {
//       case 'student-enrollment':
//         const [students] = await pool.query('SELECT department, COUNT(*) as count FROM students GROUP BY department');
//         data = students;
//         break;
//       case 'academic-performance':
//         const [grades] = await pool.query('SELECT grade, COUNT(*) as count FROM results GROUP BY grade');
//         data = grades;
//         break;
//       case 'faculty-workload':
//         const [faculty] = await pool.query(`
//           SELECT u.name, COUNT(fc.course_id) as course_count 
//           FROM faculty f 
//           JOIN users u ON f.user_id = u.user_id 
//           LEFT JOIN faculty_courses fc ON f.user_id = fc.faculty_user_id 
//           GROUP BY u.name
//         `);
//         data = faculty;
//         break;
//       default:
//         data = { message: 'Report data generated', timestamp: new Date() };
//     }
    
//     res.json({ 
//       message: 'Report generated successfully', 
//       data, 
//       format: format || 'json',
//       report: { id: report.id, title: report.title, type: report.type }
//     });
//   } catch (error) {
//     console.error('Error generating report:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= ADMIN PROFILE ROUTES =============
// let adminProfile = {
//   name: 'EduAdmin',
//   email: 'eduadmin@swehub.com',
//   role: 'Super Administrator',
//   phone: '+1 (555) 123-4567',
//   location: 'New York, USA',
//   bio: 'Experienced system administrator with over 8 years in educational technology management.',
//   avatar_initials: 'EA'
// };

// app.get('/api/admin/profile', (req, res) => {
//   res.json(adminProfile);
// });

// app.put('/api/admin/profile', (req, res) => {
//   console.log('📥 Updating profile:', req.body);
//   const { name, email, role, phone, location, bio, avatar_initials } = req.body;
  
//   adminProfile = {
//     name: name || adminProfile.name,
//     email: email || adminProfile.email,
//     role: role || adminProfile.role,
//     phone: phone || adminProfile.phone,
//     location: location || adminProfile.location,
//     bio: bio || adminProfile.bio,
//     avatar_initials: avatar_initials || adminProfile.avatar_initials
//   };
  
//   res.json({ message: 'Profile updated successfully', profile: adminProfile });
// });

// // ============= SYSTEM SETTINGS ROUTES =============
// app.get('/api/admin/settings', async (req, res) => {
//   try {
//     const [settings] = await pool.query('SELECT setting_key, setting_value, setting_group FROM system_settings');
//     res.json(settings);
//   } catch (error) {
//     console.error('Error fetching settings:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/admin/settings/:group', async (req, res) => {
//   const { group } = req.params;
//   try {
//     const [settings] = await pool.query('SELECT setting_key, setting_value FROM system_settings WHERE setting_group = ?', [group]);
//     res.json(settings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/settings/:key', async (req, res) => {
//   const { key } = req.params;
//   const { value } = req.body;
//   try {
//     await pool.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
//     res.json({ message: 'Setting updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/settings/bulk', async (req, res) => {
//   const { settings } = req.body;
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();
//     for (const [key, value] of Object.entries(settings)) {
//       await connection.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
//     }
//     await connection.commit();
//     res.json({ message: 'All settings saved successfully' });
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error saving settings:', error);
//     res.status(500).json({ error: error.message });
//   } finally {
//     connection.release();
//   }
// });

// app.post('/api/admin/settings/reset', async (req, res) => {
//   try {
//     await pool.query(`UPDATE system_settings SET setting_value = CASE setting_key
//       WHEN 'grading_scale' THEN '4.0 Scale'
//       WHEN 'passing_grade' THEN '60%'
//       WHEN 'auto_calculate_gpa' THEN 'true'
//       WHEN 'show_gpa_to_students' THEN 'true'
//       WHEN 'two_factor_auth' THEN 'true'
//       WHEN 'password_expiry_days' THEN '90'
//       WHEN 'auto_lock_sessions' THEN 'true'
//       WHEN 'failed_login_lockout' THEN 'true'
//       WHEN 'email_notifications' THEN 'true'
//       WHEN 'sms_alerts' THEN 'false'
//       WHEN 'grade_publication_alerts' THEN 'true'
//       WHEN 'system_maintenance_alerts' THEN 'true'
//       WHEN 'auto_backup' THEN 'true'
//       WHEN 'backup_frequency' THEN 'Weekly'
//       WHEN 'data_retention_years' THEN '7'
//       WHEN 'auto_archive_records' THEN 'true'
//       WHEN 'system_language' THEN 'English (US)'
//       WHEN 'date_format' THEN 'MM/DD/YYYY'
//       WHEN 'time_zone' THEN 'UTC-5 (EST)'
//       WHEN 'currency_format' THEN 'USD ($)'
//       WHEN 'email_service' THEN 'SMTP'
//       WHEN 'sms_gateway' THEN 'Twilio'
//       WHEN 'payment_gateway' THEN 'Stripe'
//       WHEN 'api_access' THEN 'true'
//       ELSE setting_value END`);
//     res.json({ message: 'Settings reset to default successfully' });
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
    
//     res.json({
//       totalStudents: students[0].count,
//       totalTeachers: teachers[0].count,
//       totalCourses: courses[0].count,
//       pendingRequests: 0
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= TEST ENDPOINT =============
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend working" });
// });

// // ============= HEALTH CHECK =============
// app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'connected', timestamp: new Date() }));

// // ============= START SERVER =============
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
//   console.log(`📍 Test URL: http://localhost:${PORT}/api/health`);
//   console.log(`📁 Uploads directory: ${uploadDir}`);
//   console.log(`📁 Submissions directory: ${submissionsDir}`);
// });



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import pool from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============= MIDDLEWARE =============
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= FILE UPLOAD SETUP =============
const uploadDir = path.join(__dirname, 'uploads');
const submissionsDir = path.join(__dirname, 'submissions');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'submissions/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

app.locals.upload = upload;
app.use('/uploads', express.static(uploadDir));
app.use('/submissions', express.static(submissionsDir));

// ============= AUTH ROUTES =============
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // For now, compare plain text passwords (you should hash this in production)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    let redirectUrl = '/dashboard';
    if (user.role === 'student') redirectUrl = '/student-dashboard';
    else if (user.role === 'teacher') redirectUrl = '/teacher-dashboard';
    else if (user.role === 'admin') redirectUrl = '/admin-dashboard';
    
    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE user_id = ?', [user.user_id]);
    
    res.json({ 
      token: 'test-token-' + Date.now(), 
      user: { 
        user_id: user.user_id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
      redirectUrl: redirectUrl
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Registration endpoint - MATCHES YOUR EXACT TABLE STRUCTURE
app.post('/api/auth/register', async (req, res) => {
  const { userId, email, password, name, role, department, batchId } = req.body;
  
  console.log('📝 Registration attempt:', { userId, email, name, role, department, batchId });
  
  try {
    // Check if email already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Check if user_id already exists
    const [existingIds] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (existingIds.length > 0) {
      return res.status(400).json({ error: 'User ID already exists' });
    }
    
    // Insert into users table - using your exact column names
    await pool.query(
      'INSERT INTO users (user_id, email, password, name, role, department, batch_id, is_active, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)',
      [userId, email, password, name, role, department || null, batchId || null]
    );
    
    console.log('✅ User registered successfully:', userId);
    res.status(201).json({ message: 'Registration successful' });
    
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

// Email availability check endpoint
app.get('/api/auth/check-email/:email', async (req, res) => {
  const { email } = req.params;
  
  try {
    const [users] = await pool.query('SELECT user_id FROM users WHERE email = ?', [email]);
    res.json({ exists: users.length > 0 });
  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({ error: error.message });
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
  console.log('📝 POST /api/admin/users - Body:', req.body);
  const { name, email, role, department, batch_id } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  try {
    const user_id = `USR${Date.now()}`;
    await pool.query(
      'INSERT INTO users (user_id, name, email, password, role, department, batch_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
      [user_id, name, email, 'temp123', role || 'student', department || null, batch_id || null]
    );
    console.log('✅ User created:', user_id);
    res.status(201).json({ message: 'User created successfully', user_id });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/users/:user_id', async (req, res) => {
  const { name, email, is_active, department, batch_id } = req.body;
  const { user_id } = req.params;
  console.log('✏️ UPDATE user:', user_id);
  try {
    await pool.query('UPDATE users SET name = ?, email = ?, is_active = ?, department = ?, batch_id = ? WHERE user_id = ?', 
      [name, email, is_active, department || null, batch_id || null, user_id]);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  console.log('🗑️ DELETE user:', user_id);
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

// ============= STUDENT RECORDS ROUTES =============
app.get('/api/admin/students', async (req, res) => {
  try {
    const [students] = await pool.query(`
      SELECT user_id, name, email, department, batch_id 
      FROM users 
      WHERE role = 'student'
    `);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= COURSE OVERVIEW ROUTES =============
app.get('/api/admin/course-overview', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT * FROM course_overview 
      WHERE is_active = 1 
      ORDER BY 
        FIELD(semester, '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'),
        course_code
    `);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching course overview:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/course-overview/:id', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM course_overview WHERE id = ?', [req.params.id]);
    if (courses.length === 0) return res.status(404).json({ error: 'Course not found' });
    res.json(courses[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/course-overview/semester/:semester', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM course_overview WHERE semester = ? AND is_active = 1', [req.params.semester]);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/course-overview', async (req, res) => {
  const { course_code, course_name, credits, department, semester, prerequisites, description } = req.body;
  
  if (!course_code || !course_name || !semester) {
    return res.status(400).json({ error: 'Course code, name, and semester are required' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO course_overview (course_code, course_name, credits, department, semester, prerequisites, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
      [course_code, course_name, credits || 3, department || null, semester, prerequisites || null, description || null]
    );
    res.status(201).json({ id: result.insertId, message: 'Course created successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Course code already exists' });
    }
    console.error('Error creating course:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/course-overview/:id', async (req, res) => {
  const { course_code, course_name, credits, department, semester, prerequisites, description, is_active } = req.body;
  
  try {
    await pool.query(
      'UPDATE course_overview SET course_code = ?, course_name = ?, credits = ?, department = ?, semester = ?, prerequisites = ?, description = ?, is_active = ? WHERE id = ?',
      [course_code, course_name, credits, department, semester, prerequisites, description, is_active !== undefined ? is_active : 1, req.params.id]
    );
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/course-overview/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM course_overview WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============= COURSE ROUTES =============
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
      [course_code, course_name, credits || 3, department || null, description || null]
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

// ============= FACULTY ROUTES =============
app.get('/api/admin/faculty', async (req, res) => {
  try {
    const [faculty] = await pool.query(`
      SELECT user_id, name, email, department 
      FROM users 
      WHERE role = 'teacher'
      ORDER BY created_at DESC
    `);
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/faculty', async (req, res) => {
  const { name, email, department } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  try {
    const user_id = `FAC${Date.now()}`;
    await pool.query(
      'INSERT INTO users (user_id, name, email, password, role, department, is_active) VALUES (?, ?, ?, ?, "teacher", ?, 1)',
      [user_id, name, email, 'temp123', department || null]
    );
    res.status(201).json({ message: 'Faculty created successfully', user_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/faculty/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const [result] = await pool.query(
      'INSERT INTO academic_calendar (title, description, date, event_type, location) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, date, event_type || 'general', location || null]
    );
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

// ============= REPORTS ROUTES =============
app.get('/api/admin/reports', async (req, res) => {
  try {
    const [reports] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/reports', async (req, res) => {
  const { title, description, type, config } = req.body;
  
  if (!title || !type) {
    return res.status(400).json({ error: 'Title and type are required' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO reports (title, description, type, config, created_by, is_active) VALUES (?, ?, ?, ?, ?, 1)',
      [title, description || '', type, JSON.stringify(config || {}), 'ADMIN001']
    );
    res.status(201).json({ id: result.insertId, message: 'Report created successfully' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/reports/:id', async (req, res) => {
  const { title, description, type, config, is_active } = req.body;
  const { id } = req.params;
  
  try {
    await pool.query(
      'UPDATE reports SET title = ?, description = ?, type = ?, config = ?, is_active = ?, updated_at = NOW() WHERE id = ?',
      [title, description, type, JSON.stringify(config || {}), is_active !== undefined ? is_active : 1, id]
    );
    res.json({ message: 'Report updated successfully' });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/reports/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM reports WHERE id = ?', [id]);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/reports/:id/generate', async (req, res) => {
  const { id } = req.params;
  const { format } = req.body;
  
  try {
    const [reports] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
    if (reports.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    const report = reports[0];
    let data = [];
    
    switch(report.type) {
      case 'student-enrollment':
        const [students] = await pool.query('SELECT department, COUNT(*) as count FROM users WHERE role = "student" GROUP BY department');
        data = students;
        break;
      case 'academic-performance':
        const [grades] = await pool.query('SELECT grade, COUNT(*) as count FROM results GROUP BY grade');
        data = grades;
        break;
      case 'faculty-workload':
        const [faculty] = await pool.query('SELECT name, department FROM users WHERE role = "teacher"');
        data = faculty;
        break;
      default:
        data = { message: 'Report data generated', timestamp: new Date() };
    }
    
    res.json({ 
      message: 'Report generated successfully', 
      data, 
      format: format || 'json',
      report: { id: report.id, title: report.title, type: report.type }
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============= ADMIN PROFILE ROUTES =============
let adminProfile = {
  name: 'EduAdmin',
  email: 'eduadmin@swehub.com',
  role: 'Super Administrator',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  bio: 'Experienced system administrator with over 8 years in educational technology management.',
  avatar_initials: 'EA'
};

app.get('/api/admin/profile', (req, res) => {
  res.json(adminProfile);
});

app.put('/api/admin/profile', (req, res) => {
  console.log('📥 Updating profile:', req.body);
  const { name, email, role, phone, location, bio, avatar_initials } = req.body;
  
  adminProfile = {
    name: name || adminProfile.name,
    email: email || adminProfile.email,
    role: role || adminProfile.role,
    phone: phone || adminProfile.phone,
    location: location || adminProfile.location,
    bio: bio || adminProfile.bio,
    avatar_initials: avatar_initials || adminProfile.avatar_initials
  };
  
  res.json({ message: 'Profile updated successfully', profile: adminProfile });
});

// ============= SYSTEM SETTINGS ROUTES =============
app.get('/api/admin/settings', async (req, res) => {
  try {
    const [settings] = await pool.query('SELECT setting_key, setting_value, setting_group FROM system_settings');
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/settings/:group', async (req, res) => {
  const { group } = req.params;
  try {
    const [settings] = await pool.query('SELECT setting_key, setting_value FROM system_settings WHERE setting_group = ?', [group]);
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/settings/:key', async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    await pool.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
    res.json({ message: 'Setting updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/settings/bulk', async (req, res) => {
  const { settings } = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const [key, value] of Object.entries(settings)) {
      await connection.query('UPDATE system_settings SET setting_value = ? WHERE setting_key = ?', [String(value), key]);
    }
    await connection.commit();
    res.json({ message: 'All settings saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving settings:', error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

app.post('/api/admin/settings/reset', async (req, res) => {
  try {
    await pool.query(`UPDATE system_settings SET setting_value = CASE setting_key
      WHEN 'grading_scale' THEN '4.0 Scale'
      WHEN 'passing_grade' THEN '60%'
      WHEN 'auto_calculate_gpa' THEN 'true'
      WHEN 'show_gpa_to_students' THEN 'true'
      WHEN 'two_factor_auth' THEN 'true'
      WHEN 'password_expiry_days' THEN '90'
      WHEN 'auto_lock_sessions' THEN 'true'
      WHEN 'failed_login_lockout' THEN 'true'
      WHEN 'email_notifications' THEN 'true'
      WHEN 'sms_alerts' THEN 'false'
      WHEN 'grade_publication_alerts' THEN 'true'
      WHEN 'system_maintenance_alerts' THEN 'true'
      WHEN 'auto_backup' THEN 'true'
      WHEN 'backup_frequency' THEN 'Weekly'
      WHEN 'data_retention_years' THEN '7'
      WHEN 'auto_archive_records' THEN 'true'
      WHEN 'system_language' THEN 'English (US)'
      WHEN 'date_format' THEN 'MM/DD/YYYY'
      WHEN 'time_zone' THEN 'UTC-5 (EST)'
      WHEN 'currency_format' THEN 'USD ($)'
      WHEN 'email_service' THEN 'SMTP'
      WHEN 'sms_gateway' THEN 'Twilio'
      WHEN 'payment_gateway' THEN 'Stripe'
      WHEN 'api_access' THEN 'true'
      ELSE setting_value END`);
    res.json({ message: 'Settings reset to default successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= DASHBOARD STATS =============
app.get('/api/admin/dashboard/stats', async (req, res) => {
  try {
    const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
    const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1");
    const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin' AND is_active = 1");
    
    res.json({
      totalStudents: students[0].count,
      totalTeachers: teachers[0].count,
      totalAdmins: admins[0].count,
      pendingRequests: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= TEST & HEALTH ENDPOINTS =============
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working" });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'connected', timestamp: new Date() }));

// ============= START SERVER =============
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Test URL: http://localhost:${PORT}/api/health`);
  console.log(`📁 Uploads directory: ${uploadDir}`);
  console.log(`📁 Submissions directory: ${submissionsDir}`);
});
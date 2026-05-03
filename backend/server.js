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
// const uploadDir = path.join(__dirname, 'uploads');
// const submissionsDir = path.join(__dirname, 'submissions');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// if (!fs.existsSync(submissionsDir)) {
//   fs.mkdirSync(submissionsDir, { recursive: true });
// }

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
    
//     // For now, compare plain text passwords (you should hash this in production)
//     if (user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     let redirectUrl = '/dashboard';
//     if (user.role === 'student') redirectUrl = '/student-dashboard';
//     else if (user.role === 'teacher') redirectUrl = '/teacher-dashboard';
//     else if (user.role === 'admin') redirectUrl = '/admin-dashboard';
    
//     // Update last login
//     await pool.query('UPDATE users SET last_login = NOW() WHERE user_id = ?', [user.user_id]);
    
//     res.json({ 
//       token: 'test-token-' + Date.now(), 
//       user: { 
//         user_id: user.user_id, 
//         name: user.name, 
//         email: user.email, 
//         role: user.role,
//         semester_id: user.semester_id || 0
//       },
//       redirectUrl: redirectUrl
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Registration endpoint - WITH semester_id support
// app.post('/api/auth/register', async (req, res) => {
//   const { userId, email, password, name, role, department, batchId, semesterId } = req.body;
  
//   console.log('📝 Registration attempt:', { userId, email, name, role, department, batchId, semesterId });
  
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
    
//     // Set semester_id based on role (0 for teachers/admins, provided value for students)
//     let semesterIdValue = 0;
//     if (role === 'student') {
//       semesterIdValue = semesterId || 1; // Default to semester 1 if not provided
//     }
    
//     // Insert into users table with semester_id
//     await pool.query(
//       'INSERT INTO users (user_id, email, password, name, role, department, batch_id, semester_id, is_active, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 0)',
//       [userId, email, password, name, role, department || null, batchId || null, semesterIdValue]
//     );
    
//     console.log('✅ User registered successfully:', userId);
//     res.status(201).json({ message: 'Registration successful' });
    
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

// // ============= USER ROUTES (UPDATED with semester_id) =============
// app.get('/api/admin/users', async (req, res) => {
//   try {
//     const [users] = await pool.query('SELECT user_id, name, email, role, department, batch_id, semester_id, is_active, created_at FROM users');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/users', async (req, res) => {
//   console.log('📝 POST /api/admin/users - Body:', req.body);
//   const { name, email, role, department, batch_id, semester_id } = req.body;
  
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required' });
//   }
  
//   try {
//     const user_id = `USR${Date.now()}`;
//     let semesterIdValue = 0;
//     if (role === 'student') {
//       semesterIdValue = semester_id || 1;
//     }
    
//     await pool.query(
//       'INSERT INTO users (user_id, name, email, password, role, department, batch_id, semester_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)',
//       [user_id, name, email, 'temp123', role || 'student', department || null, batch_id || null, semesterIdValue]
//     );
//     console.log('✅ User created:', user_id);
//     res.status(201).json({ message: 'User created successfully', user_id });
//   } catch (error) {
//     console.error('❌ Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/api/admin/users/:user_id', async (req, res) => {
//   const { name, email, is_active, department, batch_id, semester_id, role } = req.body;
//   const { user_id } = req.params;
//   console.log('✏️ UPDATE user:', user_id);
//   try {
//     let semesterIdValue = 0;
//     if (role === 'student') {
//       semesterIdValue = semester_id || 1;
//     }
    
//     await pool.query(
//       'UPDATE users SET name = ?, email = ?, is_active = ?, department = ?, batch_id = ?, semester_id = ? WHERE user_id = ?', 
//       [name, email, is_active, department || null, batch_id || null, semesterIdValue, user_id]
//     );
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


// // ============= STUDENT COURSE OVERVIEW ROUTES =============
// // Get all courses for student view
// app.get('/api/student/courses', async (req, res) => {
//   try {
//     const [courses] = await pool.query(`
//       SELECT id, course_code, course_name, credits, department, semester, 
//              prerequisites, description, is_active 
//       FROM course_overview 
//       WHERE is_active = 1 
//       ORDER BY 
//         FIELD(semester, '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', 
//               '5th Semester', '6th Semester', '7th Semester', '8th Semester'),
//         course_code
//     `);
//     res.json(courses);
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get single course details
// app.get('/api/student/courses/:id', async (req, res) => {
//   try {
//     const [courses] = await pool.query('SELECT * FROM course_overview WHERE id = ?', [req.params.id]);
//     if (courses.length === 0) {
//       return res.status(404).json({ error: 'Course not found' });
//     }
//     res.json(courses[0]);
//   } catch (error) {
//     console.error('Error fetching course:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get courses by semester
// app.get('/api/student/semesters/:semester/courses', async (req, res) => {
//   try {
//     const [courses] = await pool.query(
//       'SELECT * FROM course_overview WHERE semester = ? AND is_active = 1',
//       [req.params.semester]
//     );
//     res.json(courses);
//   } catch (error) {
//     console.error('Error fetching semester courses:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= STUDENT RESULTS MANAGEMENT ROUTES =============

// // Get all students with their semester info
// app.get('/api/admin/results/students', async (req, res) => {
//   try {
//     const [students] = await pool.query(`
//       SELECT user_id, name, email, department, batch_id, semester_id 
//       FROM users 
//       WHERE role = 'student'
//       ORDER BY semester_id, batch_id, name
//     `);
//     res.json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get courses for a specific semester from course_overview
// app.get('/api/admin/results/courses/:semester', async (req, res) => {
//   try {
//     const [courses] = await pool.query(`
//       SELECT id, course_code, course_name, credits 
//       FROM course_overview 
//       WHERE semester = ? AND is_active = 1
//       ORDER BY course_code
//     `, [req.params.semester]);
//     res.json(courses);
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get all semesters list
// app.get('/api/admin/results/semesters', async (req, res) => {
//   try {
//     const [semesters] = await pool.query(`
//       SELECT DISTINCT semester, 
//              CASE 
//                WHEN semester = '1st Semester' THEN 1
//                WHEN semester = '2nd Semester' THEN 2
//                WHEN semester = '3rd Semester' THEN 3
//                WHEN semester = '4th Semester' THEN 4
//                WHEN semester = '5th Semester' THEN 5
//                WHEN semester = '6th Semester' THEN 6
//                WHEN semester = '7th Semester' THEN 7
//                WHEN semester = '8th Semester' THEN 8
//              END as semester_order
//       FROM course_overview 
//       WHERE is_active = 1
//       ORDER BY semester_order
//     `);
//     res.json(semesters);
//   } catch (error) {
//     console.error('Error fetching semesters:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get student results for all semesters
// app.get('/api/admin/results/student/:studentId', async (req, res) => {
//   const { studentId } = req.params;
  
//   try {
//     // Get student info
//     const [students] = await pool.query(`
//       SELECT user_id, name, email, semester_id as current_semester
//       FROM users 
//       WHERE user_id = ? AND role = 'student'
//     `, [studentId]);
    
//     if (students.length === 0) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
    
//     const student = students[0];
    
//     // Get all results for this student
//     const [results] = await pool.query(`
//       SELECT sr.*, 
//              sr.semester_id as semester_num,
//              CASE 
//                WHEN sr.semester_id = 1 THEN '1st Semester'
//                WHEN sr.semester_id = 2 THEN '2nd Semester'
//                WHEN sr.semester_id = 3 THEN '3rd Semester'
//                WHEN sr.semester_id = 4 THEN '4th Semester'
//                WHEN sr.semester_id = 5 THEN '5th Semester'
//                WHEN sr.semester_id = 6 THEN '6th Semester'
//                WHEN sr.semester_id = 7 THEN '7th Semester'
//                WHEN sr.semester_id = 8 THEN '8th Semester'
//              END as semester_name
//       FROM semester_results sr
//       WHERE sr.student_user_id = ?
//       ORDER BY sr.semester_id, sr.course_code
//     `, [studentId]);
    
//     // Group results by semester
//     const resultsBySemester = {};
//     results.forEach(result => {
//       if (!resultsBySemester[result.semester_id]) {
//         resultsBySemester[result.semester_id] = {
//           semester_id: result.semester_id,
//           semester_name: result.semester_name,
//           courses: [],
//           total_credits: 0,
//           total_points: 0,
//           gpa: 0
//         };
//       }
//       resultsBySemester[result.semester_id].courses.push(result);
//       resultsBySemester[result.semester_id].total_credits += result.credits;
//       resultsBySemester[result.semester_id].total_points += (result.grade_points || 0) * result.credits;
//     });
    
//     // Calculate GPA for each semester
//     Object.keys(resultsBySemester).forEach(semId => {
//       const sem = resultsBySemester[semId];
//       if (sem.total_credits > 0) {
//         sem.gpa = (sem.total_points / sem.total_credits).toFixed(2);
//       }
//     });
    
//     res.json({
//       student: student,
//       results: resultsBySemester,
//       current_semester: student.current_semester
//     });
//   } catch (error) {
//     console.error('Error fetching student results:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Save or update student result
// app.post('/api/admin/results/save', async (req, res) => {
//   const { student_user_id, semester_id, course_id, course_code, course_name, credits, grade, grade_points, status, remarks } = req.body;
  
//   try {
//     // Check if result already exists
//     const [existing] = await pool.query(
//       'SELECT id FROM semester_results WHERE student_user_id = ? AND semester_id = ? AND course_id = ?',
//       [student_user_id, semester_id, course_id]
//     );
    
//     if (existing.length > 0) {
//       // Update existing result
//       await pool.query(`
//         UPDATE semester_results 
//         SET grade = ?, grade_points = ?, status = ?, remarks = ?, updated_at = NOW()
//         WHERE student_user_id = ? AND semester_id = ? AND course_id = ?
//       `, [grade, grade_points, status, remarks, student_user_id, semester_id, course_id]);
//       res.json({ message: 'Result updated successfully' });
//     } else {
//       // Insert new result
//       await pool.query(`
//         INSERT INTO semester_results 
//         (student_user_id, semester_id, course_id, course_code, course_name, credits, grade, grade_points, status, remarks)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `, [student_user_id, semester_id, course_id, course_code, course_name, credits, grade, grade_points, status, remarks]);
//       res.json({ message: 'Result saved successfully' });
//     }
//   } catch (error) {
//     console.error('Error saving result:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Calculate GPA for a semester
// app.post('/api/admin/results/calculate-gpa', async (req, res) => {
//   const { student_user_id, semester_id } = req.body;
  
//   try {
//     const [results] = await pool.query(`
//       SELECT credits, grade_points 
//       FROM semester_results 
//       WHERE student_user_id = ? AND semester_id = ?
//     `, [student_user_id, semester_id]);
    
//     let total_credits = 0;
//     let total_points = 0;
    
//     results.forEach(result => {
//       if (result.grade_points && result.grade_points > 0) {
//         total_credits += result.credits;
//         total_points += result.grade_points * result.credits;
//       }
//     });
    
//     const gpa = total_credits > 0 ? (total_points / total_credits).toFixed(2) : 0;
    
//     res.json({ gpa, total_credits, total_points });
//   } catch (error) {
//     console.error('Error calculating GPA:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= STUDENT RECORDS ROUTES (UPDATED with semester_id) =============
// app.get('/api/admin/students', async (req, res) => {
//   try {
//     const [students] = await pool.query(`
//       SELECT user_id, name, email, department, batch_id, semester_id 
//       FROM users 
//       WHERE role = 'student'
//       ORDER BY semester_id, batch_id, name
//     `);
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update student semester
// app.put('/api/admin/students/:user_id/semester', async (req, res) => {
//   const { user_id } = req.params;
//   const { semester_id } = req.body;
  
//   try {
//     await pool.query(
//       'UPDATE users SET semester_id = ? WHERE user_id = ? AND role = "student"',
//       [semester_id, user_id]
//     );
//     res.json({ message: 'Semester updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
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
//       SELECT user_id, name, email, department 
//       FROM users 
//       WHERE role = 'teacher'
//       ORDER BY created_at DESC
//     `);
//     res.json(faculty);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/admin/faculty', async (req, res) => {
//   const { name, email, department } = req.body;
  
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required' });
//   }
  
//   try {
//     const user_id = `FAC${Date.now()}`;
//     await pool.query(
//       'INSERT INTO users (user_id, name, email, password, role, department, semester_id, is_active) VALUES (?, ?, ?, ?, "teacher", ?, 0, 1)',
//       [user_id, name, email, 'temp123', department || null]
//     );
//     res.status(201).json({ message: 'Faculty created successfully', user_id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/api/admin/faculty/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
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
//         const [students] = await pool.query('SELECT semester_id, COUNT(*) as count FROM users WHERE role = "student" GROUP BY semester_id');
//         data = students;
//         break;
//       case 'academic-performance':
//         const [grades] = await pool.query('SELECT grade, COUNT(*) as count FROM results GROUP BY grade');
//         data = grades;
//         break;
//       case 'faculty-workload':
//         const [faculty] = await pool.query('SELECT name, department FROM users WHERE role = "teacher"');
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

// // ============= DASHBOARD STATS (UPDATED with semester stats) =============
// app.get('/api/admin/dashboard/stats', async (req, res) => {
//   try {
//     const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
//     const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1");
//     const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin' AND is_active = 1");
//     const [bySemester] = await pool.query("SELECT semester_id, COUNT(*) as count FROM users WHERE role = 'student' GROUP BY semester_id");
    
//     res.json({
//       totalStudents: students[0].count,
//       totalTeachers: teachers[0].count,
//       totalAdmins: admins[0].count,
//       studentsBySemester: bySemester,
//       pendingRequests: 0
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ============= TEST & HEALTH ENDPOINTS =============
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend working" });
// });

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
        role: user.role,
        semester_id: user.semester_id || 0
      },
      redirectUrl: redirectUrl
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Registration endpoint - WITH semester_id support
app.post('/api/auth/register', async (req, res) => {
  const { userId, email, password, name, role, department, batchId, semesterId } = req.body;
  
  console.log('📝 Registration attempt:', { userId, email, name, role, department, batchId, semesterId });
  
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
    
    // Set semester_id based on role (0 for teachers/admins, provided value for students)
    let semesterIdValue = 0;
    if (role === 'student') {
      semesterIdValue = semesterId || 1; // Default to semester 1 if not provided
    }
    
    // Insert into users table with semester_id
    await pool.query(
      'INSERT INTO users (user_id, email, password, name, role, department, batch_id, semester_id, is_active, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 0)',
      [userId, email, password, name, role, department || null, batchId || null, semesterIdValue]
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

// ============= USER ROUTES (UPDATED with semester_id) =============
app.get('/api/admin/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT user_id, name, email, role, department, batch_id, semester_id, is_active, created_at FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/users', async (req, res) => {
  console.log('📝 POST /api/admin/users - Body:', req.body);
  const { name, email, role, department, batch_id, semester_id } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  try {
    const user_id = `USR${Date.now()}`;
    let semesterIdValue = 0;
    if (role === 'student') {
      semesterIdValue = semester_id || 1;
    }
    
    await pool.query(
      'INSERT INTO users (user_id, name, email, password, role, department, batch_id, semester_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)',
      [user_id, name, email, 'temp123', role || 'student', department || null, batch_id || null, semesterIdValue]
    );
    console.log('✅ User created:', user_id);
    res.status(201).json({ message: 'User created successfully', user_id });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/users/:user_id', async (req, res) => {
  const { name, email, is_active, department, batch_id, semester_id, role } = req.body;
  const { user_id } = req.params;
  console.log('✏️ UPDATE user:', user_id);
  try {
    let semesterIdValue = 0;
    if (role === 'student') {
      semesterIdValue = semester_id || 1;
    }
    
    await pool.query(
      'UPDATE users SET name = ?, email = ?, is_active = ?, department = ?, batch_id = ?, semester_id = ? WHERE user_id = ?', 
      [name, email, is_active, department || null, batch_id || null, semesterIdValue, user_id]
    );
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

// ============= STUDENT COURSE OVERVIEW ROUTES =============
// Get all courses for student view
app.get('/api/student/courses', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT id, course_code, course_name, credits, department, semester, 
             prerequisites, description, is_active 
      FROM course_overview 
      WHERE is_active = 1 
      ORDER BY 
        FIELD(semester, '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', 
              '5th Semester', '6th Semester', '7th Semester', '8th Semester'),
        course_code
    `);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single course details
app.get('/api/student/courses/:id', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM course_overview WHERE id = ?', [req.params.id]);
    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(courses[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get courses by semester
app.get('/api/student/semesters/:semester/courses', async (req, res) => {
  try {
    const [courses] = await pool.query(
      'SELECT * FROM course_overview WHERE semester = ? AND is_active = 1',
      [req.params.semester]
    );
    res.json(courses);
  } catch (error) {
    console.error('Error fetching semester courses:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============= STUDENT RESULTS ROUTES =============
// Get student results for logged-in student
app.get('/api/student/results/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    // Get student info
    const [students] = await pool.query(`
      SELECT user_id, name, email, semester_id as current_semester
      FROM users 
      WHERE user_id = ? AND role = 'student'
    `, [studentId]);
    
    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    const student = students[0];
    
    // Get all results for this student
    const [results] = await pool.query(`
      SELECT sr.id, sr.semester_id, sr.course_code, sr.course_name, 
             sr.credits, sr.grade, sr.grade_points, sr.status, sr.remarks,
             CASE 
               WHEN sr.semester_id = 1 THEN '1st Semester'
               WHEN sr.semester_id = 2 THEN '2nd Semester'
               WHEN sr.semester_id = 3 THEN '3rd Semester'
               WHEN sr.semester_id = 4 THEN '4th Semester'
               WHEN sr.semester_id = 5 THEN '5th Semester'
               WHEN sr.semester_id = 6 THEN '6th Semester'
               WHEN sr.semester_id = 7 THEN '7th Semester'
               WHEN sr.semester_id = 8 THEN '8th Semester'
             END as semester_name
      FROM semester_results sr
      WHERE sr.student_user_id = ?
      ORDER BY sr.semester_id, sr.course_code
    `, [studentId]);
    
    // Group results by semester
    const resultsBySemester = {};
    results.forEach(result => {
      if (!resultsBySemester[result.semester_id]) {
        resultsBySemester[result.semester_id] = {
          semester_id: result.semester_id,
          semester_name: result.semester_name,
          courses: [],
          total_credits: 0,
          total_points: 0,
          gpa: 0
        };
      }
      resultsBySemester[result.semester_id].courses.push(result);
      resultsBySemester[result.semester_id].total_credits += result.credits;
      resultsBySemester[result.semester_id].total_points += (result.grade_points || 0) * result.credits;
    });
    
    // Calculate GPA for each semester
    Object.keys(resultsBySemester).forEach(semId => {
      const sem = resultsBySemester[semId];
      if (sem.total_credits > 0) {
        sem.gpa = (sem.total_points / sem.total_credits).toFixed(2);
      }
    });
    
    res.json({
      student: student,
      results: resultsBySemester,
      current_semester: student.current_semester
    });
  } catch (error) {
    console.error('Error fetching student results:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============= ADMIN RESULTS MANAGEMENT ROUTES =============
// Get all students with their semester info
app.get('/api/admin/results/students', async (req, res) => {
  try {
    const [students] = await pool.query(`
      SELECT user_id, name, email, department, batch_id, semester_id 
      FROM users 
      WHERE role = 'student'
      ORDER BY semester_id, batch_id, name
    `);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get courses for a specific semester from course_overview
app.get('/api/admin/results/courses/:semester', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT id, course_code, course_name, credits 
      FROM course_overview 
      WHERE semester = ? AND is_active = 1
      ORDER BY course_code
    `, [req.params.semester]);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all semesters list
app.get('/api/admin/results/semesters', async (req, res) => {
  try {
    const [semesters] = await pool.query(`
      SELECT DISTINCT semester, 
             CASE 
               WHEN semester = '1st Semester' THEN 1
               WHEN semester = '2nd Semester' THEN 2
               WHEN semester = '3rd Semester' THEN 3
               WHEN semester = '4th Semester' THEN 4
               WHEN semester = '5th Semester' THEN 5
               WHEN semester = '6th Semester' THEN 6
               WHEN semester = '7th Semester' THEN 7
               WHEN semester = '8th Semester' THEN 8
             END as semester_order
      FROM course_overview 
      WHERE is_active = 1
      ORDER BY semester_order
    `);
    res.json(semesters);
  } catch (error) {
    console.error('Error fetching semesters:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get student results for all semesters (Admin view)
app.get('/api/admin/results/student/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    // Get student info
    const [students] = await pool.query(`
      SELECT user_id, name, email, semester_id as current_semester
      FROM users 
      WHERE user_id = ? AND role = 'student'
    `, [studentId]);
    
    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    const student = students[0];
    
    // Get all results for this student
    const [results] = await pool.query(`
      SELECT sr.*, 
             sr.semester_id as semester_num,
             CASE 
               WHEN sr.semester_id = 1 THEN '1st Semester'
               WHEN sr.semester_id = 2 THEN '2nd Semester'
               WHEN sr.semester_id = 3 THEN '3rd Semester'
               WHEN sr.semester_id = 4 THEN '4th Semester'
               WHEN sr.semester_id = 5 THEN '5th Semester'
               WHEN sr.semester_id = 6 THEN '6th Semester'
               WHEN sr.semester_id = 7 THEN '7th Semester'
               WHEN sr.semester_id = 8 THEN '8th Semester'
             END as semester_name
      FROM semester_results sr
      WHERE sr.student_user_id = ?
      ORDER BY sr.semester_id, sr.course_code
    `, [studentId]);
    
    // Group results by semester
    const resultsBySemester = {};
    results.forEach(result => {
      if (!resultsBySemester[result.semester_id]) {
        resultsBySemester[result.semester_id] = {
          semester_id: result.semester_id,
          semester_name: result.semester_name,
          courses: [],
          total_credits: 0,
          total_points: 0,
          gpa: 0
        };
      }
      resultsBySemester[result.semester_id].courses.push(result);
      resultsBySemester[result.semester_id].total_credits += result.credits;
      resultsBySemester[result.semester_id].total_points += (result.grade_points || 0) * result.credits;
    });
    
    // Calculate GPA for each semester
    Object.keys(resultsBySemester).forEach(semId => {
      const sem = resultsBySemester[semId];
      if (sem.total_credits > 0) {
        sem.gpa = (sem.total_points / sem.total_credits).toFixed(2);
      }
    });
    
    res.json({
      student: student,
      results: resultsBySemester,
      current_semester: student.current_semester
    });
  } catch (error) {
    console.error('Error fetching student results:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save or update student result
app.post('/api/admin/results/save', async (req, res) => {
  const { student_user_id, semester_id, course_id, course_code, course_name, credits, grade, grade_points, status, remarks } = req.body;
  
  try {
    // Check if result already exists
    const [existing] = await pool.query(
      'SELECT id FROM semester_results WHERE student_user_id = ? AND semester_id = ? AND course_id = ?',
      [student_user_id, semester_id, course_id]
    );
    
    if (existing.length > 0) {
      // Update existing result
      await pool.query(`
        UPDATE semester_results 
        SET grade = ?, grade_points = ?, status = ?, remarks = ?, updated_at = NOW()
        WHERE student_user_id = ? AND semester_id = ? AND course_id = ?
      `, [grade, grade_points, status, remarks, student_user_id, semester_id, course_id]);
      res.json({ message: 'Result updated successfully' });
    } else {
      // Insert new result
      await pool.query(`
        INSERT INTO semester_results 
        (student_user_id, semester_id, course_id, course_code, course_name, credits, grade, grade_points, status, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [student_user_id, semester_id, course_id, course_code, course_name, credits, grade, grade_points, status, remarks]);
      res.json({ message: 'Result saved successfully' });
    }
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: error.message });
  }
});

// Calculate GPA for a semester
app.post('/api/admin/results/calculate-gpa', async (req, res) => {
  const { student_user_id, semester_id } = req.body;
  
  try {
    const [results] = await pool.query(`
      SELECT credits, grade_points 
      FROM semester_results 
      WHERE student_user_id = ? AND semester_id = ?
    `, [student_user_id, semester_id]);
    
    let total_credits = 0;
    let total_points = 0;
    
    results.forEach(result => {
      if (result.grade_points && result.grade_points > 0) {
        total_credits += result.credits;
        total_points += result.grade_points * result.credits;
      }
    });
    
    const gpa = total_credits > 0 ? (total_points / total_credits).toFixed(2) : 0;
    
    res.json({ gpa, total_credits, total_points });
  } catch (error) {
    console.error('Error calculating GPA:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============= STUDENT RECORDS ROUTES (UPDATED with semester_id) =============
app.get('/api/admin/students', async (req, res) => {
  try {
    const [students] = await pool.query(`
      SELECT user_id, name, email, department, batch_id, semester_id 
      FROM users 
      WHERE role = 'student'
      ORDER BY semester_id, batch_id, name
    `);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student semester
app.put('/api/admin/students/:user_id/semester', async (req, res) => {
  const { user_id } = req.params;
  const { semester_id } = req.body;
  
  try {
    await pool.query(
      'UPDATE users SET semester_id = ? WHERE user_id = ? AND role = "student"',
      [semester_id, user_id]
    );
    res.json({ message: 'Semester updated successfully' });
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
      'INSERT INTO users (user_id, name, email, password, role, department, semester_id, is_active) VALUES (?, ?, ?, ?, "teacher", ?, 0, 1)',
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
        const [students] = await pool.query('SELECT semester_id, COUNT(*) as count FROM users WHERE role = "student" GROUP BY semester_id');
        data = students;
        break;
      case 'academic-performance':
        const [grades] = await pool.query('SELECT grade, COUNT(*) as count FROM semester_results GROUP BY grade');
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

// ============= DASHBOARD STATS (UPDATED with semester stats) =============
app.get('/api/admin/dashboard/stats', async (req, res) => {
  try {
    const [students] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1");
    const [teachers] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1");
    const [admins] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin' AND is_active = 1");
    const [bySemester] = await pool.query("SELECT semester_id, COUNT(*) as count FROM users WHERE role = 'student' GROUP BY semester_id");
    
    res.json({
      totalStudents: students[0].count,
      totalTeachers: teachers[0].count,
      totalAdmins: admins[0].count,
      studentsBySemester: bySemester,
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
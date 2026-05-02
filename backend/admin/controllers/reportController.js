import pool from '../../db/connection.js';

// GET summary report
export const getSummaryReport = async (req, res) => {
  try {
    const [[students]] = await pool.query("SELECT COUNT(*) as total FROM users WHERE role='student'");
    const [[teachers]] = await pool.query("SELECT COUNT(*) as total FROM users WHERE role='teacher'");
    const [[courses]] = await pool.query("SELECT COUNT(*) as total FROM courses");
    const [[enrollments]] = await pool.query("SELECT COUNT(*) as total FROM enrollments");

    const [topCourses] = await pool.query(`
      SELECT c.course_name, COUNT(e.id) as enrolled
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.id
      ORDER BY enrolled DESC
      LIMIT 5
    `);

    const [topStudents] = await pool.query(`
      SELECT u.name, u.user_id, s.cgpa, s.department
      FROM students s
      JOIN users u ON s.user_id = u.user_id
      ORDER BY s.cgpa DESC
      LIMIT 5
    `);

    const [departmentStats] = await pool.query(`
      SELECT department, COUNT(*) as count
      FROM students
      WHERE department IS NOT NULL
      GROUP BY department
      ORDER BY count DESC
    `);

    res.json({
      students: students.total,
      teachers: teachers.total,
      courses: courses.total,
      enrollments: enrollments.total,
      topCourses,
      topStudents,
      departmentStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET enrollment report per course
export const getEnrollmentReport = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.course_code, c.course_name, c.department, c.semester,
             u.name as teacher_name,
             COUNT(e.id) as enrolled_count
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN users u ON c.teacher_user_id = u.user_id
      GROUP BY c.id
      ORDER BY enrolled_count DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET results report
export const getResultsReport = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.name, u.user_id, c.course_name, c.course_code,
             r.marks_obtained, r.total_marks, r.grade, r.exam_type
      FROM results r
      JOIN users u ON r.student_user_id = u.user_id
      JOIN courses c ON r.course_id = c.id
      ORDER BY r.published_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



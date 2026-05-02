import pool from '../../db/connection.js';

// GET all results with student and course details
export const getAllResults = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, r.student_user_id, r.course_id, r.grade, r.semester, r.status, 
             r.created_at, r.updated_at,
             u.name as student_name, u.email as student_email,
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
};

// GET results by student ID
export const getResultsByStudent = async (req, res) => {
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
};

// GET results by course ID
export const getResultsByCourse = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, r.student_user_id, r.grade, r.semester, r.status,
             u.name as student_name, u.email as student_email
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
};

// GET single result by ID
export const getResultById = async (req, res) => {
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
    
    if (!rows.length) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE new result
export const createResult = async (req, res) => {
  const { student_id, course_id, grade, semester } = req.body;
  
  if (!student_id || !course_id || !grade) {
    return res.status(400).json({ error: 'Student ID, Course ID, and Grade are required' });
  }
  
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    
    // Check if student exists
    const [student] = await conn.query(
      'SELECT user_id FROM users WHERE user_id = ? AND role = "student"',
      [student_id]
    );
    if (!student.length) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Check if course exists
    const [course] = await conn.query('SELECT id FROM courses WHERE id = ?', [course_id]);
    if (!course.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Check if result already exists
    const [existing] = await conn.query(`
      SELECT id FROM results 
      WHERE student_user_id = ? AND course_id = ? AND semester = ?
    `, [student_id, course_id, semester || '']);
    
    if (existing.length > 0) {
      // Update existing result
      await conn.query(`
        UPDATE results 
        SET grade = ?, updated_at = CURRENT_TIMESTAMP
        WHERE student_user_id = ? AND course_id = ? AND semester = ?
      `, [grade, student_id, course_id, semester || '']);
      
      await conn.commit();
      return res.json({ message: 'Result updated successfully' });
    }
    
    // Insert new result
    const [result] = await conn.query(`
      INSERT INTO results (student_user_id, course_id, grade, semester, status)
      VALUES (?, ?, ?, ?, 'published')
    `, [student_id, course_id, grade, semester || '']);
    
    await conn.commit();
    res.status(201).json({ 
      message: 'Result created successfully',
      id: result.insertId
    });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
};

// UPDATE result
export const updateResult = async (req, res) => {
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
};

// DELETE result
export const deleteResult = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM results WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }
    
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET student GPA and summary
export const getStudentSummary = async (req, res) => {
  try {
    // Get GPA calculation
    const [gpaResult] = await pool.query(`
      SELECT 
        ROUND(AVG(CASE 
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
        END), 2) as gpa,
        COUNT(*) as total_courses,
        SUM(CASE WHEN grade IN ('A+','A','A-','B+','B','B-','C+','C','C-') THEN 1 ELSE 0 END) as passed_courses,
        SUM(CASE WHEN grade IN ('F', 'D') THEN 1 ELSE 0 END) as failed_courses
      FROM results
      WHERE student_user_id = ? AND status = 'published'
    `, [req.params.studentId]);
    
    // Get grade distribution
    const [gradeDist] = await pool.query(`
      SELECT grade, COUNT(*) as count
      FROM results
      WHERE student_user_id = ? AND status = 'published'
      GROUP BY grade
      ORDER BY 
        FIELD(grade, 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F')
    `, [req.params.studentId]);
    
    // Get semester wise GPA
    const [semesterWise] = await pool.query(`
      SELECT 
        semester,
        ROUND(AVG(CASE 
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
        END), 2) as semester_gpa,
        COUNT(*) as courses_count
      FROM results
      WHERE student_user_id = ? AND status = 'published'
      GROUP BY semester
      ORDER BY semester DESC
    `, [req.params.studentId]);
    
    res.json({
      gpa: parseFloat(gpaResult[0].gpa || 0),
      total_courses: gpaResult[0].total_courses || 0,
      passed_courses: gpaResult[0].passed_courses || 0,
      failed_courses: gpaResult[0].failed_courses || 0,
      grade_distribution: gradeDist,
      semester_wise: semesterWise
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// BULK upload results
export const bulkUploadResults = async (req, res) => {
  const { results } = req.body;
  
  if (!results || !Array.isArray(results) || results.length === 0) {
    return res.status(400).json({ error: 'Results array is required' });
  }
  
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    
    let inserted = 0;
    let updated = 0;
    let errors = [];
    
    for (const item of results) {
      const { student_id, course_id, grade, semester } = item;
      
      if (!student_id || !course_id || !grade) {
        errors.push({ student_id, course_id, error: 'Missing required fields' });
        continue;
      }
      
      // Check if student exists
      const [student] = await conn.query(
        'SELECT user_id FROM users WHERE user_id = ? AND role = "student"',
        [student_id]
      );
      if (!student.length) {
        errors.push({ student_id, course_id, error: 'Student not found' });
        continue;
      }
      
      // Check if course exists
      const [course] = await conn.query('SELECT id FROM courses WHERE id = ?', [course_id]);
      if (!course.length) {
        errors.push({ student_id, course_id, error: 'Course not found' });
        continue;
      }
      
      // Check if result exists
      const [existing] = await conn.query(`
        SELECT id FROM results 
        WHERE student_user_id = ? AND course_id = ? AND semester = ?
      `, [student_id, course_id, semester || '']);
      
      if (existing.length > 0) {
        await conn.query(`
          UPDATE results 
          SET grade = ?, updated_at = CURRENT_TIMESTAMP
          WHERE student_user_id = ? AND course_id = ? AND semester = ?
        `, [grade, student_id, course_id, semester || '']);
        updated++;
      } else {
        await conn.query(`
          INSERT INTO results (student_user_id, course_id, grade, semester, status)
          VALUES (?, ?, ?, ?, 'published')
        `, [student_id, course_id, grade, semester || '']);
        inserted++;
      }
    }
    
    await conn.commit();
    res.json({ 
      message: 'Bulk upload completed',
      inserted,
      updated,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    conn.release();
  }
};

// GET course grade distribution
export const getCourseGradeDistribution = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT grade, COUNT(*) as count,
             ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM results WHERE course_id = ?)), 2) as percentage
      FROM results
      WHERE course_id = ? AND status = 'published'
      GROUP BY grade
      ORDER BY 
        FIELD(grade, 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F')
    `, [req.params.courseId, req.params.courseId]);
    
    const [totalStudents] = await pool.query(`
      SELECT COUNT(DISTINCT student_user_id) as total
      FROM results
      WHERE course_id = ? AND status = 'published'
    `, [req.params.courseId]);
    
    res.json({
      distribution: rows,
      total_students: totalStudents[0].total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET result statistics for dashboard
export const getResultStats = async (req, res) => {
  try {
    const [[total]] = await pool.query("SELECT COUNT(*) as count FROM results");
    
    const [[passed]] = await pool.query(`
      SELECT COUNT(*) as count FROM results 
      WHERE grade NOT IN ('F', 'D') AND status = 'published'
    `);
    
    const [[failed]] = await pool.query(`
      SELECT COUNT(*) as count FROM results 
      WHERE grade IN ('F', 'D') AND status = 'published'
    `);
    
    const [gradeDistribution] = await pool.query(`
      SELECT grade, COUNT(*) as count
      FROM results
      WHERE status = 'published'
      GROUP BY grade
      ORDER BY 
        FIELD(grade, 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F')
      LIMIT 10
    `);
    
    const [topPerformers] = await pool.query(`
      SELECT u.name, u.user_id, ROUND(AVG(CASE 
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
        END), 2) as gpa
      FROM results r
      JOIN users u ON r.student_user_id = u.user_id
      WHERE r.status = 'published'
      GROUP BY u.user_id, u.name
      HAVING gpa > 0
      ORDER BY gpa DESC
      LIMIT 5
    `);
    
    res.json({
      total: total.count,
      passed: passed.count,
      failed: failed.count,
      pass_rate: total.count > 0 ? ((passed.count / total.count) * 100).toFixed(2) : 0,
      grade_distribution: gradeDistribution,
      top_performers: topPerformers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUBLISH all pending results
export const publishResults = async (req, res) => {
  const { semester, course_id } = req.body;
  
  try {
    let query = 'UPDATE results SET status = "published" WHERE status = "pending"';
    let params = [];
    
    if (semester) {
      query += ' AND semester = ?';
      params.push(semester);
    }
    
    if (course_id) {
      query += ' AND course_id = ?';
      params.push(course_id);
    }
    
    const [result] = await pool.query(query, params);
    res.json({ 
      message: 'Results published successfully',
      updated_count: result.affectedRows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
-- SWEHub Database Schema
-- Run this in your MySQL client: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS swehub;
USE swehub;

-- =====================
-- USERS TABLE (shared)
-- =====================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(20) UNIQUE NOT NULL,        -- e.g. ST2023001, TC2023001, AD0001
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'teacher', 'student') NOT NULL,
  avatar_url VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- STUDENTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(20) UNIQUE NOT NULL,
  roll_number VARCHAR(20) UNIQUE,
  department VARCHAR(100),
  semester INT,
  batch_year YEAR,
  cgpa DECIMAL(4,2) DEFAULT 0.00,
  attendance_percent DECIMAL(5,2) DEFAULT 0.00,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================
-- TEACHERS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(20) UNIQUE NOT NULL,
  employee_id VARCHAR(20) UNIQUE,
  department VARCHAR(100),
  designation VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================
-- COURSES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20) UNIQUE NOT NULL,
  course_name VARCHAR(150) NOT NULL,
  department VARCHAR(100),
  credits INT DEFAULT 3,
  teacher_user_id VARCHAR(20),
  semester INT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- =====================
-- ENROLLMENTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_user_id VARCHAR(20) NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_enrollment (student_user_id, course_id),
  FOREIGN KEY (student_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =====================
-- RESULTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_user_id VARCHAR(20) NOT NULL,
  course_id INT NOT NULL,
  marks_obtained DECIMAL(5,2),
  total_marks DECIMAL(5,2) DEFAULT 100,
  grade VARCHAR(5),
  exam_type ENUM('midterm', 'final', 'assignment', 'quiz') DEFAULT 'final',
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =====================
-- STUDY MATERIALS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS study_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  file_url VARCHAR(255),
  material_type ENUM('pdf', 'video', 'link', 'doc') DEFAULT 'pdf',
  uploaded_by VARCHAR(20),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by) REFERENCES users(user_id) ON DELETE SET NULL
);

-- =====================
-- ATTENDANCE TABLE
-- =====================
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_user_id VARCHAR(20) NOT NULL,
  course_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late') DEFAULT 'present',
  FOREIGN KEY (student_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =====================
-- SEED: Default Admin
-- =====================
-- Password: admin123 (bcrypt hash - regenerate in production)
INSERT IGNORE INTO users (user_id, name, email, password_hash, role) VALUES
('AD0001', 'Super Admin', 'admin@swehub.com', '$2b$10$YourHashHere', 'admin');
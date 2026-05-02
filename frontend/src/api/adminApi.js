const BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// Auth
export const login = (email, password) =>
  fetch(`${BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then(r => r.json());

// Dashboard Stats
export const fetchStats = () =>
  fetch(`${BASE}/admin/users/stats`, { headers: headers() }).then(r => r.json());

// Users
export const fetchUsers = () =>
  fetch(`${BASE}/admin/users`, { headers: headers() }).then(r => r.json());

export const createUser = (data) =>
  fetch(`${BASE}/admin/users`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const updateUser = (userId, data) =>
  fetch(`${BASE}/admin/users/${userId}`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const deleteUser = (userId) =>
  fetch(`${BASE}/admin/users/${userId}`, { method: 'DELETE', headers: headers() }).then(r => r.json());

// Courses
export const fetchCourses = () =>
  fetch(`${BASE}/admin/courses`, { headers: headers() }).then(r => r.json());

export const createCourse = (data) =>
  fetch(`${BASE}/admin/courses`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const updateCourse = (id, data) =>
  fetch(`${BASE}/admin/courses/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const deleteCourse = (id) =>
  fetch(`${BASE}/admin/courses/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json());

// Students
export const fetchStudents = () =>
  fetch(`${BASE}/admin/students`, { headers: headers() }).then(r => r.json());

// Reports
export const fetchReportSummary = () =>
  fetch(`${BASE}/admin/reports/summary`, { headers: headers() }).then(r => r.json());
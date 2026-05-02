// // import React, { useState } from 'react';

// // const CourseCatalog = () => {
// //   // --- State Management ---
// //   const [sidebarActive, setSidebarActive] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [departmentFilter, setDepartmentFilter] = useState('All Departments');
// //   const [levelFilter, setLevelFilter] = useState('All Levels');
// //   const [statusFilter, setStatusFilter] = useState('All Status');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [courses, setCourses] = useState([
// //     { code: 'CS301', title: 'Software Engineering', credits: 3, instructor: 'Dr. Sarah Johnson', department: 'Computer Science', level: '300 Level', status: 'Active', description: 'Principles of software engineering, design patterns, agile methodologies, and software project management.' },
// //     { code: 'CS302', title: 'Database Systems', credits: 4, instructor: 'Prof. Robert Chen', department: 'Computer Science', level: '200 Level', status: 'Active', description: 'Database design, SQL, normalization, transaction processing, and NoSQL databases.' },
// //     { code: 'CS401', title: 'Computer Networks', credits: 3, instructor: 'Prof. James Wilson', department: 'Computer Science', level: '400 Level', status: 'Active', description: 'Network architectures, protocols, routing, switching, and network security fundamentals.' },
// //     { code: 'MATH201', title: 'Calculus II', credits: 3, instructor: 'Dr. Maria Garcia', department: 'Mathematics', level: '200 Level', status: 'Active', description: 'Integration techniques, applications of integration, sequences, and series.' },
// //     { code: 'CS501', title: 'Advanced Algorithms', credits: 3, instructor: 'Dr. Lisa Wang', department: 'Computer Science', level: '500 Level', status: 'Active', description: 'Advanced algorithm design techniques, complexity analysis, and optimization problems.' },
// //     { code: 'CS601', title: 'Cyber Security', credits: 4, instructor: 'Dr. Lisa Wang', department: 'Cyber Security', level: '600 Level', status: 'Active', description: 'Network security, cryptography, penetration testing, and security policy development.' }
// //   ]);
// //   const [showNotification, setShowNotification] = useState(false);
// //   const [notificationCount] = useState(4);

// //   // --- Helper Functions ---
// //   const getLevelFromCredits = (credits) => {
// //     if (credits === 3) return '300 Level';
// //     if (credits === 4) return '400 Level';
// //     return '200 Level';
// //   };

// //   const addCourse = () => {
// //     const newCode = `CS${Math.floor(Math.random() * 900) + 100}`;
// //     const newCourse = {
// //       code: newCode,
// //       title: 'New Course',
// //       credits: 3,
// //       instructor: 'TBA',
// //       department: departmentFilter !== 'All Departments' ? departmentFilter : 'Computer Science',
// //       level: getLevelFromCredits(3),
// //       status: 'Active',
// //       description: 'Course description goes here. Add detailed information about the course content, objectives, and requirements.'
// //     };
// //     setCourses([...courses, newCourse]);
// //     alert(`Add Course:\n\nCreate new course with:\n- Course details\n- Syllabus\n- Credit hours\n- Prerequisites\n- Instructor assignment\n- Schedule\n\nAdded: ${newCode}`);
// //   };

// //   const importCourses = () => {
// //     alert('Import Courses:\n\nBulk import via CSV/Excel\nTemplate download\nData validation\nDepartment assignment\nPrerequisite mapping');
// //   };

// //   const viewCourse = (code) => {
// //     const course = courses.find(c => c.code === code);
// //     alert(`View Course: ${code}\n\n${course?.title}\n${course?.description}\n\nCourse details\nSyllabus\nStudent roster\nAssignments\nGrades distribution\nInstructor information`);
// //   };

// //   const editCourse = (code) => {
// //     alert(`Edit Course: ${code}\n\nEdit course information\nUpdate syllabus\nModify schedule\nChange instructor\nUpdate prerequisites\nAdjust credit hours`);
// //   };

// //   const manageStudents = (code) => {
// //     alert(`Manage Students: ${code}\n\nView enrolled students\nAdd/remove students\nWaitlist management\nEnrollment capacity\nStudent performance`);
// //   };

// //   const clearFilters = () => {
// //     setDepartmentFilter('All Departments');
// //     setLevelFilter('All Levels');
// //     setStatusFilter('All Status');
// //     setSearchTerm('');
// //     setCurrentPage(1);
// //     alert('Clearing all filters...');
// //   };

// //   const toggleNotifications = () => {
// //     setShowNotification(!showNotification);
// //     alert('Notifications:\n1. 4 new course proposals\n2. Syllabus updates needed\n3. Course capacity alerts\n4. Prerequisite changes');
// //   };

// //   const handleLogout = () => {
// //     if (window.confirm('Are you sure you want to logout?')) {
// //       alert('Logging out...');
// //     }
// //   };

// //   // --- Filtering & Pagination Logic ---
// //   const filteredCourses = courses.filter(course => {
// //     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                           course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesDepartment = departmentFilter === 'All Departments' || course.department === departmentFilter;
// //     const matchesLevel = levelFilter === 'All Levels' || course.level === levelFilter;
// //     const matchesStatus = statusFilter === 'All Status' || course.status === statusFilter;
// //     return matchesSearch && matchesDepartment && matchesLevel && matchesStatus;
// //   });

// //   const coursesPerPage = 6;
// //   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
// //   const startIndex = (currentPage - 1) * coursesPerPage;
// //   const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);
// //   const totalCourses = courses.length;
// //   const activeThisSemester = courses.filter(c => c.status === 'Active').length;
// //   const newCourses = courses.filter(c => c.code.startsWith('CS6') || c.code.includes('501')).length;
// //   const departments = [...new Set(courses.map(c => c.department))].length;

// //   const goToPage = (page) => {
// //     if (page >= 1 && page <= totalPages) {
// //       setCurrentPage(page);
// //     }
// //   };

// //   // --- Styles ---
// //   const styles = {
// //     '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
// //     body: { fontFamily: "'Inter', sans-serif", background: 'var(--bg-dark)', color: 'var(--text-primary)', minHeight: '100vh', overflowX: 'hidden' },
// //     root: { '--primary-gradient': 'linear-gradient(135deg, #667eea, #764ba2)', '--secondary-gradient': 'linear-gradient(135deg, #764ba2, #f093fb)', '--success-gradient': 'linear-gradient(135deg, #10b981, #34d399)', '--warning-gradient': 'linear-gradient(135deg, #f59e0b, #fbbf24)', '--danger-gradient': 'linear-gradient(135deg, #ef4444, #f87171)', '--info-gradient': 'linear-gradient(135deg, #3b82f6, #60a5fa)', '--purple-gradient': 'linear-gradient(135deg, #8b5cf6, #a78bfa)', '--bg-dark': '#0f0f1e', '--bg-card': 'rgba(255, 255, 255, 0.05)', '--border-color': 'rgba(255, 255, 255, 0.1)', '--text-primary': 'rgba(255, 255, 255, 0.95)', '--text-secondary': 'rgba(255, 255, 255, 0.6)', '--success': '#10b981', '--warning': '#f59e0b', '--danger': '#ef4444', '--info': '#3b82f6', '--purple': '#8b5cf6' }
// //   };

// //   // --- Component ---
// //   return (
// //     <div style={{ ...styles.root, position: 'relative', minHeight: '100vh' }}>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
// //         @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
// //         * { margin: 0; padding: 0; box-sizing: border-box; }
// //         body { font-family: 'Inter', sans-serif; background: #0f0f1e; color: rgba(255, 255, 255, 0.95); min-height: 100vh; overflow-x: hidden; }
        
// //         @keyframes orbFloat {
// //           0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
// //           25% { transform: translate(5%,-5%) scale(1.2) rotate(90deg); }
// //           50% { transform: translate(-5%,5%) scale(0.9) rotate(180deg); }
// //           75% { transform: translate(3%,-3%) scale(1.1) rotate(270deg); }
// //         }
        
// //         @media (max-width: 992px) {
// //           .sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
// //           .sidebar.active { transform: translateX(0); }
// //           .main-content { margin-left: 0; padding: 80px 20px 20px; }
// //           .mobile-menu-toggle { display: flex; }
// //           .top-bar { flex-direction: column; align-items: flex-start; gap: 20px; }
// //           .top-bar-actions { width: 100%; justify-content: space-between; }
// //           .search-bar { width: 100%; }
// //         }
        
// //         @media (max-width: 768px) {
// //           .data-table { display: block; overflow-x: auto; }
// //           .course-grid { grid-template-columns: 1fr !important; }
// //         }
// //       `}</style>

// //       {/* Background Effects */}
// //       <div style={{ position: 'fixed', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%), linear-gradient(180deg, #0a0a15 0%, #0f0f1e 50%, #1a1a2e 100%)', zIndex: -2 }}></div>
// //       <div style={{ position: 'fixed', width: '100%', height: '100%', background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255, 255, 255, 0.01) 1px, transparent 2px, transparent 40px), repeating-linear-gradient(90deg, transparent 0px, rgba(255, 255, 255, 0.01) 1px, transparent 2px, transparent 40px)', opacity: 0.3, zIndex: -1 }}></div>
// //       <div style={{ position: 'fixed', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%)', top: '-30%', left: '-20%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', mixBlendMode: 'screen', zIndex: -1 }}></div>
// //       <div style={{ position: 'fixed', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)', bottom: '-20%', right: '-15%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', animationDelay: '-12s', mixBlendMode: 'screen', zIndex: -1 }}></div>

// //       {/* Mobile Menu Toggle */}
// //       <div 
// //         className="mobile-menu-toggle"
// //         onClick={() => setSidebarActive(!sidebarActive)}
// //         style={{ display: 'none', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '50px', height: '50px', borderRadius: '14px', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', cursor: 'pointer', position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}
// //       >
// //         <i className="fas fa-bars"></i>
// //       </div>

// //       <div style={{ display: 'flex', minHeight: '100vh' }}>
// //         {/* Sidebar */}
// //         <aside className={`sidebar ${sidebarActive ? 'active' : ''}`} style={{ width: '280px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255, 255, 255, 0.1)', padding: '30px 0', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100 }}>
// //           <div style={{ padding: '0 30px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '30px' }}>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
// //               <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)' }}>⚙️</div>
// //               <div><h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '4px', letterSpacing: '-0.5px' }}>SWE<span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hub</span></h2><p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Admin Dashboard</p></div>
// //             </div>
// //           </div>
// //           <nav style={{ flex: 1, padding: '0 20px' }}>
// //             {['Dashboard', 'User Management', 'Student Records', 'Faculty Management', 'Results & Grades', 'Course Catalog', 'Academic Calendar', 'System Settings', 'Security & Logs', 'Reports & Export'].map((item, idx) => (
// //               <a key={idx} href="#" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '16px 20px', color: item === 'Course Catalog' ? 'white' : 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', borderRadius: '14px', marginBottom: '8px', transition: 'all 0.3s ease', fontWeight: 500, background: item === 'Course Catalog' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent', boxShadow: item === 'Course Catalog' ? '0 6px 20px rgba(102, 126, 234, 0.3)' : 'none' }}>
// //                 <i className={`fas fa-${item === 'Dashboard' ? 'home' : item === 'User Management' ? 'users' : item === 'Student Records' ? 'graduation-cap' : item === 'Faculty Management' ? 'chalkboard-teacher' : item === 'Results & Grades' ? 'chart-bar' : item === 'Course Catalog' ? 'book' : item === 'Academic Calendar' ? 'calendar-alt' : item === 'System Settings' ? 'cogs' : item === 'Security & Logs' ? 'shield-alt' : 'file-export'}`} style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
// //                 <span>{item}</span>
// //               </a>
// //             ))}
// //           </nav>
// //           <div style={{ padding: '30px 30px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
// //               <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 600, color: 'white' }}>AD</div>
// //               <div><h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'white' }}>Admin Officer</h4><p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>System Administrator</p></div>
// //             </div>
// //             <button onClick={handleLogout} style={{ width: '100%', marginTop: '20px', padding: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
// //               <i className="fas fa-sign-out-alt"></i><span>Logout</span>
// //             </button>
// //           </div>
// //         </aside>

// //         {/* Main Content */}
// //         <main className="main-content" style={{ flex: 1, marginLeft: '280px', padding: '30px' }}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
// //             <div><h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Course Catalog</h1><p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>Manage courses, syllabi, and curriculum - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
// //               <div onClick={toggleNotifications} style={{ position: 'relative', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
// //                 <i className="fas fa-bell"></i>
// //                 <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '12px', fontWeight: 700, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notificationCount}</span>
// //               </div>
// //               <div style={{ position: 'relative', width: '300px' }}>
// //                 <i className="fas fa-search" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px' }}></i>
// //                 <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', color: 'white', fontSize: '15px', fontFamily: 'Inter, sans-serif' }} />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Stats Cards */}
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
// //             {[
// //               { number: totalCourses, label: 'Total Courses' },
// //               { number: activeThisSemester, label: 'Active This Semester' },
// //               { number: newCourses, label: 'New Courses' },
// //               { number: departments, label: 'Departments' }
// //             ].map((stat, idx) => (
// //               <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px' }}>
// //                 <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.number}</div>
// //                 <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>{stat.label}</div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Course Management Section */}
// //           <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', padding: '32px', marginBottom: '30px' }}>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
// //               <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Course Management</h2>
// //               <div style={{ display: 'flex', gap: '12px' }}>
// //                 <button onClick={addCourse} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fas fa-plus-circle"></i>Add Course</button>
// //                 <button onClick={importCourses} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fas fa-file-import"></i>Import Courses</button>
// //               </div>
// //             </div>

// //             {/* Filters */}
// //             <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
// //               <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={{ padding: '12px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '14px', fontFamily: 'Inter, sans-serif', minWidth: '150px' }}>
// //                 <option>All Departments</option><option>Computer Science</option><option>IT</option><option>Software Eng</option><option>Mathematics</option><option>Cyber Security</option>
// //               </select>
// //               <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} style={{ padding: '12px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '14px', fontFamily: 'Inter, sans-serif', minWidth: '150px' }}>
// //                 <option>All Levels</option><option>100 Level</option><option>200 Level</option><option>300 Level</option><option>400 Level</option><option>500 Level</option><option>600 Level</option>
// //               </select>
// //               <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '12px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '14px', fontFamily: 'Inter, sans-serif', minWidth: '150px' }}>
// //                 <option>All Status</option><option>Active</option><option>Inactive</option><option>Archived</option>
// //               </select>
// //               <button onClick={clearFilters} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fas fa-filter"></i>Clear Filters</button>
// //             </div>

// //             {/* Course Grid */}
// //             <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
// //               {paginatedCourses.map(course => (
// //                 <div key={course.code} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
// //                   <div style={{ fontSize: '14px', color: '#667eea', fontWeight: 600, marginBottom: '8px' }}>{course.code}</div>
// //                   <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'white' }}>{course.title}</div>
// //                   <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
// //                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}><i className="fas fa-clock"></i> {course.credits} Credits</div>
// //                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}><i className="fas fa-user"></i> {course.instructor}</div>
// //                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}><i className="fas fa-building"></i> {course.department}</div>
// //                   </div>
// //                   <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>{course.description}</div>
// //                   <div style={{ display: 'flex', gap: '8px' }}>
// //                     <button onClick={() => viewCourse(course.code)} style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }}><i className="fas fa-eye"></i></button>
// //                     <button onClick={() => editCourse(course.code)} style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }}><i className="fas fa-edit"></i></button>
// //                     <button onClick={() => manageStudents(course.code)} style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }}><i className="fas fa-users"></i></button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Pagination */}
// //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
// //               <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Showing {startIndex + 1}-{Math.min(startIndex + coursesPerPage, filteredCourses.length)} of {filteredCourses.length} courses</div>
// //               <div style={{ display: 'flex', gap: '8px' }}>
// //                 <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', opacity: currentPage === 1 ? 0.5 : 1 }}><i className="fas fa-chevron-left"></i>Prev</button>
// //                 {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
// //                   const pageNum = currentPage + i - (currentPage === 1 ? 0 : currentPage === totalPages ? -2 : -1);
// //                   if (pageNum < 1 || pageNum > totalPages) return null;
// //                   return (
// //                     <button key={pageNum} onClick={() => goToPage(pageNum)} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: currentPage === pageNum ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif' }}>{pageNum}</button>
// //                   );
// //                 })}
// //                 <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', opacity: (currentPage === totalPages || totalPages === 0) ? 0.5 : 1 }}>Next<i className="fas fa-chevron-right"></i></button>
// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseCatalog;

// import React, { useState, useEffect } from 'react';

// const CourseCatalog = () => {
//   // --- State Management ---
//   const [sidebarActive, setSidebarActive] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [departmentFilter, setDepartmentFilter] = useState('All Departments');
//   const [levelFilter, setLevelFilter] = useState('All Levels');
//   const [statusFilter, setStatusFilter] = useState('All Status');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showNotification, setShowNotification] = useState(false);
//   const [notificationCount] = useState(4);

//   // Get token from localStorage
//   const token = localStorage.getItem('token');

//   // --- Fetch courses from database ---
//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/admin/courses', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setCourses(data);
//       } else {
//         console.error('Failed to fetch courses');
//         // Fallback to sample data if API fails
//         setCourses([
//           { course_code: 'CS301', course_name: 'Software Engineering', credits: 3, department: 'Computer Science', status: 'Active', description: 'Principles of software engineering...' },
//           { course_code: 'CS302', course_name: 'Database Systems', credits: 4, department: 'Computer Science', status: 'Active', description: 'Database design, SQL...' }
//         ]);
//       }
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // --- Add Course to Database ---
//   const addCourse = async () => {
//     const newCourse = {
//       course_code: `CS${Math.floor(Math.random() * 900) + 100}`,
//       course_name: 'New Course',
//       credits: 3,
//       department: departmentFilter !== 'All Departments' ? departmentFilter : 'Computer Science',
//       description: 'Course description goes here. Add detailed information about the course content, objectives, and requirements.',
//       status: 'Active'
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/admin/courses', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newCourse)
//       });

//       if (response.ok) {
//         alert(`Course ${newCourse.course_code} added successfully!`);
//         fetchCourses(); // Refresh the list
//       } else {
//         const error = await response.json();
//         alert(`Failed to add course: ${error.error}`);
//       }
//     } catch (error) {
//       console.error('Error adding course:', error);
//       alert('Error adding course. Please try again.');
//     }
//   };

//   const importCourses = () => {
//     alert('Import Courses:\n\nBulk import via CSV/Excel\nTemplate download\nData validation\nDepartment assignment\nPrerequisite mapping');
//   };

//   const viewCourse = (course) => {
//     alert(`View Course: ${course.course_code}\n\n${course.course_name}\n${course.description}\n\nCredits: ${course.credits}\nDepartment: ${course.department}`);
//   };

//   const editCourse = async (course) => {
//     const newName = prompt('Enter new course name:', course.course_name);
//     if (newName) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/admin/courses/${course.id}`, {
//           method: 'PUT',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ ...course, course_name: newName })
//         });
        
//         if (response.ok) {
//           alert('Course updated successfully!');
//           fetchCourses();
//         } else {
//           alert('Failed to update course');
//         }
//       } catch (error) {
//         console.error('Error updating course:', error);
//       }
//     }
//   };

//   const manageStudents = (course) => {
//     alert(`Manage Students for ${course.course_code}\n\nView enrolled students\nAdd/remove students\nWaitlist management\nEnrollment capacity`);
//   };

//   const clearFilters = () => {
//     setDepartmentFilter('All Departments');
//     setLevelFilter('All Levels');
//     setStatusFilter('All Status');
//     setSearchTerm('');
//     setCurrentPage(1);
//   };

//   const toggleNotifications = () => {
//     setShowNotification(!showNotification);
//     alert('Notifications:\n1. 4 new course proposals\n2. Syllabus updates needed\n3. Course capacity alerts\n4. Prerequisite changes');
//   };

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('token');
//       alert('Logging out...');
//       window.location.href = '/login';
//     }
//   };

//   // --- Filtering & Pagination Logic ---
//   const filteredCourses = courses.filter(course => {
//     const matchesSearch = course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           course.course_code?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment = departmentFilter === 'All Departments' || course.department === departmentFilter;
//     return matchesSearch && matchesDepartment;
//   });

//   const coursesPerPage = 6;
//   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
//   const startIndex = (currentPage - 1) * coursesPerPage;
//   const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);
//   const totalCourses = courses.length;
//   const activeThisSemester = courses.filter(c => c.status === 'Active').length;
//   const newCourses = courses.filter(c => c.course_code?.startsWith('CS6')).length;
//   const departments = [...new Set(courses.map(c => c.department))].length;

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // --- Styles (same as before) ---
//   const styles = {
//     '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
//     body: { fontFamily: "'Inter', sans-serif", background: 'var(--bg-dark)', color: 'var(--text-primary)', minHeight: '100vh', overflowX: 'hidden' },
//     root: { '--primary-gradient': 'linear-gradient(135deg, #667eea, #764ba2)', '--secondary-gradient': 'linear-gradient(135deg, #764ba2, #f093fb)', '--success-gradient': 'linear-gradient(135deg, #10b981, #34d399)', '--warning-gradient': 'linear-gradient(135deg, #f59e0b, #fbbf24)', '--danger-gradient': 'linear-gradient(135deg, #ef4444, #f87171)', '--info-gradient': 'linear-gradient(135deg, #3b82f6, #60a5fa)', '--purple-gradient': 'linear-gradient(135deg, #8b5cf6, #a78bfa)', '--bg-dark': '#0f0f1e', '--bg-card': 'rgba(255, 255, 255, 0.05)', '--border-color': 'rgba(255, 255, 255, 0.1)', '--text-primary': 'rgba(255, 255, 255, 0.95)', '--text-secondary': 'rgba(255, 255, 255, 0.6)', '--success': '#10b981', '--warning': '#f59e0b', '--danger': '#ef4444', '--info': '#3b82f6', '--purple': '#8b5cf6' }
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <div style={{ color: 'white' }}>Loading courses...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ ...styles.root, position: 'relative', minHeight: '100vh' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
//         @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { font-family: 'Inter', sans-serif; background: #0f0f1e; color: rgba(255, 255, 255, 0.95); min-height: 100vh; overflow-x: hidden; }
        
//         @keyframes orbFloat {
//           0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
//           25% { transform: translate(5%,-5%) scale(1.2) rotate(90deg); }
//           50% { transform: translate(-5%,5%) scale(0.9) rotate(180deg); }
//           75% { transform: translate(3%,-3%) scale(1.1) rotate(270deg); }
//         }
        
//         @media (max-width: 992px) {
//           .sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
//           .sidebar.active { transform: translateX(0); }
//           .main-content { margin-left: 0; padding: 80px 20px 20px; }
//           .mobile-menu-toggle { display: flex; }
//           .top-bar { flex-direction: column; align-items: flex-start; gap: 20px; }
//           .top-bar-actions { width: 100%; justify-content: space-between; }
//           .search-bar { width: 100%; }
//         }
        
//         @media (max-width: 768px) {
//           .data-table { display: block; overflow-x: auto; }
//           .course-grid { grid-template-columns: 1fr !important; }
//         }
//       `}</style>

//       {/* Background Effects - same as before */}
//       <div style={{ position: 'fixed', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%), linear-gradient(180deg, #0a0a15 0%, #0f0f1e 50%, #1a1a2e 100%)', zIndex: -2 }}></div>
//       <div style={{ position: 'fixed', width: '100%', height: '100%', background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255, 255, 255, 0.01) 1px, transparent 2px, transparent 40px), repeating-linear-gradient(90deg, transparent 0px, rgba(255, 255, 255, 0.01) 1px, transparent 2px, transparent 40px)', opacity: 0.3, zIndex: -1 }}></div>
//       <div style={{ position: 'fixed', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%)', top: '-30%', left: '-20%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', mixBlendMode: 'screen', zIndex: -1 }}></div>
//       <div style={{ position: 'fixed', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)', bottom: '-20%', right: '-15%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', animationDelay: '-12s', mixBlendMode: 'screen', zIndex: -1 }}></div>

//       {/* Mobile Menu Toggle */}
//       <div 
//         className="mobile-menu-toggle"
//         onClick={() => setSidebarActive(!sidebarActive)}
//         style={{ display: 'none', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '50px', height: '50px', borderRadius: '14px', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', cursor: 'pointer', position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}
//       >
//         <i className="fas fa-bars"></i>
//       </div>

//       <div style={{ display: 'flex', minHeight: '100vh' }}>
//         {/* Sidebar - same as before */}
//         <aside className={`sidebar ${sidebarActive ? 'active' : ''}`} style={{ width: '280px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255, 255, 255, 0.1)', padding: '30px 0', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100 }}>
//           <div style={{ padding: '0 30px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '30px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//               <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)' }}>⚙️</div>
//               <div><h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '4px', letterSpacing: '-0.5px' }}>SWE<span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hub</span></h2><p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Admin Dashboard</p></div>
//             </div>
//           </div>
//           <nav style={{ flex: 1, padding: '0 20px' }}>
//             {['Dashboard', 'User Management', 'Student Records', 'Faculty Management', 'Results & Grades', 'Course Catalog', 'Academic Calendar', 'System Settings', 'Security & Logs', 'Reports & Export'].map((item, idx) => (
//               <a key={idx} href="#" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '16px 20px', color: item === 'Course Catalog' ? 'white' : 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', borderRadius: '14px', marginBottom: '8px', transition: 'all 0.3s ease', fontWeight: 500, background: item === 'Course Catalog' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent', boxShadow: item === 'Course Catalog' ? '0 6px 20px rgba(102, 126, 234, 0.3)' : 'none' }}>
//                 <i className={`fas fa-${item === 'Dashboard' ? 'home' : item === 'User Management' ? 'users' : item === 'Student Records' ? 'graduation-cap' : item === 'Faculty Management' ? 'chalkboard-teacher' : item === 'Results & Grades' ? 'chart-bar' : item === 'Course Catalog' ? 'book' : item === 'Academic Calendar' ? 'calendar-alt' : item === 'System Settings' ? 'cogs' : item === 'Security & Logs' ? 'shield-alt' : 'file-export'}`} style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
//                 <span>{item}</span>
//               </a>
//             ))}
//           </nav>
//           <div style={{ padding: '30px 30px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
//               <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 600, color: 'white' }}>AD</div>
//               <div><h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'white' }}>Admin Officer</h4><p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>System Administrator</p></div>
//             </div>
//             <button onClick={handleLogout} style={{ width: '100%', marginTop: '20px', padding: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
//               <i className="fas fa-sign-out-alt"></i><span>Logout</span>
//             </button>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="main-content" style={{ flex: 1, marginLeft: '280px', padding: '30px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
//             <div><h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Course Catalog</h1><p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>Manage courses, syllabi, and curriculum - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//               <div onClick={toggleNotifications} style={{ position: 'relative', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
//                 <i className="fas fa-bell"></i>
//                 <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '12px', fontWeight: 700, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notificationCount}</span>
//               </div>
//               <div style={{ position: 'relative', width: '300px' }}>
//                 <i className="fas fa-search" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px' }}></i>
//                 <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', color: 'white', fontSize: '15px', fontFamily: 'Inter, sans-serif' }} />
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
//             {[
//               { number: totalCourses, label: 'Total Courses' },
//               { number: activeThisSemester, label: 'Active This Semester' },
//               { number: newCourses, label: 'New Courses' },
//               { number: departments, label: 'Departments' }
//             ].map((stat, idx) => (
//               <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px' }}>
//                 <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.number}</div>
//                 <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>{stat.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Course Management Section */}
//           <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', padding: '32px', marginBottom: '30px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
//               <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Course Management</h2>
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <button onClick={addCourse} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fas fa-plus-circle"></i>Add Course</button>
//                 <button onClick={importCourses} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fas fa-file-import"></i>Import Courses</button>
//               </div>
//             </div>

//             {/* Filters */}
//             <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
//               <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={{ padding: '12px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '14px', fontFamily: 'Inter, sans-serif', minWidth: '150px' }}>
//                 <option>All Departments</option><option>Computer Science</option><option>IT</option><option>Software Eng</option><option>Mathematics</option><option>Cyber Security</option>
//               </select>
//               <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} style={{ padding: '12px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '14px', fontFamily: 'Inter, sans-serif', minWidth: '150px' }}>
//                 <option>All Levels</option><option>100 Level</option><option>200 Level</option><option>300 Level</option><option>400 Level</option><option>500 Level</option><option>600 Level</option>
//               </select>
//               <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '12px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '14px', fontFamily: 'Inter, sans-serif', minWidth: '150px' }}>
//                 <option>All Status</option><option>Active</option><option>Inactive</option><option>Archived</option>
//               </select>
//               <button onClick={clearFilters} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fas fa-filter"></i>Clear Filters</button>
//             </div>

//             {/* Course Grid */}
//             <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
//               {paginatedCourses.map(course => (
//                 <div key={course.id || course.course_code} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
//                   <div style={{ fontSize: '14px', color: '#667eea', fontWeight: 600, marginBottom: '8px' }}>{course.course_code}</div>
//                   <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'white' }}>{course.course_name}</div>
//                   <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}><i className="fas fa-clock"></i> {course.credits} Credits</div>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}><i className="fas fa-building"></i> {course.department}</div>
//                   </div>
//                   <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>{course.description || 'No description available'}</div>
//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     <button onClick={() => viewCourse(course)} style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }}><i className="fas fa-eye"></i></button>
//                     <button onClick={() => editCourse(course)} style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }}><i className="fas fa-edit"></i></button>
//                     <button onClick={() => manageStudents(course)} style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }}><i className="fas fa-users"></i></button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
//               <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Showing {startIndex + 1}-{Math.min(startIndex + coursesPerPage, filteredCourses.length)} of {filteredCourses.length} courses</div>
//               <div style={{ display: 'flex', gap: '8px' }}>
//                 <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', opacity: currentPage === 1 ? 0.5 : 1 }}><i className="fas fa-chevron-left"></i>Prev</button>
//                 {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
//                   const pageNum = currentPage + i - (currentPage === 1 ? 0 : currentPage === totalPages ? -2 : -1);
//                   if (pageNum < 1 || pageNum > totalPages) return null;
//                   return (
//                     <button key={pageNum} onClick={() => goToPage(pageNum)} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: currentPage === pageNum ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif' }}>{pageNum}</button>
//                   );
//                 })}
//                 <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', opacity: (currentPage === totalPages || totalPages === 0) ? 0.5 : 1 }}>Next<i className="fas fa-chevron-right"></i></button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CourseCatalog;

import React, { useState, useEffect } from 'react';

const CourseCatalog = () => {
  // --- State Management ---
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount] = useState(4);

  // --- Fetch courses from database ---
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/courses');
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // --- Add Course to Database ---
  const addCourse = async () => {
    const courseCode = prompt('Enter Course Code (e.g., CS999):', `CS${Math.floor(Math.random() * 900) + 100}`);
    if (!courseCode) return;
    
    const courseName = prompt('Enter Course Name:', 'New Course');
    if (!courseName) return;
    
    const credits = parseInt(prompt('Enter Credits (3 or 4):', '3'));
    const department = prompt('Enter Department:', departmentFilter !== 'All Departments' ? departmentFilter : 'Computer Science');
    const description = prompt('Enter Description:', 'Course description goes here.');

    const newCourse = {
      course_code: courseCode,
      course_name: courseName,
      credits: credits || 3,
      department: department,
      description: description,
      semester: 'Spring 2025'
    };

    try {
      const response = await fetch('http://localhost:5000/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
      });

      if (response.ok) {
        alert(`Course ${courseCode} added successfully!`);
        fetchCourses();
      } else {
        const error = await response.json();
        alert(`Failed to add course: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course. Please try again.');
    }
  };

  const importCourses = () => {
    alert('Import Courses:\n\nBulk import via CSV/Excel\nTemplate download\nData validation\nDepartment assignment\nPrerequisite mapping');
  };

  const viewCourse = (course) => {
    alert(`📖 Course Details\n\nCode: ${course.course_code}\nName: ${course.course_name}\nCredits: ${course.credits}\nDepartment: ${course.department}\nDescription: ${course.description || 'No description'}`);
  };

  const editCourse = async (course) => {
    const newName = prompt('Enter new course name:', course.course_name);
    if (newName && newName !== course.course_name) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/courses/${course.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            course_name: newName, 
            credits: course.credits, 
            department: course.department, 
            description: course.description 
          })
        });
        
        if (response.ok) {
          alert('Course updated successfully!');
          fetchCourses();
        } else {
          alert('Failed to update course');
        }
      } catch (error) {
        console.error('Error updating course:', error);
      }
    }
  };

  const deleteCourse = async (course) => {
    if (window.confirm(`Are you sure you want to delete ${course.course_code} - ${course.course_name}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/courses/${course.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          alert('Course deleted successfully!');
          fetchCourses();
        } else {
          alert('Failed to delete course');
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const manageStudents = (course) => {
    alert(`Manage Students for ${course.course_code}\n\nView enrolled students\nAdd/remove students\nWaitlist management\nEnrollment capacity`);
  };

  const clearFilters = () => {
    setDepartmentFilter('All Departments');
    setLevelFilter('All Levels');
    setStatusFilter('All Status');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const toggleNotifications = () => {
    alert('Notifications:\n1. 4 new course proposals\n2. Syllabus updates needed\n3. Course capacity alerts\n4. Prerequisite changes');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      alert('Logging out...');
      window.location.href = '/login';
    }
  };

  // --- Filtering & Pagination Logic ---
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.course_code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All Departments' || course.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);
  const totalCourses = courses.length;
  const activeThisSemester = courses.filter(c => c.status !== 'Inactive').length;
  const newCourses = courses.filter(c => c.course_code?.startsWith('CS6')).length;
  const departments = [...new Set(courses.map(c => c.department).filter(Boolean))].length;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- Styles ---
  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif"
    },
    sidebar: {
      width: '280px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '30px 0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      zIndex: 100,
      transition: 'transform 0.3s ease',
      transform: sidebarActive ? 'translateX(0)' : 'translateX(-100%)'
    },
    mainContent: {
      flex: 1,
      marginLeft: '280px',
      padding: '30px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px'
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: 800,
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    statLabel: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px'
    },
    systemOverview: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '30px'
    },
    btnPrimary: {
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    btnSecondary: {
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    filterSelect: {
      padding: '12px 20px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      color: 'white',
      fontSize: '14px',
      minWidth: '150px'
    },
    courseCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.3s'
    },
    actionBtn: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.6)',
      cursor: 'pointer'
    },
    pageButton: {
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    activePageButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '16px 20px',
      color: 'rgba(255, 255, 255, 0.6)',
      textDecoration: 'none',
      borderRadius: '14px',
      marginBottom: '8px',
      transition: 'all 0.3s ease',
      fontWeight: 500,
      cursor: 'pointer'
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f0f1e' }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading courses...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes orbFloat {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          25% { transform: translate(5%,-5%) scale(1.2) rotate(90deg); }
          50% { transform: translate(-5%,5%) scale(0.9) rotate(180deg); }
          75% { transform: translate(3%,-3%) scale(1.1) rotate(270deg); }
        }
        
        @media (max-width: 992px) {
          .main-content { margin-left: 0 !important; padding: 80px 20px 20px !important; }
          .mobile-menu-toggle { display: flex !important; }
        }
        
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .course-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Background Effects */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%), linear-gradient(180deg, #0a0a15 0%, #0f0f1e 50%, #1a1a2e 100%)', zIndex: -2 }}></div>
      <div style={{ position: 'fixed', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%)', top: '-30%', left: '-20%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', zIndex: -1 }}></div>
      <div style={{ position: 'fixed', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)', bottom: '-20%', right: '-15%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', animationDelay: '-12s', zIndex: -1 }}></div>

      {/* Mobile Menu Toggle */}
      <div 
        className="mobile-menu-toggle"
        onClick={() => setSidebarActive(!sidebarActive)}
        style={{ display: 'none', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '50px', height: '50px', borderRadius: '14px', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', cursor: 'pointer', position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}
      >
        <i className="fas fa-bars"></i>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside className="sidebar" style={styles.sidebar}>
          <div style={{ padding: '0 30px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)' }}>⚙️</div>
              <div><h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>SWE<span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hub</span></h2><p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>Admin Dashboard</p></div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: '0 20px' }}>
            {['Dashboard', 'User Management', 'Student Records', 'Faculty Management', 'Results & Grades', 'Course Catalog', 'Academic Calendar', 'System Settings', 'Security & Logs', 'Reports & Export'].map((item, idx) => (
              <div key={idx} style={{ ...styles.navItem, background: item === 'Course Catalog' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent', color: item === 'Course Catalog' ? 'white' : 'rgba(255, 255, 255, 0.6)', boxShadow: item === 'Course Catalog' ? '0 6px 20px rgba(102, 126, 234, 0.3)' : 'none' }} onClick={() => alert(`Navigate to ${item}`)}>
                <i className={`fas fa-${item === 'Dashboard' ? 'home' : item === 'User Management' ? 'users' : item === 'Student Records' ? 'graduation-cap' : item === 'Faculty Management' ? 'chalkboard-teacher' : item === 'Results & Grades' ? 'chart-bar' : item === 'Course Catalog' ? 'book' : item === 'Academic Calendar' ? 'calendar-alt' : item === 'System Settings' ? 'cogs' : item === 'Security & Logs' ? 'shield-alt' : 'file-export'}`} style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
                <span>{item}</span>
              </div>
            ))}
          </nav>
          <div style={{ padding: '30px 30px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 600, color: 'white' }}>AD</div>
              <div><h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'white' }}>Admin Officer</h4><p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>System Administrator</p></div>
            </div>
            <button onClick={handleLogout} style={{ width: '100%', marginTop: '20px', padding: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <i className="fas fa-sign-out-alt"></i><span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content" style={styles.mainContent}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div><h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Course Catalog</h1><p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>Manage courses, syllabi, and curriculum - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div onClick={toggleNotifications} style={{ position: 'relative', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
                <i className="fas fa-bell"></i>
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '12px', fontWeight: 700, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notificationCount}</span>
              </div>
              <div style={{ position: 'relative', width: '300px' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)' }}></i>
                <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', color: 'white', fontSize: '15px' }} />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
            {[
              { number: totalCourses, label: 'Total Courses' },
              { number: activeThisSemester, label: 'Active This Semester' },
              { number: newCourses, label: 'New Courses' },
              { number: departments, label: 'Departments' }
            ].map((stat, idx) => (
              <div key={idx} style={styles.statCard}>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Course Management Section */}
          <div style={styles.systemOverview}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Course Management</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={addCourse} style={styles.btnPrimary}><i className="fas fa-plus-circle"></i>Add Course</button>
                <button onClick={importCourses} style={styles.btnSecondary}><i className="fas fa-file-import"></i>Import Courses</button>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={styles.filterSelect}>
                <option>All Departments</option><option>Computer Science</option><option>IT</option><option>Software Eng</option><option>Mathematics</option><option>Cyber Security</option>
              </select>
              <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} style={styles.filterSelect}>
                <option>All Levels</option><option>100 Level</option><option>200 Level</option><option>300 Level</option><option>400 Level</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.filterSelect}>
                <option>All Status</option><option>Active</option><option>Inactive</option><option>Archived</option>
              </select>
              <button onClick={clearFilters} style={styles.btnSecondary}><i className="fas fa-filter"></i>Clear Filters</button>
            </div>

            {/* Course Grid */}
            <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
              {paginatedCourses.map(course => (
                <div key={course.id || course.course_code} style={styles.courseCard} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '14px', color: '#667eea', fontWeight: 600, marginBottom: '8px' }}>{course.course_code}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'white' }}>{course.course_name}</div>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}><i className="fas fa-clock"></i> {course.credits} Credits</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}><i className="fas fa-building"></i> {course.department}</div>
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>{course.description || 'No description available'}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => viewCourse(course)} style={styles.actionBtn}><i className="fas fa-eye"></i></button>
                    <button onClick={() => editCourse(course)} style={styles.actionBtn}><i className="fas fa-edit"></i></button>
                    <button onClick={() => deleteCourse(course)} style={{ ...styles.actionBtn, color: '#ef4444' }}><i className="fas fa-trash"></i></button>
                    <button onClick={() => manageStudents(course)} style={styles.actionBtn}><i className="fas fa-users"></i></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Showing {startIndex + 1}-{Math.min(startIndex + coursesPerPage, filteredCourses.length)} of {filteredCourses.length} courses</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{ ...styles.pageButton, opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}><i className="fas fa-chevron-left"></i>Prev</button>
                  {[1, 2, 3].filter(p => p <= totalPages).map(pageNum => (
                    <button key={pageNum} onClick={() => goToPage(pageNum)} style={{ ...styles.pageButton, ...(currentPage === pageNum ? styles.activePageButton : {}) }}>{pageNum}</button>
                  ))}
                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ ...styles.pageButton, opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>Next<i className="fas fa-chevron-right"></i></button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseCatalog;
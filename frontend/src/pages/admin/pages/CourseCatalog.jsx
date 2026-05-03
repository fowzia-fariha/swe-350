import React, { useState, useEffect } from 'react';

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from database
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
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

  // Add Course
  const addCourse = async () => {
    const courseCode = prompt('Enter Course Code (e.g., CS999):', `CS${Math.floor(Math.random() * 900) + 100}`);
    if (!courseCode) return;
    
    const courseName = prompt('Enter Course Name:', 'New Course');
    if (!courseName) return;
    
    const credits = parseInt(prompt('Enter Credits (3 or 4):', '3'));
    const department = prompt('Enter Department:', departmentFilter !== 'All Departments' ? departmentFilter : 'Computer Science');
    const description = prompt('Enter Description:', 'Course description goes here.');

    try {
      const response = await fetch('http://localhost:5000/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_code: courseCode, course_name: courseName, credits, department, description })
      });

      if (response.ok) {
        alert(`Course ${courseCode} added successfully!`);
        fetchCourses();
      } else {
        alert('Failed to add course');
      }
    } catch (error) {
      alert('Error adding course');
    }
  };

  const importCourses = () => {
    alert('Import Courses:\n\nBulk import via CSV/Excel');
  };

  const viewCourse = (course) => {
    alert(`Course Details\n\nCode: ${course.course_code}\nName: ${course.course_name}\nCredits: ${course.credits}\nDepartment: ${course.department}\nDescription: ${course.description || 'No description'}`);
  };

  const editCourse = async (course) => {
    const newName = prompt('Enter new course name:', course.course_name);
    if (newName && newName !== course.course_name) {
      try {
        await fetch(`http://localhost:5000/api/admin/courses/${course.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ course_name: newName, credits: course.credits, department: course.department, description: course.description })
        });
        alert('Course updated successfully!');
        fetchCourses();
      } catch (error) {
        alert('Failed to update course');
      }
    }
  };

  const deleteCourse = async (course) => {
    if (window.confirm(`Delete ${course.course_code}?`)) {
      try {
        await fetch(`http://localhost:5000/api/admin/courses/${course.id}`, { method: 'DELETE' });
        alert('Course deleted successfully!');
        fetchCourses();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  const manageStudents = (course) => {
    alert(`Manage Students for ${course.course_code}`);
  };

  const clearFilters = () => {
    setDepartmentFilter('All Departments');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Filtering & Pagination
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
  const activeCourses = courses.filter(c => c.is_active === 1).length;
  const departments = [...new Set(courses.map(c => c.department).filter(Boolean))].length;

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0a0a15',
      fontFamily: "'Inter', sans-serif",
      color: 'white'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '4px'
    },
    pageSubtitle: {
      color: '#94a3b8',
      fontSize: '14px'
    },
    headerButtons: {
      display: 'flex',
      gap: '12px'
    },
    addButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '10px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    importButton: {
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '10px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      background: '#1a1a2e',
      borderRadius: '16px',
      padding: '20px',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#667eea'
    },
    statLabel: {
      fontSize: '13px',
      color: '#94a3b8',
      marginTop: '4px'
    },
    filters: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    searchWrapper: {
      position: 'relative'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#667eea',
      fontSize: '12px'
    },
    searchInput: {
      padding: '10px 12px 10px 32px',
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '10px',
      color: 'white',
      width: '250px',
      outline: 'none'
    },
    selectInput: {
      padding: '10px 16px',
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '10px',
      color: 'white',
      cursor: 'pointer'
    },
    clearButton: {
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '10px',
      cursor: 'pointer'
    },
    sectionContainer: {
      background: '#1a1a2e',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: 'white'
    },
    courseGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    courseCard: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '20px',
      transition: 'all 0.3s'
    },
    courseCode: {
      fontSize: '13px',
      color: '#667eea',
      fontWeight: 600,
      marginBottom: '8px'
    },
    courseName: {
      fontSize: '16px',
      fontWeight: 600,
      color: 'white',
      marginBottom: '12px'
    },
    courseMeta: {
      display: 'flex',
      gap: '15px',
      marginBottom: '12px'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#94a3b8',
      fontSize: '12px'
    },
    courseDescription: {
      color: '#94a3b8',
      fontSize: '13px',
      lineHeight: 1.4,
      marginBottom: '16px'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    actionBtn: {
      width: '34px',
      height: '34px',
      borderRadius: '8px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#94a3b8',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    actionBtnDelete: {
      width: '34px',
      height: '34px',
      borderRadius: '8px',
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.2)',
      color: '#ef4444',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    paginationText: {
      color: '#94a3b8',
      fontSize: '13px'
    },
    paginationButtons: {
      display: 'flex',
      gap: '8px'
    },
    pageButton: {
      padding: '8px 16px',
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '8px',
      color: '#94a3b8',
      cursor: 'pointer'
    },
    pageButtonDisabled: {
      padding: '8px 16px',
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '8px',
      color: '#94a3b8',
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    activePageButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ color: '#94a3b8' }}>Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Course Catalog</h1>
          <p style={styles.pageSubtitle}>Manage courses, syllabi, and curriculum</p>
        </div>
        <div style={styles.headerButtons}>
          <button onClick={importCourses} style={styles.importButton}>
            <i className="fas fa-file-import"></i> Import
          </button>
          <button onClick={addCourse} style={styles.addButton}>
            <i className="fas fa-plus"></i> Add Course
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalCourses}</div>
          <div style={styles.statLabel}>Total Courses</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{activeCourses}</div>
          <div style={styles.statLabel}>Active Courses</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{departments}</div>
          <div style={styles.statLabel}>Departments</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{courses.filter(c => c.credits === 3).length}</div>
          <div style={styles.statLabel}>3 Credit Courses</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
        </div>
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={styles.selectInput}>
          <option>All Departments</option>
          <option>Computer Science</option>
          <option>Information Technology</option>
          <option>Software Engineering</option>
          <option>Mathematics</option>
          <option>Cyber Security</option>
        </select>
        <button onClick={clearFilters} style={styles.clearButton}>
          <i className="fas fa-filter"></i> Clear Filters
        </button>
      </div>

      {/* Course Grid */}
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Course Management</h2>
        </div>

        <div style={styles.courseGrid}>
          {paginatedCourses.map((course) => (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.courseCode}>{course.course_code}</div>
              <div style={styles.courseName}>{course.course_name}</div>
              <div style={styles.courseMeta}>
                <div style={styles.metaItem}><i className="fas fa-clock"></i> {course.credits} Credits</div>
                <div style={styles.metaItem}><i className="fas fa-building"></i> {course.department}</div>
              </div>
              <div style={styles.courseDescription}>{course.description || 'No description available'}</div>
              <div style={styles.actionButtons}>
                <button style={styles.actionBtn} onClick={() => viewCourse(course)}><i className="fas fa-eye"></i></button>
                <button style={styles.actionBtn} onClick={() => editCourse(course)}><i className="fas fa-edit"></i></button>
                <button style={styles.actionBtnDelete} onClick={() => deleteCourse(course)}><i className="fas fa-trash"></i></button>
                <button style={styles.actionBtn} onClick={() => manageStudents(course)}><i className="fas fa-users"></i></button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <div style={styles.paginationText}>
              Showing {startIndex + 1} - {Math.min(startIndex + coursesPerPage, filteredCourses.length)} of {filteredCourses.length} courses
            </div>
            <div style={styles.paginationButtons}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
                disabled={currentPage === 1}
                style={currentPage === 1 ? styles.pageButtonDisabled : styles.pageButton}
              >
                Previous
              </button>
              {[1, 2, 3].filter(p => p <= totalPages).map(pageNum => (
                <button 
                  key={pageNum} 
                  onClick={() => setCurrentPage(pageNum)} 
                  style={currentPage === pageNum ? styles.activePageButton : styles.pageButton}
                >
                  {pageNum}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} 
                disabled={currentPage === totalPages}
                style={currentPage === totalPages ? styles.pageButtonDisabled : styles.pageButton}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
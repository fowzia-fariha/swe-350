import React, { useState, useEffect } from 'react';

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [semesterFilter, setSemesterFilter] = useState('All Semesters');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch course overview from database
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/course-overview');
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
    const courseCode = prompt('Enter Course Code (e.g., CSE-101):', '');
    if (!courseCode) return;
    
    const courseName = prompt('Enter Course Name:', '');
    if (!courseName) return;
    
    const credits = parseInt(prompt('Enter Credits (3 or 4):', '3'));
    const department = prompt('Enter Department:', 'Computer Science');
    const semester = prompt('Enter Semester (e.g., 1st Semester, 2nd Semester):', '1st Semester');
    const prerequisites = prompt('Enter Prerequisites (comma separated):', 'None');
    const description = prompt('Enter Description:', '');

    try {
      const response = await fetch('http://localhost:5000/api/admin/course-overview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          course_code: courseCode, 
          course_name: courseName, 
          credits, 
          department, 
          semester,
          prerequisites,
          description 
        })
      });

      if (response.ok) {
        alert(`Course ${courseCode} added successfully!`);
        fetchCourses();
      } else {
        const error = await response.json();
        alert(`Failed to add course: ${error.error}`);
      }
    } catch (error) {
      alert('Error adding course');
    }
  };

  const importCourses = () => {
    alert('Import Courses:\n\nBulk import via CSV/Excel');
  };

  const viewCourse = (course) => {
    alert(`📖 Course Details\n\n` +
          `Code: ${course.course_code}\n` +
          `Name: ${course.course_name}\n` +
          `Credits: ${course.credits}\n` +
          `Department: ${course.department}\n` +
          `Semester: ${course.semester}\n` +
          `Prerequisites: ${course.prerequisites || 'None'}\n` +
          `Description: ${course.description || 'No description'}`);
  };

  const editCourse = async (course) => {
    const newName = prompt('Enter new course name:', course.course_name);
    if (newName && newName !== course.course_name) {
      try {
        await fetch(`http://localhost:5000/api/admin/course-overview/${course.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ...course,
            course_name: newName 
          })
        });
        alert('Course updated successfully!');
        fetchCourses();
      } catch (error) {
        alert('Failed to update course');
      }
    }
  };

  const deleteCourse = async (course) => {
    if (window.confirm(`Delete ${course.course_code} - ${course.course_name}?`)) {
      try {
        await fetch(`http://localhost:5000/api/admin/course-overview/${course.id}`, { method: 'DELETE' });
        alert('Course deleted successfully!');
        fetchCourses();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  const manageStudents = (course) => {
    alert(`Manage Students for ${course.course_code}\n\nView enrolled students\nAdd/remove students\nWaitlist management`);
  };

  const clearFilters = () => {
    setDepartmentFilter('All Departments');
    setSemesterFilter('All Semesters');
    setSearchTerm('');
  };

  // Filtering
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.course_code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All Departments' || course.department === departmentFilter;
    const matchesSemester = semesterFilter === 'All Semesters' || course.semester === semesterFilter;
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  // Group courses by semester
  const groupCoursesBySemester = () => {
    const grouped = {};
    filteredCourses.forEach(course => {
      const semester = course.semester || 'Uncategorized';
      if (!grouped[semester]) {
        grouped[semester] = [];
      }
      grouped[semester].push(course);
    });
    return grouped;
  };

  const groupedCourses = groupCoursesBySemester();
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.is_active === 1).length;
  const departments = [...new Set(courses.map(c => c.department).filter(Boolean))];
  const semesters = [...new Set(courses.map(c => c.semester).filter(Boolean))];
  const semesterOrder = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];

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
    semesterGroup: {
      marginBottom: '32px'
    },
    semesterTitle: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#667eea',
      marginBottom: '16px',
      paddingBottom: '8px',
      borderBottom: '2px solid rgba(102,126,234,0.3)'
    },
    courseGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
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
      marginBottom: '8px'
    },
    courseMeta: {
      display: 'flex',
      gap: '15px',
      marginBottom: '12px',
      flexWrap: 'wrap'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#94a3b8',
      fontSize: '12px'
    },
    prerequisites: {
      marginTop: '8px',
      padding: '6px 10px',
      background: 'rgba(102,126,234,0.1)',
      borderRadius: '8px',
      fontSize: '11px',
      color: '#94a3b8'
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
          <p style={styles.pageSubtitle}>Complete curriculum with semester-wise course breakdown</p>
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
          <div style={styles.statValue}>{departments.length}</div>
          <div style={styles.statLabel}>Departments</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{semesters.length}</div>
          <div style={styles.statLabel}>Semesters</div>
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
          {departments.map(dept => <option key={dept}>{dept}</option>)}
        </select>
        <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)} style={styles.selectInput}>
          <option>All Semesters</option>
          {semesterOrder.map(sem => semesters.includes(sem) && <option key={sem}>{sem}</option>)}
        </select>
        <button onClick={clearFilters} style={styles.clearButton}>
          <i className="fas fa-filter"></i> Clear Filters
        </button>
      </div>

      {/* Course Grid Grouped by Semester */}
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Course Management</h2>
        </div>

        {Object.keys(groupedCourses).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            No courses found
          </div>
        ) : (
          semesterOrder.filter(sem => groupedCourses[sem]).map(semester => (
            <div key={semester} style={styles.semesterGroup}>
              <h3 style={styles.semesterTitle}>{semester}</h3>
              <div style={styles.courseGrid}>
                {groupedCourses[semester].map((course) => (
                  <div key={course.id} style={styles.courseCard}>
                    <div style={styles.courseCode}>{course.course_code}</div>
                    <div style={styles.courseName}>{course.course_name}</div>
                    <div style={styles.courseMeta}>
                      <div style={styles.metaItem}><i className="fas fa-clock"></i> {course.credits} Credits</div>
                      <div style={styles.metaItem}><i className="fas fa-building"></i> {course.department}</div>
                    </div>
                    {course.prerequisites && course.prerequisites !== 'None' && (
                      <div style={styles.prerequisites}>
                        <i className="fas fa-book"></i> Prerequisites: {course.prerequisites}
                      </div>
                    )}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
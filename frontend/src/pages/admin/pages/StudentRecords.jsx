import React, { useState, useEffect } from 'react';

const StudentRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  // Fetch students from backend (users with role = 'student')
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        
        // Extract unique departments for filter
        const uniqueDepts = [...new Set(data.map(s => s.department).filter(Boolean))];
        setDepartments(uniqueDepts);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = () => {
    alert('Add Student:\n\nCreate new student record with:\n- Personal information\n- Academic details\n- Contact information\n- Emergency contacts\n- Course enrollment');
  };

  const handleViewStudent = (student) => {
    alert(`📚 Student Details\n\n` +
          `ID: ${student.user_id}\n` +
          `Name: ${student.name}\n` +
          `Email: ${student.email}\n` +
          `Roll Number: ${student.roll_number || 'N/A'}\n` +
          `Department: ${student.department || 'N/A'}\n` +
          `Semester: ${student.semester || 'N/A'}\n` +
          `CGPA: ${student.cgpa || 'N/A'}`);
  };

  const handleEditStudent = (student) => {
    alert(`Edit Student: ${student.user_id}\n\nEdit personal information\nUpdate academic details\nModify course enrollment\nChange contact information`);
  };

  const handleViewTranscript = (student) => {
    alert(`Transcript for: ${student.name}\n\nComplete academic transcript\nCourse grades\nGPA calculation: ${student.cgpa || 'N/A'}\nCredits earned\nDegree progress`);
  };

  const handleExportRecords = () => {
    alert('Export Student Records:\n\nFormats: CSV, Excel, PDF\nOptions: All records, Filtered, Selected\nInclude: Academic data, Contact info, Grades');
  };

  const handleClearFilters = () => {
    setDepartmentFilter('All Departments');
    setYearFilter('All Years');
    setStatusFilter('All Status');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.user_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All Departments' || student.department === departmentFilter;
    const matchesYear = yearFilter === 'All Years' || student.semester?.toString() === yearFilter;
    return matchesSearch && matchesDepartment && matchesYear;
  });

  // Pagination
  const studentsPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  // Stats calculations
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.is_active === 1).length;
  const avgGPA = students.length > 0 
    ? (students.reduce((sum, s) => sum + (parseFloat(s.cgpa) || 0), 0) / students.length).toFixed(2)
    : '0.00';
  const avgAttendance = '85%'; // Placeholder - you can calculate from attendance table

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0a0a15',
      fontFamily: "'Inter', sans-serif",
      color: 'white'
    },
    content: {
      padding: '0'
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
    exportButton: {
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
    tableContainer: {
      background: '#1a1a2e',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    tableTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '20px',
      color: 'white'
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      color: '#94a3b8',
      fontWeight: 500,
      fontSize: '13px',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    td: {
      padding: '12px',
      fontSize: '13px',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    tdName: {
      padding: '12px',
      fontSize: '13px',
      fontWeight: 500,
      color: 'white',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    statusActive: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      background: 'rgba(16,185,129,0.15)',
      color: '#10b981',
      display: 'inline-block'
    },
    statusInactive: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      background: 'rgba(239,68,68,0.15)',
      color: '#ef4444',
      display: 'inline-block'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    actionBtn: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#94a3b8',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
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
    }
  };

  const getStatusStyle = (isActive) => {
    return isActive === 1 ? styles.statusActive : styles.statusInactive;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ color: '#94a3b8' }}>Loading students...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Student Records</h1>
            <p style={styles.pageSubtitle}>Manage student information and academic records</p>
          </div>
          <div style={styles.headerButtons}>
            <button onClick={handleExportRecords} style={styles.exportButton}>
              <i className="fas fa-download"></i> Export
            </button>
            <button onClick={handleAddStudent} style={styles.addButton}>
              <i className="fas fa-user-plus"></i> Add Student
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{totalStudents}</div>
            <div style={styles.statLabel}>Total Students</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{activeStudents}</div>
            <div style={styles.statLabel}>Active Students</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{avgAttendance}</div>
            <div style={styles.statLabel}>Avg Attendance</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{avgGPA}</div>
            <div style={styles.statLabel}>Avg GPA</div>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.searchWrapper}>
            <i className="fas fa-search" style={styles.searchIcon}></i>
            <input 
              type="text" 
              placeholder="Search students by name, ID or email..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={styles.searchInput} 
            />
          </div>
          <select 
            value={departmentFilter} 
            onChange={(e) => setDepartmentFilter(e.target.value)} 
            style={styles.selectInput}
          >
            <option>All Departments</option>
            {departments.map(dept => <option key={dept}>{dept}</option>)}
          </select>
          <select 
            value={yearFilter} 
            onChange={(e) => setYearFilter(e.target.value)} 
            style={styles.selectInput}
          >
            <option>All Years</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>Graduated</option>
          </select>
          <button onClick={handleClearFilters} style={styles.clearButton}>
            <i className="fas fa-filter"></i> Clear Filters
          </button>
        </div>

        {/* Students Table */}
        <div style={styles.tableContainer}>
          <h2 style={styles.tableTitle}>Student Directory</h2>
          
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Student ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Roll Number</th>
                  <th style={styles.th}>Semester</th>
                  <th style={styles.th}>CGPA</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student, idx) => (
                  <tr key={student.user_id || idx}>
                    <td style={styles.td}>{student.user_id}</td>
                    <td style={styles.tdName}>{student.name}</td>
                    <td style={styles.td}>{student.email}</td>
                    <td style={styles.td}>{student.department || '—'}</td>
                    <td style={styles.td}>{student.roll_number || '—'}</td>
                    <td style={styles.td}>{student.semester || '—'}</td>
                    <td style={styles.td}>{student.cgpa || '—'}</td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={styles.actionBtn} onClick={() => handleViewStudent(student)}>
                          <i className="fas fa-eye"></i>
                        </button>
                        <button style={styles.actionBtn} onClick={() => handleEditStudent(student)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button style={styles.actionBtn} onClick={() => handleViewTranscript(student)}>
                          <i className="fas fa-file-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedStudents.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.pagination}>
              <div style={styles.paginationText}>
                Showing {startIndex + 1} - {Math.min(startIndex + studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
              </div>
              <div style={styles.paginationButtons}>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
                  disabled={currentPage === 1}
                  style={currentPage === 1 ? styles.pageButtonDisabled : styles.pageButton}
                >
                  Previous
                </button>
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
    </div>
  );
};

export default StudentRecords;
import React, { useState } from 'react';

const StudentRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [students] = useState([
    { id: 'ST2023001', name: 'John Smith', department: 'Computer Science', year: '3rd', gpa: 3.8, attendance: '92%', status: 'Active' },
    { id: 'ST2023015', name: 'Michael Brown', department: 'Information Technology', year: '2nd', gpa: 3.2, attendance: '88%', status: 'Active' },
    { id: 'ST2023020', name: 'Emily Davis', department: 'Cyber Security', year: '4th', gpa: 3.6, attendance: '95%', status: 'Active' },
    { id: 'ST2021008', name: 'Sarah Wilson', department: 'Computer Science', year: 'Graduated', gpa: 3.9, attendance: '98%', status: 'Graduated' },
    { id: 'ST2023012', name: 'David Lee', department: 'Software Engineering', year: '1st', gpa: 3.0, attendance: '78%', status: 'Active' }
  ]);

  const stats = [
    { number: '1,248', label: 'Total Students' },
    { number: '1,120', label: 'Active Students' },
    { number: '85%', label: 'Avg Attendance' },
    { number: '3.42', label: 'Avg GPA' }
  ];

  const handleAddStudent = () => {
    alert('Add Student:\n\nCreate new student record with:\n- Personal information\n- Academic details\n- Contact information\n- Emergency contacts\n- Course enrollment');
  };

  const handleViewStudent = (id) => {
    alert(`View Student: ${id}\n\nComplete student profile\nAcademic history\nAttendance records\nFinancial information\nMedical records`);
  };

  const handleEditStudent = (id) => {
    alert(`Edit Student: ${id}\n\nEdit personal information\nUpdate academic details\nModify course enrollment\nChange contact information`);
  };

  const handleViewTranscript = (id) => {
    alert(`View Transcript: ${id}\n\nComplete academic transcript\nCourse grades\nGPA calculation\nCredits earned\nDegree progress`);
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
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All Departments' || student.department === departmentFilter;
    const matchesYear = yearFilter === 'All Years' || student.year === yearFilter;
    const matchesStatus = statusFilter === 'All Status' || student.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
  });

  // Pagination
  const studentsPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

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

  const getStatusStyle = (status) => {
    return status === 'Active' ? styles.statusActive : styles.statusInactive;
  };

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
          {stats.map((stat, idx) => (
            <div key={idx} style={styles.statCard}>
              <div style={styles.statValue}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.searchWrapper}>
            <i className="fas fa-search" style={styles.searchIcon}></i>
            <input 
              type="text" 
              placeholder="Search students..." 
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
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Software Engineering</option>
            <option>Cyber Security</option>
          </select>
          <select 
            value={yearFilter} 
            onChange={(e) => setYearFilter(e.target.value)} 
            style={styles.selectInput}
          >
            <option>All Years</option>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
            <option>4th</option>
            <option>Graduated</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            style={styles.selectInput}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
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
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>GPA</th>
                  <th style={styles.th}>Attendance</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student, idx) => (
                  <tr key={idx}>
                    <td style={styles.td}>{student.id}</td>
                    <td style={styles.tdName}>{student.name}</td>
                    <td style={styles.td}>{student.department}</td>
                    <td style={styles.td}>{student.year}</td>
                    <td style={styles.td}>{student.gpa}</td>
                    <td style={styles.td}>{student.attendance}</td>
                    <td style={styles.td}>
                      <span style={getStatusStyle(student.status)}>
                        {student.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={styles.actionBtn} onClick={() => handleViewStudent(student.id)}>
                          <i className="fas fa-eye"></i>
                        </button>
                        <button style={styles.actionBtn} onClick={() => handleEditStudent(student.id)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button style={styles.actionBtn} onClick={() => handleViewTranscript(student.id)}>
                          <i className="fas fa-file-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
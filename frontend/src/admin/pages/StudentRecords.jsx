import React, { useState, useEffect } from 'react';

const StudentRecords = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState(3);
  
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
    alert('Clearing all filters...');
  };

  const handleToggleNotifications = () => {
    alert('Notifications:\n1. New student registration\n2. Attendance warnings\n3. Academic probation alerts');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  // Filter students based on search and filters
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
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      alert('Loading previous page...');
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      alert('Loading next page...');
    }
  };

  const handleGoToPage = (page) => {
    setCurrentPage(page);
    alert(`Loading page ${page}...`);
  };

  // Update mobile styles on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        const toggle = document.querySelector('.mobile-toggle-style');
        if (toggle) toggle.style.display = 'flex';
      } else {
        const toggle = document.querySelector('.mobile-toggle-style');
        if (toggle) toggle.style.display = 'none';
        setSidebarActive(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    },
    background: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%), linear-gradient(180deg, #0a0a15 0%, #0f0f1e 50%, #1a1a2e 100%)',
      zIndex: -2
    },
    orb1: {
      position: 'fixed',
      width: '800px',
      height: '800px',
      background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
      top: '-30%',
      left: '-20%',
      borderRadius: '50%',
      filter: 'blur(120px)',
      opacity: 0.15,
      animation: 'orbFloat 25s ease-in-out infinite',
      zIndex: -1
    },
    orb2: {
      position: 'fixed',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(118, 75, 162, 0.12) 0%, transparent 70%)',
      bottom: '-20%',
      right: '-15%',
      borderRadius: '50%',
      filter: 'blur(120px)',
      opacity: 0.15,
      animation: 'orbFloat 25s ease-in-out infinite',
      animationDelay: '-12s',
      zIndex: -1
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
      padding: '30px',
      transition: 'margin-left 0.3s ease'
    },
    mobileMenuToggle: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      width: '50px',
      height: '50px',
      borderRadius: '14px',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      color: 'white',
      cursor: 'pointer',
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'none'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px'
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
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: "'Inter', sans-serif"
    },
    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: "'Inter', sans-serif"
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
    },
    logoContainer: {
      padding: '0 30px 40px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '30px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    logoIcon: {
      width: '42px',
      height: '42px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
    },
    logoTextH2: {
      fontSize: '24px',
      fontWeight: 800,
      color: 'white',
      marginBottom: '4px',
      letterSpacing: '-0.5px'
    },
    logoTextSpan: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    logoTextP: {
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontWeight: 500
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ef4444, #f87171)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      fontWeight: 600,
      color: 'white'
    },
    userInfoH4: {
      fontSize: '16px',
      fontWeight: 700,
      marginBottom: '4px',
      color: 'white'
    },
    userInfoP: {
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontWeight: 500
    },
    logoutBtn: {
      width: '100%',
      marginTop: '20px',
      padding: '14px',
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
      borderRadius: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontFamily: "'Inter', sans-serif"
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      flexWrap: 'wrap',
      gap: '20px'
    },
    pageTitleH1: {
      fontSize: '32px',
      fontWeight: 800,
      color: 'white',
      marginBottom: '8px'
    },
    pageTitleP: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '15px'
    },
    topBarActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    notificationBtn: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      width: '48px',
      height: '48px',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      background: '#ef4444',
      color: 'white',
      fontSize: '12px',
      fontWeight: 700,
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchBar: {
      position: 'relative',
      width: '300px'
    },
    searchInput: {
      width: '100%',
      padding: '16px 20px 16px 50px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '14px',
      color: 'white',
      fontSize: '15px',
      fontFamily: "'Inter', sans-serif"
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '18px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px'
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
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    sectionHeaderH2: {
      fontSize: '24px',
      fontWeight: 700,
      color: 'white'
    },
    sectionActions: {
      display: 'flex',
      gap: '12px'
    },
    filterOptions: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    filterSelect: {
      padding: '12px 20px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      color: 'white',
      fontSize: '14px',
      fontFamily: "'Inter', sans-serif",
      minWidth: '150px',
      cursor: 'pointer'
    },
    dataTable: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    tableHeader: {
      textAlign: 'left',
      padding: '16px',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    tableCell: {
      padding: '16px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      color: 'rgba(255, 255, 255, 0.95)',
      fontSize: '14px'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '100px',
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-block'
    },
    statusActive: {
      background: 'rgba(16, 185, 129, 0.2)',
      color: '#10b981'
    },
    statusInactive: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.6)'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
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
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px'
    },
    paginationText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px'
    },
    paginationButtons: {
      display: 'flex',
      gap: '8px'
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
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    activePageButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white'
    }
  };

  // Add animation keyframes to document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes orbFloat {
        0%, 100% { transform: translate(0,0) scale(1) rotate(0deg); }
        25% { transform: translate(5%,-5%) scale(1.2) rotate(90deg); }
        50% { transform: translate(-5%,5%) scale(0.9) rotate(180deg); }
        75% { transform: translate(3%,-3%) scale(1.1) rotate(270deg); }
      }
      @media (max-width: 992px) {
        .main-content-margin { margin-left: 0 !important; }
        .stats-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 768px) {
        .stats-grid-responsive { grid-template-columns: 1fr !important; }
        .data-table-responsive { display: block; overflow-x: auto; }
        .filter-options-responsive { flex-direction: column; }
        .filter-options-responsive select { width: 100%; }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      {/* Mobile Menu Toggle */}
      <div
        className="mobile-toggle-style"
        style={styles.mobileMenuToggle}
        onClick={() => setSidebarActive(!sidebarActive)}
      >
        <i className="fas fa-bars"></i>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>⚙️</div>
              <div>
                <h2 style={styles.logoTextH2}>SWE<span style={styles.logoTextSpan}>Hub</span></h2>
                <p style={styles.logoTextP}>Admin Dashboard</p>
              </div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '0 20px' }}>
            {[
              { name: 'Dashboard', icon: 'fa-home', active: false },
              { name: 'User Management', icon: 'fa-users', active: false },
              { name: 'Student Records', icon: 'fa-graduation-cap', active: true },
              { name: 'Faculty Management', icon: 'fa-chalkboard-teacher', active: false },
              { name: 'Results & Grades', icon: 'fa-chart-bar', active: false },
              { name: 'Course Catalog', icon: 'fa-book', active: false },
              { name: 'Academic Calendar', icon: 'fa-calendar-alt', active: false },
              { name: 'System Settings', icon: 'fa-cogs', active: false },
              { name: 'Security & Logs', icon: 'fa-shield-alt', active: false },
              { name: 'Reports & Export', icon: 'fa-file-export', active: false }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.navItem,
                  background: item.active ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                  color: item.active ? 'white' : 'rgba(255,255,255,0.6)',
                  boxShadow: item.active ? '0 6px 20px rgba(102,126,234,0.3)' : 'none'
                }}
                onClick={() => alert(`Navigate to ${item.name}`)}
              >
                <i className={`fas ${item.icon}`} style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
                <span>{item.name}</span>
              </div>
            ))}
          </nav>

          <div style={{ padding: '30px 30px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={styles.userProfile}>
              <div style={styles.avatar}>AD</div>
              <div>
                <h4 style={styles.userInfoH4}>Admin Officer</h4>
                <p style={styles.userInfoP}>System Administrator</p>
              </div>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <i className="fas fa-sign-out-alt"></i><span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content-margin" style={styles.mainContent}>
          {/* Top Bar */}
          <div style={styles.topBar}>
            <div>
              <h1 style={styles.pageTitleH1}>Student Records</h1>
              <p style={styles.pageTitleP}>
                Manage student information and academic records - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={styles.topBarActions}>
              <div style={styles.notificationBtn} onClick={handleToggleNotifications}>
                <i className="fas fa-bell"></i>
                <span style={styles.notificationBadge}>{notifications}</span>
              </div>
              <div style={styles.searchBar}>
                <i className="fas fa-search" style={styles.searchIcon}></i>
                <input
                  type="text"
                  placeholder="Search student records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid-responsive" style={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} style={styles.statCard}>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Student Directory Section */}
          <div style={styles.systemOverview}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionHeaderH2}>Student Directory</h2>
              <div style={styles.sectionActions}>
                <button style={styles.btnPrimary} onClick={handleAddStudent}>
                  <i className="fas fa-user-plus"></i>Add Student
                </button>
                <button style={styles.btnSecondary} onClick={handleExportRecords}>
                  <i className="fas fa-download"></i>Export
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="filter-options-responsive" style={styles.filterOptions}>
              <select 
                style={styles.filterSelect} 
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option>All Departments</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Software Engineering</option>
                <option>Cyber Security</option>
              </select>
              <select 
                style={styles.filterSelect}
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option>All Years</option>
                <option>1st</option>
                <option>2nd</option>
                <option>3rd</option>
                <option>4th</option>
                <option>Graduated</option>
              </select>
              <select 
                style={styles.filterSelect}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Graduated</option>
              </select>
              <button style={styles.btnSecondary} onClick={handleClearFilters}>
                <i className="fas fa-filter"></i>Clear Filters
              </button>
            </div>

            {/* Students Table */}
            <div className="data-table-responsive">
              <table style={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Student ID</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Department</th>
                    <th style={styles.tableHeader}>Year</th>
                    <th style={styles.tableHeader}>GPA</th>
                    <th style={styles.tableHeader}>Attendance</th>
                    <th style={styles.tableHeader}>Status</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student, idx) => (
                    <tr key={idx} style={{ transition: 'all 0.3s' }}>
                      <td style={styles.tableCell}>{student.id}</td>
                      <td style={styles.tableCell}>{student.name}</td>
                      <td style={styles.tableCell}>{student.department}</td>
                      <td style={styles.tableCell}>{student.year}</td>
                      <td style={styles.tableCell}>{student.gpa}</td>
                      <td style={styles.tableCell}>{student.attendance}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusBadge,
                          ...(student.status === 'Active' ? styles.statusActive : styles.statusInactive)
                        }}>
                          {student.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
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
            <div style={styles.paginationContainer}>
              <div style={styles.paginationText}>
                Showing {(currentPage - 1) * studentsPerPage + 1} - {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
              </div>
              <div style={styles.paginationButtons}>
                <button style={styles.pageButton} onClick={handlePrevPage}>
                  <i className="fas fa-chevron-left"></i>Prev
                </button>
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    style={{
                      ...styles.pageButton,
                      ...(currentPage === page ? styles.activePageButton : {})
                    }}
                    onClick={() => handleGoToPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button style={styles.pageButton} onClick={handleNextPage}>
                  Next<i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentRecords;
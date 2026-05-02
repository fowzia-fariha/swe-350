import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState(5);
  
  const [users] = useState([
    { id: 'ST2023001', name: 'John Smith', email: 'john.smith@university.edu', role: 'Student', department: 'Computer Science', lastLogin: 'Mar 12, 2024', status: 'Active' },
    { id: 'TC2022005', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@university.edu', role: 'Teacher', department: 'Software Engineering', lastLogin: 'Mar 13, 2024', status: 'Active' },
    { id: 'AD2021001', name: 'Michael Rodriguez', email: 'm.rodriguez@university.edu', role: 'Administrator', department: 'Administration', lastLogin: 'Mar 14, 2024', status: 'Active' },
    { id: 'ST2023015', name: 'Michael Brown', email: 'michael.brown@university.edu', role: 'Student', department: 'Information Technology', lastLogin: 'Mar 1, 2024', status: 'Inactive' },
    { id: 'ST2023020', name: 'Emily Davis', email: 'emily.davis@university.edu', role: 'Student', department: 'Cyber Security', lastLogin: 'Never', status: 'Pending' }
  ]);

  const stats = [
    { number: '1,248', label: 'Total Users' },
    { number: '1,120', label: 'Active Users' },
    { number: '48', label: 'Faculty Members' },
    { number: '15', label: 'Administrators' }
  ];

  const handleAddNewUser = () => {
    alert('Opening Add User Form:\n\nCreate new user account with:\n- Personal information\n- Role assignment\n- Department selection\n- Email configuration\n- Initial password setup');
  };

  const handleEditUser = (userId) => {
    alert(`Editing user: ${userId}\n\nEdit Options:\n- Personal details\n- Contact information\n- Department/role changes\n- Account status\n- Notification preferences`);
  };

  const handleViewUser = (userId) => {
    alert(`Viewing user: ${userId}\n\nUser Profile:\n- Complete information\n- Activity history\n- Login records\n- Associated courses\n- Permissions\n- Audit trail`);
  };

  const handleResetPassword = (userId) => {
    if (window.confirm(`Reset password for user: ${userId}?\n\nA temporary password will be generated and sent via email.`)) {
      alert(`Password reset initiated for ${userId}\nTemporary password has been sent.`);
    }
  };

  const handleActivateUser = (userId) => {
    if (window.confirm(`Activate user account: ${userId}?\n\nUser will be able to login immediately.`)) {
      alert(`User ${userId} activated successfully.`);
    }
  };

  const handleApproveUser = (userId) => {
    if (window.confirm(`Approve pending user: ${userId}?\n\nAccount will be activated and welcome email sent.`)) {
      alert(`User ${userId} approved and activated.`);
    }
  };

  const handleManagePermissions = (userId) => {
    alert(`Managing permissions for: ${userId}\n\nPermission Settings:\n- Module access\n- Feature permissions\n- Data access levels\n- Administrative rights\n- System privileges`);
  };

  const handleExportUsers = () => {
    alert('Exporting user data:\n\nAvailable formats:\n- CSV (All fields)\n- Excel (Formatted)\n- PDF Report\n- JSON Data\n\nFilter options will be applied to export.');
  };

  const handleClearFilters = () => {
    setRoleFilter('');
    setStatusFilter('');
    setDepartmentFilter('');
    setSearchTerm('');
    alert('Clearing all filters...\n\nShowing all users.');
  };

  const handleToggleNotifications = () => {
    alert('Showing Notifications:\n\n1. New user registration (2 pending)\n2. Password reset requests (3)\n3. Account activation needed (5)\n4. Security alert\n5. System update available');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out... Redirecting to login page.');
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role.toLowerCase() === roleFilter;
    const matchesStatus = !statusFilter || user.status.toLowerCase() === statusFilter;
    const matchesDepartment = !departmentFilter || user.department.toLowerCase().replace(/ /g, '-') === departmentFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  // Pagination
  const usersPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handlePreviousPage = () => {
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
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
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
    btnDanger: {
      background: 'linear-gradient(135deg, #ef4444, #f87171)',
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
    statusPending: {
      background: 'rgba(245, 158, 11, 0.2)',
      color: '#f59e0b'
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
      gap: '8px',
      alignItems: 'center'
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
    },
    ellipsis: {
      color: 'rgba(255, 255, 255, 0.6)',
      padding: '0 8px'
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

  const getStatusStyle = (status) => {
    if (status === 'Active') return styles.statusActive;
    if (status === 'Pending') return styles.statusPending;
    return styles.statusInactive;
  };

  const renderActionButtons = (user) => {
    if (user.role === 'Administrator') {
      return (
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn} onClick={() => handleEditUser(user.id)}>
            <i className="fas fa-edit"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleViewUser(user.id)}>
            <i className="fas fa-eye"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleManagePermissions(user.id)}>
            <i className="fas fa-user-shield"></i>
          </button>
        </div>
      );
    } else if (user.status === 'Inactive') {
      return (
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn} onClick={() => handleEditUser(user.id)}>
            <i className="fas fa-edit"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleViewUser(user.id)}>
            <i className="fas fa-eye"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleActivateUser(user.id)}>
            <i className="fas fa-check"></i>
          </button>
        </div>
      );
    } else if (user.status === 'Pending') {
      return (
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn} onClick={() => handleEditUser(user.id)}>
            <i className="fas fa-edit"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleViewUser(user.id)}>
            <i className="fas fa-eye"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleApproveUser(user.id)}>
            <i className="fas fa-check-circle"></i>
          </button>
        </div>
      );
    } else {
      return (
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn} onClick={() => handleEditUser(user.id)}>
            <i className="fas fa-edit"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleViewUser(user.id)}>
            <i className="fas fa-eye"></i>
          </button>
          <button style={styles.actionBtn} onClick={() => handleResetPassword(user.id)}>
            <i className="fas fa-key"></i>
          </button>
        </div>
      );
    }
  };

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
              { name: 'User Management', icon: 'fa-users', active: true },
              { name: 'Student Records', icon: 'fa-graduation-cap', active: false },
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
              <h1 style={styles.pageTitleH1}>User Management</h1>
              <p style={styles.pageTitleP}>
                Manage user accounts, roles, and permissions - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                  placeholder="Search users by name, ID, or email..."
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

          {/* User Management Table */}
          <div style={styles.systemOverview}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionHeaderH2}>All Users</h2>
              <div style={styles.sectionActions}>
                <button style={styles.btnPrimary} onClick={handleAddNewUser}>
                  <i className="fas fa-user-plus"></i>Add User
                </button>
                <button style={styles.btnSecondary} onClick={handleExportUsers}>
                  <i className="fas fa-download"></i>Export
                </button>
              </div>
            </div>

            {/* Filter Options */}
            <div className="filter-options-responsive" style={styles.filterOptions}>
              <select 
                style={styles.filterSelect} 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="administrator">Administrator</option>
                <option value="staff">Staff</option>
              </select>
              
              <select 
                style={styles.filterSelect}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              
              <select 
                style={styles.filterSelect}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="cs">Computer Science</option>
                <option value="it">Information Technology</option>
                <option value="se">Software Engineering</option>
                <option value="cyber">Cyber Security</option>
              </select>
              
              <button style={styles.btnSecondary} onClick={handleClearFilters}>
                <i className="fas fa-filter"></i>Clear Filters
              </button>
            </div>

            {/* User Table */}
            <div className="data-table-responsive">
              <table style={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>User ID</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Email</th>
                    <th style={styles.tableHeader}>Role</th>
                    <th style={styles.tableHeader}>Department</th>
                    <th style={styles.tableHeader}>Last Login</th>
                    <th style={styles.tableHeader}>Status</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, idx) => (
                    <tr key={idx} style={{ transition: 'all 0.3s' }}>
                      <td style={styles.tableCell}>{user.id}</td>
                      <td style={styles.tableCell}>{user.name}</td>
                      <td style={styles.tableCell}>{user.email}</td>
                      <td style={styles.tableCell}>{user.role}</td>
                      <td style={styles.tableCell}>{user.department}</td>
                      <td style={styles.tableCell}>{user.lastLogin}</td>
                      <td style={styles.tableCell}>
                        <span style={{ ...styles.statusBadge, ...getStatusStyle(user.status) }}>
                          {user.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        {renderActionButtons(user)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={styles.paginationContainer}>
              <div style={styles.paginationText}>
                Showing {(currentPage - 1) * usersPerPage + 1} - {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div style={styles.paginationButtons}>
                <button style={styles.pageButton} onClick={handlePreviousPage}>
                  <i className="fas fa-chevron-left"></i>Previous
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
                <span style={styles.ellipsis}>...</span>
                <button style={styles.pageButton} onClick={() => handleGoToPage(25)}>
                  25
                </button>
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

export default UserManagement;
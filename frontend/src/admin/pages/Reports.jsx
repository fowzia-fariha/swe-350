import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reports] = useState([
    {
      id: 'student-enrollment',
      title: 'Student Enrollment Report',
      description: 'Comprehensive report on student enrollment statistics, demographics, and trends by department and semester.',
      icon: 'fa-users',
      lastRun: 'Mar 12, 2024',
      size: '15.2 MB'
    },
    {
      id: 'academic-performance',
      title: 'Academic Performance',
      description: 'Detailed analysis of student grades, GPA distribution, pass/fail rates, and academic performance trends.',
      icon: 'fa-chart-bar',
      lastRun: 'Mar 13, 2024',
      size: '8.7 MB'
    },
    {
      id: 'graduation-analysis',
      title: 'Graduation Analysis',
      description: 'Graduation rates, time-to-degree analysis, and post-graduation outcomes by program and demographic.',
      icon: 'fa-graduation-cap',
      lastRun: 'Mar 10, 2024',
      size: '12.5 MB'
    },
    {
      id: 'course-evaluation',
      title: 'Course Evaluation',
      description: 'Course enrollment statistics, student evaluations, instructor ratings, and course effectiveness analysis.',
      icon: 'fa-book',
      lastRun: 'Mar 14, 2024',
      size: '6.3 MB'
    },
    {
      id: 'financial-report',
      title: 'Financial Report',
      description: 'Tuition revenue, fee collection, financial aid distribution, and departmental budget utilization analysis.',
      icon: 'fa-dollar-sign',
      lastRun: 'Mar 1, 2024',
      size: '22.8 MB'
    },
    {
      id: 'security-audit',
      title: 'Security Audit Report',
      description: 'System access logs, security incidents, compliance violations, and risk assessment analysis.',
      icon: 'fa-shield-alt',
      lastRun: 'Mar 13, 2024',
      size: '18.4 MB'
    },
    {
      id: 'faculty-workload',
      title: 'Faculty Workload Analysis',
      description: 'Teaching load distribution, research productivity, committee assignments, and faculty performance metrics.',
      icon: 'fa-user-tie',
      lastRun: 'Mar 11, 2024',
      size: '9.1 MB'
    },
    {
      id: 'system-usage',
      title: 'System Usage Analytics',
      description: 'Platform usage statistics, peak load times, user engagement metrics, and system performance analysis.',
      icon: 'fa-chart-line',
      lastRun: 'Today',
      size: '4.2 MB'
    }
  ]);

  const [recentExports] = useState([
    { name: 'Student Enrollment Report', format: 'PDF', date: 'Mar 14, 2024', status: 'Completed', statusColor: 'success' },
    { name: 'Academic Performance', format: 'Excel', date: 'Mar 13, 2024', status: 'Completed', statusColor: 'success' },
    { name: 'Financial Report', format: 'CSV', date: 'Mar 12, 2024', status: 'Processing', statusColor: 'warning' }
  ]);

  const stats = [
    { number: '42', label: 'Report Templates' },
    { number: '156', label: 'Exports This Month' },
    { number: '85%', label: 'Automated Reports' },
    { number: '12', label: 'Scheduled Reports' }
  ];

  const handleCreateCustomReport = () => {
    alert('Create Custom Report:\n\nReport type selection\nData source configuration\nFilter criteria\nColumn selection\nFormatting options\nSchedule settings');
  };

  const handleScheduleReport = () => {
    alert('Schedule Report:\n\nFrequency selection\nRecipient configuration\nFormat preferences\nDelivery method\nAutomation settings\nNotification options');
  };

  const handleExportReport = (report, format) => {
    alert(`Exporting ${report} as ${format.toUpperCase()}\n\nProcessing...\nFile will download automatically when ready.`);
  };

  const handlePreviewReport = (report) => {
    alert(`Preview Report: ${report}\n\nInteractive preview\nData validation\nFormatting review\nPage layout\nExport options`);
  };

  const handleToggleNotifications = () => {
    alert('Notifications:\n1. 5 reports ready for download\n2. Scheduled report completed\n3. Export queue status\n4. Custom report approval');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  // Filter reports based on search
  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    reportCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.3s',
      cursor: 'pointer'
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
    exportBtn: {
      padding: '8px 12px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
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
    reportsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '30px'
    },
    reportIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: 'white',
      marginBottom: '20px'
    },
    reportTitle: {
      fontSize: '18px',
      fontWeight: 700,
      marginBottom: '10px',
      color: 'white'
    },
    reportDescription: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      marginBottom: '20px',
      lineHeight: 1.5
    },
    reportMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '12px',
      marginBottom: '15px'
    },
    exportOptions: {
      display: 'flex',
      gap: '8px'
    },
    recentExportsContainer: {
      marginTop: '40px'
    },
    recentExportsTitle: {
      marginBottom: '20px',
      fontSize: '18px'
    },
    recentExportsTable: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '20px'
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '15px',
      padding: '12px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.6)'
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '15px',
      padding: '12px'
    },
    statusSuccess: {
      color: '#10b981'
    },
    statusWarning: {
      color: '#f59e0b'
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
        .reports-grid-responsive { grid-template-columns: 1fr !important; }
        .table-header-responsive, .table-row-responsive { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
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
              { name: 'Student Records', icon: 'fa-graduation-cap', active: false },
              { name: 'Faculty Management', icon: 'fa-chalkboard-teacher', active: false },
              { name: 'Results & Grades', icon: 'fa-chart-bar', active: false },
              { name: 'Course Catalog', icon: 'fa-book', active: false },
              { name: 'Academic Calendar', icon: 'fa-calendar-alt', active: false },
              { name: 'System Settings', icon: 'fa-cogs', active: false },
              { name: 'Security & Logs', icon: 'fa-shield-alt', active: false },
              { name: 'Reports & Export', icon: 'fa-file-export', active: true }
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
              <h1 style={styles.pageTitleH1}>Reports & Export</h1>
              <p style={styles.pageTitleP}>
                Generate reports and export system data - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={styles.topBarActions}>
              <div style={styles.notificationBtn} onClick={handleToggleNotifications}>
                <i className="fas fa-bell"></i>
                <span style={styles.notificationBadge}>5</span>
              </div>
              <div style={styles.searchBar}>
                <i className="fas fa-search" style={styles.searchIcon}></i>
                <input
                  type="text"
                  placeholder="Search reports..."
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

          {/* Reports Section */}
          <div style={styles.systemOverview}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionHeaderH2}>Available Reports</h2>
              <div style={styles.sectionActions}>
                <button style={styles.btnPrimary} onClick={handleCreateCustomReport}>
                  <i className="fas fa-plus-circle"></i>Custom Report
                </button>
                <button style={styles.btnSecondary} onClick={handleScheduleReport}>
                  <i className="fas fa-clock"></i>Schedule Report
                </button>
              </div>
            </div>

            <div className="reports-grid-responsive" style={styles.reportsGrid}>
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  style={styles.reportCard}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={styles.reportIcon}>
                    <i className={`fas ${report.icon}`}></i>
                  </div>
                  <div style={styles.reportTitle}>{report.title}</div>
                  <div style={styles.reportDescription}>{report.description}</div>
                  <div style={styles.reportMeta}>
                    <span>Last run: {report.lastRun}</span>
                    <span>{report.size}</span>
                  </div>
                  <div style={styles.exportOptions}>
                    <button style={styles.exportBtn} onClick={() => handleExportReport(report.title, 'pdf')}>PDF</button>
                    <button style={styles.exportBtn} onClick={() => handleExportReport(report.title, 'excel')}>Excel</button>
                    <button style={styles.exportBtn} onClick={() => handleExportReport(report.title, 'csv')}>CSV</button>
                    <button style={styles.exportBtn} onClick={() => handlePreviewReport(report.title)}>Preview</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Exports Section */}
            <div style={styles.recentExportsContainer}>
              <h3 style={styles.recentExportsTitle}>Recent Exports</h3>
              <div style={styles.recentExportsTable}>
                <div className="table-header-responsive" style={styles.tableHeader}>
                  <div>Report Name</div>
                  <div>Format</div>
                  <div>Date</div>
                  <div>Status</div>
                </div>
                {recentExports.map((export_, idx) => (
                  <div key={idx} className="table-row-responsive" style={{ ...styles.tableRow, borderBottom: idx < recentExports.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div>{export_.name}</div>
                    <div>{export_.format}</div>
                    <div>{export_.date}</div>
                    <div><span style={export_.statusColor === 'success' ? styles.statusSuccess : styles.statusWarning}>{export_.status}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);
  
  // Settings state
  const [academicSettings, setAcademicSettings] = useState({
    gradingScale: '4.0 Scale',
    passingGrade: '60%',
    autoCalculateGPA: true,
    showGPAStudents: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: '90',
    autoLockSessions: true,
    failedLoginLockout: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    gradePublicationAlerts: true,
    systemMaintenanceAlerts: true
  });
  
  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    backupFrequency: 'Weekly',
    dataRetention: '7',
    autoArchive: true
  });
  
  const [regionalSettings, setRegionalSettings] = useState({
    systemLanguage: 'English (US)',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'UTC-5 (EST)',
    currencyFormat: 'USD ($)'
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    emailService: 'SMTP',
    smsGateway: 'Twilio',
    paymentGateway: 'Stripe',
    apiAccess: true
  });

  const handleSaveSettings = () => {
    alert('Saving all system settings...\n\nSettings have been saved successfully.\nSome changes may require user logout/login to take effect.');
  };
  
  const handleResetSettings = () => {
    if (window.confirm('Reset all settings to default?\n\nThis will revert all customizations.')) {
      setAcademicSettings({
        gradingScale: '4.0 Scale',
        passingGrade: '60%',
        autoCalculateGPA: true,
        showGPAStudents: true
      });
      setSecuritySettings({
        twoFactorAuth: true,
        passwordExpiry: '90',
        autoLockSessions: true,
        failedLoginLockout: true
      });
      setNotificationSettings({
        emailNotifications: true,
        smsAlerts: false,
        gradePublicationAlerts: true,
        systemMaintenanceAlerts: true
      });
      setDataSettings({
        autoBackup: true,
        backupFrequency: 'Weekly',
        dataRetention: '7',
        autoArchive: true
      });
      setRegionalSettings({
        systemLanguage: 'English (US)',
        dateFormat: 'MM/DD/YYYY',
        timeZone: 'UTC-5 (EST)',
        currencyFormat: 'USD ($)'
      });
      setIntegrationSettings({
        emailService: 'SMTP',
        smsGateway: 'Twilio',
        paymentGateway: 'Stripe',
        apiAccess: true
      });
      alert('Settings reset to default values.');
    }
  };
  
  const handleToggleNotifications = () => {
    alert('Notifications:\n1. 3 pending setting changes\n2. Backup completed\n3. Security audit scheduled');
  };
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
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
    systemOverview: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '30px'
    },
    settingsCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px'
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
    settingsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
      marginTop: '30px'
    },
    settingsHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px'
    },
    settingsIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      color: 'white'
    },
    settingsTitle: {
      fontSize: '18px',
      fontWeight: 700,
      color: 'white'
    },
    settingsDescription: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      marginBottom: '20px'
    },
    settingsOption: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    },
    optionLabel: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.95)'
    },
    selectSmall: {
      padding: '8px 12px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '13px',
      fontFamily: "'Inter', sans-serif",
      cursor: 'pointer'
    },
    toggleSwitch: {
      position: 'relative',
      display: 'inline-block',
      width: '50px',
      height: '24px'
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    slider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transition: '.4s',
      borderRadius: '24px'
    },
    sliderBefore: {
      position: 'absolute',
      content: '""',
      height: '16px',
      width: '16px',
      left: '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '.4s',
      borderRadius: '50%'
    },
    saveButtonContainer: {
      marginTop: '30px',
      textAlign: 'center'
    },
    saveButton: {
      padding: '16px 32px',
      fontSize: '16px'
    },
    noteText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      marginTop: '10px'
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
        .settings-grid-responsive { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 768px) {
        .settings-grid-responsive { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  // Helper component for toggle switch
  const ToggleSwitch = ({ checked, onChange }) => (
    <label style={styles.toggleSwitch}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        style={styles.toggleInput}
      />
      <span style={styles.slider}>
        <span style={styles.sliderBefore}></span>
      </span>
    </label>
  );

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
              { name: 'System Settings', icon: 'fa-cogs', active: true },
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
              <h1 style={styles.pageTitleH1}>System Settings</h1>
              <p style={styles.pageTitleP}>
                Configure system preferences and global settings - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                  placeholder="Search settings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div style={styles.systemOverview}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionHeaderH2}>Configuration Panel</h2>
              <div style={styles.sectionActions}>
                <button style={styles.btnPrimary} onClick={handleSaveSettings}>
                  <i className="fas fa-save"></i>Save All Changes
                </button>
                <button style={styles.btnSecondary} onClick={handleResetSettings}>
                  <i className="fas fa-undo"></i>Reset to Default
                </button>
              </div>
            </div>

            <div className="settings-grid-responsive" style={styles.settingsGrid}>
              {/* Academic Settings Card */}
              <div style={styles.settingsCard}>
                <div style={styles.settingsHeader}>
                  <div style={styles.settingsIcon}><i className="fas fa-graduation-cap"></i></div>
                  <div style={styles.settingsTitle}>Academic Settings</div>
                </div>
                <div style={styles.settingsDescription}>Configure academic policies, grading scales, and course requirements.</div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Grading Scale</div>
                  <select 
                    style={styles.selectSmall}
                    value={academicSettings.gradingScale}
                    onChange={(e) => setAcademicSettings({...academicSettings, gradingScale: e.target.value})}
                  >
                    <option>4.0 Scale</option>
                    <option>Percentage Scale</option>
                    <option>Letter Grade Scale</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Passing Grade</div>
                  <select 
                    style={styles.selectSmall}
                    value={academicSettings.passingGrade}
                    onChange={(e) => setAcademicSettings({...academicSettings, passingGrade: e.target.value})}
                  >
                    <option>60%</option>
                    <option>65%</option>
                    <option>70%</option>
                    <option>50%</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Auto-calculate GPA</div>
                  <ToggleSwitch 
                    checked={academicSettings.autoCalculateGPA}
                    onChange={(e) => setAcademicSettings({...academicSettings, autoCalculateGPA: e.target.checked})}
                  />
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Show GPA to Students</div>
                  <ToggleSwitch 
                    checked={academicSettings.showGPAStudents}
                    onChange={(e) => setAcademicSettings({...academicSettings, showGPAStudents: e.target.checked})}
                  />
                </div>
              </div>

              {/* Security Settings Card */}
              <div style={styles.settingsCard}>
                <div style={styles.settingsHeader}>
                  <div style={styles.settingsIcon}><i className="fas fa-user-shield"></i></div>
                  <div style={styles.settingsTitle}>Security Settings</div>
                </div>
                <div style={styles.settingsDescription}>Configure security policies, authentication, and access controls.</div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Two-Factor Authentication</div>
                  <ToggleSwitch 
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                  />
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Password Expiry (Days)</div>
                  <select 
                    style={styles.selectSmall}
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                  >
                    <option>30</option>
                    <option>60</option>
                    <option>90</option>
                    <option>180</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Auto-lock Inactive Sessions</div>
                  <ToggleSwitch 
                    checked={securitySettings.autoLockSessions}
                    onChange={(e) => setSecuritySettings({...securitySettings, autoLockSessions: e.target.checked})}
                  />
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Failed Login Lockout</div>
                  <ToggleSwitch 
                    checked={securitySettings.failedLoginLockout}
                    onChange={(e) => setSecuritySettings({...securitySettings, failedLoginLockout: e.target.checked})}
                  />
                </div>
              </div>

              {/* Notification Settings Card */}
              <div style={styles.settingsCard}>
                <div style={styles.settingsHeader}>
                  <div style={styles.settingsIcon}><i className="fas fa-bell"></i></div>
                  <div style={styles.settingsTitle}>Notification Settings</div>
                </div>
                <div style={styles.settingsDescription}>Configure email, SMS, and in-app notification preferences.</div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Email Notifications</div>
                  <ToggleSwitch 
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                  />
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>SMS Alerts</div>
                  <ToggleSwitch 
                    checked={notificationSettings.smsAlerts}
                    onChange={(e) => setNotificationSettings({...notificationSettings, smsAlerts: e.target.checked})}
                  />
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Grade Publication Alerts</div>
                  <ToggleSwitch 
                    checked={notificationSettings.gradePublicationAlerts}
                    onChange={(e) => setNotificationSettings({...notificationSettings, gradePublicationAlerts: e.target.checked})}
                  />
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>System Maintenance Alerts</div>
                  <ToggleSwitch 
                    checked={notificationSettings.systemMaintenanceAlerts}
                    onChange={(e) => setNotificationSettings({...notificationSettings, systemMaintenanceAlerts: e.target.checked})}
                  />
                </div>
              </div>

              {/* Data Management Card */}
              <div style={styles.settingsCard}>
                <div style={styles.settingsHeader}>
                  <div style={styles.settingsIcon}><i className="fas fa-database"></i></div>
                  <div style={styles.settingsTitle}>Data Management</div>
                </div>
                <div style={styles.settingsDescription}>Configure data retention, backups, and export settings.</div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Auto Backup</div>
                  <ToggleSwitch 
                    checked={dataSettings.autoBackup}
                    onChange={(e) => setDataSettings({...dataSettings, autoBackup: e.target.checked})}
                  />
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Backup Frequency</div>
                  <select 
                    style={styles.selectSmall}
                    value={dataSettings.backupFrequency}
                    onChange={(e) => setDataSettings({...dataSettings, backupFrequency: e.target.value})}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Data Retention (Years)</div>
                  <select 
                    style={styles.selectSmall}
                    value={dataSettings.dataRetention}
                    onChange={(e) => setDataSettings({...dataSettings, dataRetention: e.target.value})}
                  >
                    <option>5</option>
                    <option>7</option>
                    <option>10</option>
                    <option>Permanent</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Auto-Archive Old Records</div>
                  <ToggleSwitch 
                    checked={dataSettings.autoArchive}
                    onChange={(e) => setDataSettings({...dataSettings, autoArchive: e.target.checked})}
                  />
                </div>
              </div>

              {/* Regional Settings Card */}
              <div style={styles.settingsCard}>
                <div style={styles.settingsHeader}>
                  <div style={styles.settingsIcon}><i className="fas fa-language"></i></div>
                  <div style={styles.settingsTitle}>Regional Settings</div>
                </div>
                <div style={styles.settingsDescription}>Configure language, date format, and regional preferences.</div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>System Language</div>
                  <select 
                    style={styles.selectSmall}
                    value={regionalSettings.systemLanguage}
                    onChange={(e) => setRegionalSettings({...regionalSettings, systemLanguage: e.target.value})}
                  >
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Date Format</div>
                  <select 
                    style={styles.selectSmall}
                    value={regionalSettings.dateFormat}
                    onChange={(e) => setRegionalSettings({...regionalSettings, dateFormat: e.target.value})}
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Time Zone</div>
                  <select 
                    style={styles.selectSmall}
                    value={regionalSettings.timeZone}
                    onChange={(e) => setRegionalSettings({...regionalSettings, timeZone: e.target.value})}
                  >
                    <option>UTC-5 (EST)</option>
                    <option>UTC-8 (PST)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+5 (PKT)</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Currency Format</div>
                  <select 
                    style={styles.selectSmall}
                    value={regionalSettings.currencyFormat}
                    onChange={(e) => setRegionalSettings({...regionalSettings, currencyFormat: e.target.value})}
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>

              {/* Integration Settings Card */}
              <div style={styles.settingsCard}>
                <div style={styles.settingsHeader}>
                  <div style={styles.settingsIcon}><i className="fas fa-plug"></i></div>
                  <div style={styles.settingsTitle}>Integration Settings</div>
                </div>
                <div style={styles.settingsDescription}>Configure third-party integrations and API settings.</div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Email Service</div>
                  <select 
                    style={styles.selectSmall}
                    value={integrationSettings.emailService}
                    onChange={(e) => setIntegrationSettings({...integrationSettings, emailService: e.target.value})}
                  >
                    <option>SMTP</option>
                    <option>SendGrid</option>
                    <option>Mailgun</option>
                    <option>Amazon SES</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>SMS Gateway</div>
                  <select 
                    style={styles.selectSmall}
                    value={integrationSettings.smsGateway}
                    onChange={(e) => setIntegrationSettings({...integrationSettings, smsGateway: e.target.value})}
                  >
                    <option>Twilio</option>
                    <option>Nexmo</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>Payment Gateway</div>
                  <select 
                    style={styles.selectSmall}
                    value={integrationSettings.paymentGateway}
                    onChange={(e) => setIntegrationSettings({...integrationSettings, paymentGateway: e.target.value})}
                  >
                    <option>Stripe</option>
                    <option>PayPal</option>
                    <option>Authorize.net</option>
                  </select>
                </div>
                <div style={styles.settingsOption}>
                  <div style={styles.optionLabel}>API Access</div>
                  <ToggleSwitch 
                    checked={integrationSettings.apiAccess}
                    onChange={(e) => setIntegrationSettings({...integrationSettings, apiAccess: e.target.checked})}
                  />
                </div>
              </div>
            </div>

            <div style={styles.saveButtonContainer}>
              <button style={{...styles.btnPrimary, ...styles.saveButton}} onClick={handleSaveSettings}>
                <i className="fas fa-save"></i>Save All System Settings
              </button>
              <p style={styles.noteText}>
                Changes will take effect immediately after saving. Some settings may require system restart.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
import React, { useState, useEffect } from 'react';

const App = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(5);

  // Dashboard data
  const stats = {
    totalStudents: { value: '1,248', change: '+5.2%', positive: true },
    facultyMembers: { value: '48', change: '+2 new hires', positive: true },
    activeCourses: { value: '32', change: '+3 this semester', positive: true },
    pendingRequests: { value: '156', change: '-12 from yesterday', positive: false }
  };

  const activities = [
    { time: '10:23 AM', user: 'Dr. Sarah Johnson', action: 'Grade Submitted', details: 'CS301 - Final Grades' },
    { time: '09:45 AM', user: 'John Smith', action: 'Course Registration', details: 'Registered for CS401' },
    { time: '09:15 AM', user: 'Admin Officer', action: 'User Created', details: 'New faculty account' },
    { time: 'Yesterday', user: 'System', action: 'Backup Completed', details: 'Daily system backup' },
    { time: 'Yesterday', user: 'Michael Brown', action: 'Password Reset', details: 'Account security update' }
  ];

  const alerts = [
    { type: 'storage', title: 'Storage Warning', message: '85% of storage capacity used', icon: 'fa-exclamation-triangle' },
    { type: 'backup', title: 'Backup Scheduled', message: 'Tonight at 2:00 AM - 4:00 AM', icon: 'fa-database' },
    { type: 'security', title: 'Security Update', message: 'New security patches available', icon: 'fa-shield-alt' }
  ];

  const upcomingEvents = [
    { title: 'Midterm Exams', date: 'Mar 28-30, 2024', type: 'Exam', color: 'warning' },
    { title: 'Registration Opens', date: 'Apr 15, 2024', type: 'Admin', color: 'info' },
    { title: 'Final Exams', date: 'May 10-17, 2024', type: 'Exam', color: 'warning' }
  ];

  const performanceIndicators = [
    { label: 'System Uptime', value: '99.8%' },
    { label: 'Server Load', value: '42%' },
    { label: 'Active Sessions', value: '248' },
    { label: 'Storage Used', value: '85%' }
  ];

  const quickActions = [
    { title: 'Add New User', desc: 'Create student/teacher accounts', icon: 'fa-user-plus', action: 'addUser' },
    { title: 'Upload Results', desc: 'Bulk upload student grades', icon: 'fa-file-upload', action: 'uploadResults' },
    { title: 'Schedule Event', desc: 'Add to academic calendar', icon: 'fa-calendar-plus', action: 'scheduleEvent' },
    { title: 'Create Announcement', desc: 'Send system-wide message', icon: 'fa-bullhorn', action: 'announcement' }
  ];

  const adminActions = [
    { title: 'System Settings', desc: 'Configure system parameters', icon: 'fa-cog', action: 'settings' },
    { title: 'Backup & Restore', desc: 'Manage system backups', icon: 'fa-database', action: 'backup' },
    { title: 'Audit Logs', desc: 'View system activity logs', icon: 'fa-clipboard-list', action: 'audit' },
    { title: 'Announcements', desc: 'Send system-wide messages', icon: 'fa-bullhorn', action: 'announce' }
  ];

  // Calendar data
  const calendarEvents = {
    1: [{ title: 'Semester Begins', type: 'academic' }],
    2: [{ title: 'Add/Drop Period', type: 'academic' }],
    3: [{ title: 'Add/Drop Period', type: 'academic' }],
    11: [{ title: 'Spring Break', type: 'holiday' }],
    12: [{ title: 'Spring Break', type: 'holiday' }],
    13: [{ title: 'Spring Break', type: 'holiday' }],
    14: [{ title: 'Spring Break', type: 'holiday' }],
    15: [{ title: 'Spring Break', type: 'holiday' }],
    18: [{ title: 'Classes Resume', type: 'academic' }],
    28: [{ title: 'Midterm Exams', type: 'exam' }],
    29: [{ title: 'Midterm Exams', type: 'exam' }],
    30: [{ title: 'Midterm Exams', type: 'exam' }]
  };

  const calendarTable = [
    { date: 28, events: [{ title: 'Semester Begins', type: 'academic' }] },
    { date: 29, events: [{ title: 'Add/Drop Period', type: 'academic' }] },
    { date: 30, events: [{ title: 'Add/Drop Period', type: 'academic' }] }
  ];

  const handleAlert = (msg) => {
    alert(msg);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?\n\nAny unsaved changes will be lost.')) {
      alert('Logging out... Redirecting to login page.');
    }
  };

  const toggleNotifications = () => {
    alert('Showing Notifications:\n\n1. System Maintenance (High Priority)\n2. New User Registration Approval (5 pending)\n3. Storage Limit Warning (85% used)\n4. Security Alert: Multiple failed logins\n5. Backup Completed Successfully\n\nTotal Unread: 5 notifications');
  };

  const showDashboard = () => {
    setCurrentPage('dashboard');
    document.title = 'SWEHub - Admin Dashboard';
    if (window.innerWidth <= 992) setSidebarActive(false);
  };

  const showGenericPage = (title, icon) => {
    setCurrentPage(title.toLowerCase().replace(/ /g, '-'));
    document.title = `SWEHub - ${title}`;
    if (window.innerWidth <= 992) setSidebarActive(false);
  };

  // CSS Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    },
    background: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)',
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
      display: window.innerWidth <= 992 ? 'flex' : 'none',
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
      zIndex: 1000
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '28px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
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
      gap: '8px'
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
      gap: '8px'
    },
    dataTable: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    quickActionCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    alertItem: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px',
      background: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
      borderRadius: '12px',
      marginBottom: '12px',
      cursor: 'pointer'
    }
  };

  // Update mobile styles on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        document.querySelector('.mobile-toggle-style')?.style.setProperty('display', 'flex');
      } else {
        document.querySelector('.mobile-toggle-style')?.style.setProperty('display', 'none');
        setSidebarActive(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dashboard Render
  const renderDashboard = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Admin Dashboard</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>
            System administration and management portal - Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <div onClick={toggleNotifications} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <i className="fas fa-bell"></i>
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '12px', fontWeight: 700, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifications}</span>
            </div>
          </div>
          <div style={{ position: 'relative', width: '300px' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)' }}></i>
            <input 
              type="text" 
              placeholder="Search users, courses, records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchTerm && alert(`Searching for: "${searchTerm}"`)}
              style={{ width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', fontSize: '15px' }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {Object.entries(stats).map(([key, stat]) => (
          <div key={key} style={styles.statCard} onClick={() => handleAlert(`${key}: ${stat.value}`)}>
            <div style={{ width: '60px', height: '60px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.1))' }}>
              <i className={`fas fa-${key === 'totalStudents' ? 'users' : key === 'facultyMembers' ? 'chalkboard-teacher' : key === 'activeCourses' ? 'book' : 'tasks'}`}></i>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{stat.value}</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
            <div style={{ fontSize: '12px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', color: stat.positive ? '#10b981' : '#ef4444' }}>
              <i className={`fas fa-arrow-${stat.positive ? 'up' : 'down'}`}></i>
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Left Column */}
        <div>
          {/* System Overview */}
          <div style={styles.systemOverview}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>System Overview</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={styles.btnPrimary} onClick={() => handleAlert('Generating System Report...')}>
                  <i className="fas fa-file-export"></i> Generate Report
                </button>
                <button style={styles.btnSecondary} onClick={() => handleAlert('Dashboard Refreshed')}>
                  <i className="fas fa-sync-alt"></i> Refresh
                </button>
              </div>
            </div>

            {/* Performance Indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
              {performanceIndicators.map((indicator, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '15px', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleAlert(`${indicator.label}: ${indicator.value}`)}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '5px' }}>{indicator.value}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{indicator.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Quick Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {quickActions.map((action, idx) => (
                  <div key={idx} style={styles.quickActionCard} onClick={() => handleAlert(`${action.title}: ${action.desc}`)}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
                      <i className={`fas ${action.icon}`}></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{action.title}</h4>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={styles.systemOverview}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Recent Activity</h2>
              <a href="#" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => showGenericPage('Security Logs', 'fa-shield-alt')}>
                View All <i className="fas fa-arrow-right"></i>
              </a>
            </div>
            <table style={styles.dataTable}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Time</th>
                  <th style={{ textAlign: 'left', padding: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Action</th>
                  <th style={{ textAlign: 'left', padding: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={idx} style={{ cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => handleAlert(`${activity.user}: ${activity.action} - ${activity.details}`)}>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{activity.time}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{activity.user}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{activity.action}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{activity.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* System Alerts */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>System Alerts</h2>
            </div>
            {alerts.map((alert, idx) => (
              <div key={idx} style={styles.alertItem} onClick={() => handleAlert(`${alert.title}: ${alert.message}`)}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginRight: '15px', background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                  <i className={`fas ${alert.icon}`}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{alert.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{alert.message}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Admin Actions */}
          <div style={styles.systemOverview}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Quick Admin Actions</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {adminActions.map((action, idx) => (
                <div key={idx} style={styles.quickActionCard} onClick={() => showGenericPage(action.title, action.icon)}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
                    <i className={`fas ${action.icon}`}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{action.title}</h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{action.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div style={styles.systemOverview}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Upcoming Events</h2>
              <a href="#" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => showGenericPage('Academic Calendar', 'fa-calendar-alt')}>
                View Calendar <i className="fas fa-arrow-right"></i>
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingEvents.map((event, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', cursor: 'pointer' }} onClick={() => handleAlert(`${event.title}: ${event.date}`)}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'white' }}>{event.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{event.date}</div>
                  </div>
                  <div style={{ padding: '4px 8px', background: event.color === 'warning' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)', color: event.color === 'warning' ? '#f59e0b' : '#3b82f6', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                    {event.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Generic Page Render
  const renderGenericPage = (title, icon) => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{title}</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>Manage {title.toLowerCase()} settings and configurations</p>
        </div>
        <div style={{ position: 'relative', width: '300px' }}>
          <i className="fas fa-search" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)' }}></i>
          <input type="text" placeholder={`Search ${title.toLowerCase()}...`} style={{ width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', fontSize: '15px' }} />
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '100px 20px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' }}>
        <i className={`fas ${icon}`} style={{ fontSize: '64px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}></i>
        <h2 style={{ marginBottom: '10px', color: 'white' }}>{title} Module</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>This is a demo page. In a real application, this would show the {title.toLowerCase()} interface.</p>
        <button style={styles.btnPrimary} onClick={showDashboard}>
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
      </div>
    </>
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
        <aside style={styles.sidebar} id="sidebar">
          <div style={{ padding: '0 30px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⚙️</div>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>SWE<span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hub</span></h2>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Admin Dashboard</p>
              </div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>
            {[
              { id: 'dashboard', name: 'Dashboard', icon: 'fa-home' },
              { id: 'user-management', name: 'User Management', icon: 'fa-users' },
              { id: 'student-records', name: 'Student Records', icon: 'fa-graduation-cap' },
              { id: 'faculty-management', name: 'Faculty Management', icon: 'fa-chalkboard-teacher' },
              { id: 'results-grades', name: 'Results & Grades', icon: 'fa-chart-bar' },
              { id: 'course-catalog', name: 'Course Catalog', icon: 'fa-book' },
              { id: 'academic-calendar', name: 'Academic Calendar', icon: 'fa-calendar-alt' },
              { id: 'system-settings', name: 'System Settings', icon: 'fa-cogs' },
              { id: 'security-logs', name: 'Security & Logs', icon: 'fa-shield-alt' },
              { id: 'reports-export', name: 'Reports & Export', icon: 'fa-file-export' }
            ].map(item => (
              <div
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '12px 18px',
                  color: currentPage === item.id ? 'white' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  marginBottom: '6px',
                  transition: 'all 0.3s ease',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: currentPage === item.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                  boxShadow: currentPage === item.id ? '0 4px 15px rgba(102,126,234,0.3)' : 'none'
                }}
                onClick={() => {
                  if (item.id === 'dashboard') showDashboard();
                  else showGenericPage(item.name, item.icon);
                }}
              >
                <i className={`fas ${item.icon}`} style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                <span>{item.name}</span>
              </div>
            ))}
          </nav>

          <div style={{ padding: '20px 30px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '18px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 600, color: 'white' }}>AD</div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', color: 'white' }}>Admin Officer</h4>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>System Administrator</p>
              </div>
            </div>
            <button onClick={handleLogout} style={{ width: '100%', marginTop: '15px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={styles.mainContent}>
          {currentPage === 'dashboard' ? renderDashboard() : renderGenericPage(
            currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            currentPage === 'user-management' ? 'fa-users' :
            currentPage === 'student-records' ? 'fa-graduation-cap' :
            currentPage === 'faculty-management' ? 'fa-chalkboard-teacher' :
            currentPage === 'results-grades' ? 'fa-chart-bar' :
            currentPage === 'course-catalog' ? 'fa-book' :
            currentPage === 'academic-calendar' ? 'fa-calendar-alt' :
            currentPage === 'system-settings' ? 'fa-cogs' :
            currentPage === 'security-logs' ? 'fa-shield-alt' : 'fa-file-export'
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
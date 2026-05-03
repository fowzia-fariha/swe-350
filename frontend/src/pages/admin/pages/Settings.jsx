import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
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

  // Fetch settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/settings');
      const data = await response.json();
      
      data.forEach(setting => {
        const value = setting.setting_value === 'true' ? true : 
                     setting.setting_value === 'false' ? false : 
                     setting.setting_value;
        
        switch(setting.setting_key) {
          case 'grading_scale': setAcademicSettings(prev => ({...prev, gradingScale: value})); break;
          case 'passing_grade': setAcademicSettings(prev => ({...prev, passingGrade: value})); break;
          case 'auto_calculate_gpa': setAcademicSettings(prev => ({...prev, autoCalculateGPA: value})); break;
          case 'show_gpa_to_students': setAcademicSettings(prev => ({...prev, showGPAStudents: value})); break;
          case 'two_factor_auth': setSecuritySettings(prev => ({...prev, twoFactorAuth: value})); break;
          case 'password_expiry_days': setSecuritySettings(prev => ({...prev, passwordExpiry: value})); break;
          case 'auto_lock_sessions': setSecuritySettings(prev => ({...prev, autoLockSessions: value})); break;
          case 'failed_login_lockout': setSecuritySettings(prev => ({...prev, failedLoginLockout: value})); break;
          case 'email_notifications': setNotificationSettings(prev => ({...prev, emailNotifications: value})); break;
          case 'sms_alerts': setNotificationSettings(prev => ({...prev, smsAlerts: value})); break;
          case 'grade_publication_alerts': setNotificationSettings(prev => ({...prev, gradePublicationAlerts: value})); break;
          case 'system_maintenance_alerts': setNotificationSettings(prev => ({...prev, systemMaintenanceAlerts: value})); break;
          case 'auto_backup': setDataSettings(prev => ({...prev, autoBackup: value})); break;
          case 'backup_frequency': setDataSettings(prev => ({...prev, backupFrequency: value})); break;
          case 'data_retention_years': setDataSettings(prev => ({...prev, dataRetention: value})); break;
          case 'auto_archive_records': setDataSettings(prev => ({...prev, autoArchive: value})); break;
          case 'system_language': setRegionalSettings(prev => ({...prev, systemLanguage: value})); break;
          case 'date_format': setRegionalSettings(prev => ({...prev, dateFormat: value})); break;
          case 'time_zone': setRegionalSettings(prev => ({...prev, timeZone: value})); break;
          case 'currency_format': setRegionalSettings(prev => ({...prev, currencyFormat: value})); break;
          case 'email_service': setIntegrationSettings(prev => ({...prev, emailService: value})); break;
          case 'sms_gateway': setIntegrationSettings(prev => ({...prev, smsGateway: value})); break;
          case 'payment_gateway': setIntegrationSettings(prev => ({...prev, paymentGateway: value})); break;
          case 'api_access': setIntegrationSettings(prev => ({...prev, apiAccess: value})); break;
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Save all settings
  const handleSaveSettings = async () => {
    setSaving(true);
    const allSettings = {
      grading_scale: academicSettings.gradingScale,
      passing_grade: academicSettings.passingGrade,
      auto_calculate_gpa: academicSettings.autoCalculateGPA,
      show_gpa_to_students: academicSettings.showGPAStudents,
      two_factor_auth: securitySettings.twoFactorAuth,
      password_expiry_days: securitySettings.passwordExpiry,
      auto_lock_sessions: securitySettings.autoLockSessions,
      failed_login_lockout: securitySettings.failedLoginLockout,
      email_notifications: notificationSettings.emailNotifications,
      sms_alerts: notificationSettings.smsAlerts,
      grade_publication_alerts: notificationSettings.gradePublicationAlerts,
      system_maintenance_alerts: notificationSettings.systemMaintenanceAlerts,
      auto_backup: dataSettings.autoBackup,
      backup_frequency: dataSettings.backupFrequency,
      data_retention_years: dataSettings.dataRetention,
      auto_archive_records: dataSettings.autoArchive,
      system_language: regionalSettings.systemLanguage,
      date_format: regionalSettings.dateFormat,
      time_zone: regionalSettings.timeZone,
      currency_format: regionalSettings.currencyFormat,
      email_service: integrationSettings.emailService,
      sms_gateway: integrationSettings.smsGateway,
      payment_gateway: integrationSettings.paymentGateway,
      api_access: integrationSettings.apiAccess
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/settings/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: allSettings })
      });
      
      if (response.ok) {
        alert('All settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };
  
  const handleResetSettings = async () => {
    if (window.confirm('Reset all settings to default?')) {
      try {
        const response = await fetch('http://localhost:5000/api/admin/settings/reset', {
          method: 'POST'
        });
        
        if (response.ok) {
          alert('Settings reset to default values.');
          fetchSettings();
        } else {
          alert('Failed to reset settings');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  // Filter settings based on search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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
    saveButton: {
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
    resetButton: {
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
    settingsContainer: {
      background: '#1a1a2e',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    settingsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    settingsCard: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '20px'
    },
    settingsHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    settingsIcon: {
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      color: 'white'
    },
    settingsTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: 'white'
    },
    settingsDescription: {
      color: '#94a3b8',
      fontSize: '12px',
      marginBottom: '16px'
    },
    settingsOption: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    optionLabel: {
      fontSize: '13px',
      color: '#94a3b8'
    },
    selectInput: {
      padding: '8px 12px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '13px',
      cursor: 'pointer'
    },
    toggleSwitch: {
      position: 'relative',
      display: 'inline-block',
      width: '48px',
      height: '22px'
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
      backgroundColor: 'rgba(255,255,255,0.1)',
      transition: '.3s',
      borderRadius: '22px'
    },
    sliderBefore: {
      position: 'absolute',
      content: '""',
      height: '16px',
      width: '16px',
      left: '3px',
      bottom: '3px',
      backgroundColor: 'white',
      transition: '.3s',
      borderRadius: '50%'
    },
    saveFooter: {
      marginTop: '30px',
      textAlign: 'center',
      padding: '20px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    saveFooterButton: {
      padding: '12px 32px',
      fontSize: '16px'
    },
    noteText: {
      color: '#94a3b8',
      fontSize: '12px',
      marginTop: '12px'
    }
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <label style={styles.toggleSwitch}>
      <input type="checkbox" checked={checked} onChange={onChange} style={styles.toggleInput} />
      <span style={styles.slider}>
        <span style={styles.sliderBefore}></span>
      </span>
    </label>
  );

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ color: '#94a3b8' }}>Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>System Settings</h1>
          <p style={styles.pageSubtitle}>Configure system preferences and global settings</p>
        </div>
        <div style={styles.headerButtons}>
          <button onClick={handleResetSettings} style={styles.resetButton}>
            <i className="fas fa-undo"></i> Reset
          </button>
          <button onClick={handleSaveSettings} disabled={saving} style={styles.saveButton}>
            <i className="fas fa-save"></i> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search settings..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} style={styles.searchInput} />
        </div>
      </div>

      {/* Settings Grid */}
      <div style={styles.settingsContainer}>
        <div style={styles.settingsGrid}>
          {/* Academic Settings */}
          <div style={styles.settingsCard}>
            <div style={styles.settingsHeader}>
              <div style={styles.settingsIcon}><i className="fas fa-graduation-cap"></i></div>
              <div style={styles.settingsTitle}>Academic Settings</div>
            </div>
            <div style={styles.settingsDescription}>Configure grading scales and academic policies</div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Grading Scale</div>
              <select style={styles.selectInput} value={academicSettings.gradingScale} onChange={(e) => setAcademicSettings({...academicSettings, gradingScale: e.target.value})}>
                <option>4.0 Scale</option>
                <option>Percentage Scale</option>
                <option>Letter Grade Scale</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Passing Grade</div>
              <select style={styles.selectInput} value={academicSettings.passingGrade} onChange={(e) => setAcademicSettings({...academicSettings, passingGrade: e.target.value})}>
                <option>60%</option><option>65%</option><option>70%</option><option>50%</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Auto-calculate GPA</div>
              <ToggleSwitch checked={academicSettings.autoCalculateGPA} onChange={(e) => setAcademicSettings({...academicSettings, autoCalculateGPA: e.target.checked})} />
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Show GPA to Students</div>
              <ToggleSwitch checked={academicSettings.showGPAStudents} onChange={(e) => setAcademicSettings({...academicSettings, showGPAStudents: e.target.checked})} />
            </div>
          </div>

          {/* Security Settings */}
          <div style={styles.settingsCard}>
            <div style={styles.settingsHeader}>
              <div style={styles.settingsIcon}><i className="fas fa-shield-alt"></i></div>
              <div style={styles.settingsTitle}>Security Settings</div>
            </div>
            <div style={styles.settingsDescription}>Configure security and authentication policies</div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Two-Factor Authentication</div>
              <ToggleSwitch checked={securitySettings.twoFactorAuth} onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})} />
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Password Expiry (Days)</div>
              <select style={styles.selectInput} value={securitySettings.passwordExpiry} onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}>
                <option>30</option><option>60</option><option>90</option><option>180</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Auto-lock Inactive Sessions</div>
              <ToggleSwitch checked={securitySettings.autoLockSessions} onChange={(e) => setSecuritySettings({...securitySettings, autoLockSessions: e.target.checked})} />
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Failed Login Lockout</div>
              <ToggleSwitch checked={securitySettings.failedLoginLockout} onChange={(e) => setSecuritySettings({...securitySettings, failedLoginLockout: e.target.checked})} />
            </div>
          </div>

          {/* Notification Settings */}
          <div style={styles.settingsCard}>
            <div style={styles.settingsHeader}>
              <div style={styles.settingsIcon}><i className="fas fa-bell"></i></div>
              <div style={styles.settingsTitle}>Notification Settings</div>
            </div>
            <div style={styles.settingsDescription}>Configure email and alert preferences</div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Email Notifications</div>
              <ToggleSwitch checked={notificationSettings.emailNotifications} onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})} />
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>SMS Alerts</div>
              <ToggleSwitch checked={notificationSettings.smsAlerts} onChange={(e) => setNotificationSettings({...notificationSettings, smsAlerts: e.target.checked})} />
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Grade Publication Alerts</div>
              <ToggleSwitch checked={notificationSettings.gradePublicationAlerts} onChange={(e) => setNotificationSettings({...notificationSettings, gradePublicationAlerts: e.target.checked})} />
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>System Maintenance Alerts</div>
              <ToggleSwitch checked={notificationSettings.systemMaintenanceAlerts} onChange={(e) => setNotificationSettings({...notificationSettings, systemMaintenanceAlerts: e.target.checked})} />
            </div>
          </div>

          {/* Data Management */}
          <div style={styles.settingsCard}>
            <div style={styles.settingsHeader}>
              <div style={styles.settingsIcon}><i className="fas fa-database"></i></div>
              <div style={styles.settingsTitle}>Data Management</div>
            </div>
            <div style={styles.settingsDescription}>Configure backups and data retention</div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Auto Backup</div>
              <ToggleSwitch checked={dataSettings.autoBackup} onChange={(e) => setDataSettings({...dataSettings, autoBackup: e.target.checked})} />
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Backup Frequency</div>
              <select style={styles.selectInput} value={dataSettings.backupFrequency} onChange={(e) => setDataSettings({...dataSettings, backupFrequency: e.target.value})}>
                <option>Daily</option><option>Weekly</option><option>Monthly</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Data Retention (Years)</div>
              <select style={styles.selectInput} value={dataSettings.dataRetention} onChange={(e) => setDataSettings({...dataSettings, dataRetention: e.target.value})}>
                <option>5</option><option>7</option><option>10</option><option>Permanent</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Auto-Archive Records</div>
              <ToggleSwitch checked={dataSettings.autoArchive} onChange={(e) => setDataSettings({...dataSettings, autoArchive: e.target.checked})} />
            </div>
          </div>

          {/* Regional Settings */}
          <div style={styles.settingsCard}>
            <div style={styles.settingsHeader}>
              <div style={styles.settingsIcon}><i className="fas fa-globe"></i></div>
              <div style={styles.settingsTitle}>Regional Settings</div>
            </div>
            <div style={styles.settingsDescription}>Configure language and regional preferences</div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>System Language</div>
              <select style={styles.selectInput} value={regionalSettings.systemLanguage} onChange={(e) => setRegionalSettings({...regionalSettings, systemLanguage: e.target.value})}>
                <option>English (US)</option><option>Spanish</option><option>French</option><option>German</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Date Format</div>
              <select style={styles.selectInput} value={regionalSettings.dateFormat} onChange={(e) => setRegionalSettings({...regionalSettings, dateFormat: e.target.value})}>
                <option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Time Zone</div>
              <select style={styles.selectInput} value={regionalSettings.timeZone} onChange={(e) => setRegionalSettings({...regionalSettings, timeZone: e.target.value})}>
                <option>UTC-5 (EST)</option><option>UTC-8 (PST)</option><option>UTC+0 (GMT)</option><option>UTC+5 (PKT)</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Currency Format</div>
              <select style={styles.selectInput} value={regionalSettings.currencyFormat} onChange={(e) => setRegionalSettings({...regionalSettings, currencyFormat: e.target.value})}>
                <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option>
              </select>
            </div>
          </div>

          {/* Integration Settings */}
          <div style={styles.settingsCard}>
            <div style={styles.settingsHeader}>
              <div style={styles.settingsIcon}><i className="fas fa-plug"></i></div>
              <div style={styles.settingsTitle}>Integration Settings</div>
            </div>
            <div style={styles.settingsDescription}>Configure third-party integrations</div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Email Service</div>
              <select style={styles.selectInput} value={integrationSettings.emailService} onChange={(e) => setIntegrationSettings({...integrationSettings, emailService: e.target.value})}>
                <option>SMTP</option><option>SendGrid</option><option>Mailgun</option><option>Amazon SES</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>SMS Gateway</div>
              <select style={styles.selectInput} value={integrationSettings.smsGateway} onChange={(e) => setIntegrationSettings({...integrationSettings, smsGateway: e.target.value})}>
                <option>Twilio</option><option>Nexmo</option><option>Disabled</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>Payment Gateway</div>
              <select style={styles.selectInput} value={integrationSettings.paymentGateway} onChange={(e) => setIntegrationSettings({...integrationSettings, paymentGateway: e.target.value})}>
                <option>Stripe</option><option>PayPal</option><option>Authorize.net</option>
              </select>
            </div>
            
            <div style={styles.settingsOption}>
              <div style={styles.optionLabel}>API Access</div>
              <ToggleSwitch checked={integrationSettings.apiAccess} onChange={(e) => setIntegrationSettings({...integrationSettings, apiAccess: e.target.checked})} />
            </div>
          </div>
        </div>

        {/* Save Footer */}
        <div style={styles.saveFooter}>
          <button style={{...styles.saveButton, ...styles.saveFooterButton}} onClick={handleSaveSettings} disabled={saving}>
            <i className="fas fa-save"></i> {saving ? 'Saving...' : 'Save All System Settings'}
          </button>
          <p style={styles.noteText}>Changes will take effect immediately after saving.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
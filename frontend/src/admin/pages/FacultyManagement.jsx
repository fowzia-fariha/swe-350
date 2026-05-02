import React, { useState, useEffect } from 'react';

const FacultyManagement = () => {
  // --- State Management ---
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [currentPage, setCurrentPage] = useState(1);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount] = useState(4);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    email: '',
    password_hash: '',
    department: '',
    designation: '',
    specialization: '',
    qualification: '',
    joining_date: '',
    office_hours: '',
    research_area: '',
    phone_extension: '',
    office_location: '',
    website: '',
    bio: ''
  });

  // --- Fetch faculty from database ---
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/faculty');
      
      if (response.ok) {
        const data = await response.json();
        setFaculty(data);
      } else {
        console.error('Failed to fetch faculty');
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // --- Add Faculty ---
  const addFaculty = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in Name and Email');
      return;
    }

    const newFaculty = {
      user_id: formData.user_id || `FAC${Math.floor(Math.random() * 9000) + 1000}`,
      name: formData.name,
      email: formData.email,
      password_hash: 'temp123',
      department: formData.department,
      designation: formData.designation,
      specialization: formData.specialization,
      qualification: formData.qualification,
      phone_extension: formData.phone_extension
    };

    try {
      const response = await fetch('http://localhost:5000/api/admin/faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFaculty)
      });

      if (response.ok) {
        alert('Faculty added successfully!');
        setShowAddModal(false);
        resetForm();
        fetchFaculty();
      } else {
        const error = await response.json();
        alert(`Failed to add faculty: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding faculty:', error);
      alert('Error adding faculty. Please try again.');
    }
  };

  // --- Update Faculty ---
  const updateFaculty = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/faculty/${editingFaculty.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          department: formData.department,
          designation: formData.designation,
          specialization: formData.specialization,
          qualification: formData.qualification,
          phone_extension: formData.phone_extension
        })
      });

      if (response.ok) {
        alert('Faculty updated successfully!');
        setEditingFaculty(null);
        resetForm();
        fetchFaculty();
      } else {
        alert('Failed to update faculty');
      }
    } catch (error) {
      console.error('Error updating faculty:', error);
    }
  };

  // --- Delete Faculty ---
  const deleteFaculty = async (facultyId) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/faculty/${facultyId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          alert('Faculty deleted successfully!');
          fetchFaculty();
        } else {
          alert('Failed to delete faculty');
        }
      } catch (error) {
        console.error('Error deleting faculty:', error);
      }
    }
  };

  // --- Edit Faculty (open modal) ---
  const handleEditClick = (faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      name: faculty.name,
      department: faculty.department || '',
      designation: faculty.designation || '',
      specialization: faculty.specialization || '',
      qualification: faculty.qualification || '',
      phone_extension: faculty.phone_extension || '',
      email: faculty.email,
      user_id: faculty.user_id
    });
  };

  // --- Reset form ---
  const resetForm = () => {
    setFormData({
      user_id: '',
      name: '',
      email: '',
      password_hash: '',
      department: '',
      designation: '',
      specialization: '',
      qualification: '',
      joining_date: '',
      office_hours: '',
      research_area: '',
      phone_extension: '',
      office_location: '',
      website: '',
      bio: ''
    });
  };

  // --- Filtering & Pagination ---
  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All Departments' || f.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaculty = filteredFaculty.slice(startIndex, startIndex + itemsPerPage);
  const departments = [...new Set(faculty.map(f => f.department).filter(Boolean))];

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- Styles ---
  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif"
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
      padding: '30px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px'
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
    systemOverview: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '30px'
    },
    btnPrimary: {
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    btnSecondary: {
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    btnDanger: {
      padding: '6px 12px',
      borderRadius: '8px',
      fontWeight: 600,
      fontSize: '12px',
      cursor: 'pointer',
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ef4444',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    btnSuccess: {
      padding: '6px 12px',
      borderRadius: '8px',
      fontWeight: 600,
      fontSize: '12px',
      cursor: 'pointer',
      background: 'rgba(16, 185, 129, 0.15)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      color: '#10b981',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    filterSelect: {
      padding: '12px 20px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      color: 'white',
      fontSize: '14px',
      minWidth: '150px'
    },
    dataTable: {
      width: '100%',
      borderCollapse: 'collapse'
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
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContent: {
      background: 'rgba(30, 30, 50, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '32px',
      width: '90%',
      maxWidth: '600px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 700,
      color: 'white'
    },
    closeModal: {
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '24px',
      cursor: 'pointer'
    },
    formGroup: {
      marginBottom: '20px'
    },
    formLabel: {
      display: 'block',
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: 600,
      marginBottom: '8px',
      fontSize: '14px'
    },
    formInput: {
      width: '100%',
      padding: '12px 16px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      color: 'white',
      fontSize: '14px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    actionBtn: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.6)',
      cursor: 'pointer'
    },
    pageButton: {
      padding: '10px 20px',
      borderRadius: '10px',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white'
    },
    activePageButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '16px 20px',
      color: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '14px',
      marginBottom: '8px',
      transition: 'all 0.3s ease',
      fontWeight: 500,
      cursor: 'pointer'
    }
  };

  // Stats calculation
  const totalFaculty = faculty.length;
  const activeFaculty = faculty.filter(f => f.is_active !== false).length;
  const departmentsCount = departments.length;

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes orbFloat {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          25% { transform: translate(5%,-5%) scale(1.2) rotate(90deg); }
          50% { transform: translate(-5%,5%) scale(0.9) rotate(180deg); }
          75% { transform: translate(3%,-3%) scale(1.1) rotate(270deg); }
        }
        
        @media (max-width: 992px) {
          .main-content { margin-left: 0 !important; padding: 80px 20px 20px !important; }
          .mobile-menu-toggle { display: flex !important; }
        }
        
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .table-responsive { display: block; overflow-x: auto; }
        }
      `}</style>

      {/* Background Effects */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%), linear-gradient(180deg, #0a0a15 0%, #0f0f1e 50%, #1a1a2e 100%)', zIndex: -2 }}></div>
      <div style={{ position: 'fixed', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%)', top: '-30%', left: '-20%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', zIndex: -1 }}></div>
      <div style={{ position: 'fixed', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)', bottom: '-20%', right: '-15%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', animationDelay: '-12s', zIndex: -1 }}></div>

      {/* Mobile Menu Toggle */}
      <div 
        className="mobile-menu-toggle"
        onClick={() => setSidebarActive(!sidebarActive)}
        style={{ display: 'none', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '50px', height: '50px', borderRadius: '14px', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', cursor: 'pointer', position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}
      >
        <i className="fas fa-bars"></i>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside className="sidebar" style={styles.sidebar}>
          <div style={{ padding: '0 30px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)' }}>⚙️</div>
              <div><h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>SWE<span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hub</span></h2><p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>Admin Dashboard</p></div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: '0 20px' }}>
            {['Dashboard', 'User Management', 'Student Records', 'Faculty Management', 'Results & Grades', 'Course Catalog', 'Academic Calendar', 'System Settings', 'Security & Logs', 'Reports & Export'].map((item, idx) => (
              <div key={idx} style={{ ...styles.navItem, background: item === 'Faculty Management' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent', color: item === 'Faculty Management' ? 'white' : 'rgba(255, 255, 255, 0.6)', boxShadow: item === 'Faculty Management' ? '0 6px 20px rgba(102, 126, 234, 0.3)' : 'none' }} onClick={() => alert(`Navigate to ${item}`)}>
                <i className={`fas fa-${item === 'Dashboard' ? 'home' : item === 'User Management' ? 'users' : item === 'Student Records' ? 'graduation-cap' : item === 'Faculty Management' ? 'chalkboard-teacher' : item === 'Results & Grades' ? 'chart-bar' : item === 'Course Catalog' ? 'book' : item === 'Academic Calendar' ? 'calendar-alt' : item === 'System Settings' ? 'cogs' : item === 'Security & Logs' ? 'shield-alt' : 'file-export'}`} style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
                <span>{item}</span>
              </div>
            ))}
          </nav>
          <div style={{ padding: '30px 30px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 600, color: 'white' }}>AD</div>
              <div><h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'white' }}>Admin Officer</h4><p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>System Administrator</p></div>
            </div>
            <button onClick={() => { if(window.confirm('Logout?')) alert('Logging out...'); }} style={{ width: '100%', marginTop: '20px', padding: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <i className="fas fa-sign-out-alt"></i><span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content" style={styles.mainContent}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div><h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Faculty Management</h1><p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>Manage faculty members, their departments, and course assignments</p></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '300px' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)' }}></i>
                <input type="text" placeholder="Search faculty..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', color: 'white', fontSize: '15px' }} />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
            {[
              { number: totalFaculty, label: 'Total Faculty' },
              { number: activeFaculty, label: 'Active Faculty' },
              { number: departmentsCount, label: 'Departments' },
              { number: faculty.filter(f => f.course_count > 0).length, label: 'Teaching Faculty' }
            ].map((stat, idx) => (
              <div key={idx} style={styles.statCard}>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Faculty Management Section */}
          <div style={styles.systemOverview}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Faculty Directory</h2>
              <button onClick={() => { resetForm(); setShowAddModal(true); }} style={styles.btnPrimary}>
                <i className="fas fa-user-plus"></i>Add Faculty
              </button>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={styles.filterSelect}>
                <option>All Departments</option>
                {departments.map(dept => <option key={dept}>{dept}</option>)}
              </select>
              <button onClick={() => { setDepartmentFilter('All Departments'); setSearchTerm(''); }} style={styles.btnSecondary}>
                <i className="fas fa-filter"></i>Clear Filters
              </button>
            </div>

            {/* Faculty Table */}
            <div className="table-responsive">
              <table style={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Department</th>
                    <th style={styles.tableHeader}>Designation</th>
                    <th style={styles.tableHeader}>Specialization</th>
                    <th style={styles.tableHeader}>Courses</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.6)' }}>Loading faculty...</td></tr>
                  ) : paginatedFaculty.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.6)' }}>No faculty found</td></tr>
                  ) : (
                    paginatedFaculty.map((f) => (
                      <tr key={f.user_id || f.id}>
                        <td style={styles.tableCell}><strong>{f.name}</strong><br /><span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{f.email}</span></td>
                        <td style={styles.tableCell}>{f.department || '—'}</td>
                        <td style={styles.tableCell}>{f.designation || '—'}</td>
                        <td style={styles.tableCell}>{f.specialization || '—'}</td>
                        <td style={styles.tableCell}>{f.course_count || 0} courses</td>
                        <td style={styles.tableCell}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleEditClick(f)} style={styles.actionBtn}><i className="fas fa-edit"></i></button>
                            <button onClick={() => deleteFaculty(f.user_id)} style={{ ...styles.actionBtn, color: '#ef4444' }}><i className="fas fa-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFaculty.length)} of {filteredFaculty.length} faculty</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{ ...styles.pageButton, opacity: currentPage === 1 ? 0.5 : 1 }}>Prev</button>
                  {[1, 2, 3].filter(p => p <= totalPages).map(pageNum => (
                    <button key={pageNum} onClick={() => goToPage(pageNum)} style={{ ...styles.pageButton, ...(currentPage === pageNum ? styles.activePageButton : {}) }}>{pageNum}</button>
                  ))}
                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ ...styles.pageButton, opacity: currentPage === totalPages ? 0.5 : 1 }}>Next</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingFaculty) && (
        <div style={styles.modalOverlay} onClick={() => { setShowAddModal(false); setEditingFaculty(null); resetForm(); }}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}</h3>
              <button style={styles.closeModal} onClick={() => { setShowAddModal(false); setEditingFaculty(null); resetForm(); }}>×</button>
            </div>
            
            <div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Full Name *</label>
                <input type="text" style={styles.formInput} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Dr. Sarah Johnson" />
              </div>
              
              {!editingFaculty && (
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email *</label>
                  <input type="email" style={styles.formInput} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="faculty@university.edu" />
                </div>
              )}
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Department</label>
                  <input type="text" style={styles.formInput} value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} placeholder="Computer Science" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Designation</label>
                  <input type="text" style={styles.formInput} value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} placeholder="Professor / Associate Professor" />
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Specialization</label>
                  <input type="text" style={styles.formInput} value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} placeholder="e.g., AI, Databases, Networks" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Qualification</label>
                  <input type="text" style={styles.formInput} value={formData.qualification} onChange={(e) => setFormData({...formData, qualification: e.target.value})} placeholder="Ph.D., M.S." />
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Phone Extension</label>
                <input type="text" style={styles.formInput} value={formData.phone_extension} onChange={(e) => setFormData({...formData, phone_extension: e.target.value})} placeholder="e.g., ext. 1234" />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button onClick={() => { setShowAddModal(false); setEditingFaculty(null); resetForm(); }} style={styles.btnSecondary}>Cancel</button>
                <button onClick={editingFaculty ? updateFaculty : addFaculty} style={styles.btnPrimary}>
                  {editingFaculty ? 'Update Faculty' : 'Create Faculty'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;
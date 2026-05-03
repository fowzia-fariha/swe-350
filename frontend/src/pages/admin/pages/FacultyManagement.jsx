import React, { useState, useEffect } from 'react';

const FacultyManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [currentPage, setCurrentPage] = useState(1);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    specialization: '',
    qualification: '',
    phone_extension: ''
  });

  // Fetch faculty from backend (users with role = 'teacher' joined with faculty table)
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/faculty');
      if (response.ok) {
        const data = await response.json();
        setFaculty(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Add Faculty
  const addFaculty = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill Name and Email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Faculty added successfully!');
        setShowAddModal(false);
        setFormData({ name: '', email: '', department: '', designation: '', specialization: '', qualification: '', phone_extension: '' });
        fetchFaculty();
      } else {
        const error = await response.json();
        alert(`Failed to add faculty: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Error adding faculty');
    }
  };

  // Update Faculty
  const updateFaculty = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/faculty/${editingFaculty.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Faculty updated successfully!');
        setEditingFaculty(null);
        setFormData({ name: '', email: '', department: '', designation: '', specialization: '', qualification: '', phone_extension: '' });
        fetchFaculty();
      } else {
        alert('Failed to update faculty');
      }
    } catch (error) {
      alert('Error updating faculty');
    }
  };

  // Delete Faculty
  const deleteFaculty = async (facultyId) => {
    if (window.confirm('Delete this faculty member? This will also remove their user account.')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/faculty/${facultyId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Faculty deleted successfully!');
          fetchFaculty();
        } else {
          alert('Failed to delete faculty');
        }
      } catch (error) {
        alert('Error deleting faculty');
      }
    }
  };

  const openEditModal = (faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department || '',
      designation: faculty.designation || '',
      specialization: faculty.specialization || '',
      qualification: faculty.qualification || '',
      phone_extension: faculty.phone_extension || ''
    });
  };

  // Filtering
  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.user_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All Departments' || f.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaculty = filteredFaculty.slice(startIndex, startIndex + itemsPerPage);
  const totalFaculty = faculty.length;
  const departments = [...new Set(faculty.map(f => f.department).filter(Boolean))];

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
    activePageButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContent: {
      background: '#1a1a2e',
      borderRadius: '20px',
      padding: '28px',
      width: '500px',
      maxWidth: '90%',
      border: '1px solid rgba(102,126,234,0.3)'
    },
    modalTitle: {
      fontSize: '22px',
      fontWeight: 600,
      color: 'white',
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      color: '#94a3b8',
      fontSize: '13px'
    },
    formInput: {
      width: '100%',
      padding: '12px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '10px',
      color: 'white',
      outline: 'none'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '24px'
    },
    cancelButton: {
      padding: '10px 20px',
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '10px',
      color: '#94a3b8',
      cursor: 'pointer'
    },
    submitButton: {
      padding: '10px 20px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      cursor: 'pointer',
      fontWeight: 500
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ color: '#94a3b8' }}>Loading faculty...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Faculty Management</h1>
          <p style={styles.pageSubtitle}>Manage faculty members, departments, and course assignments</p>
        </div>
        <button onClick={() => { setShowAddModal(true); setEditingFaculty(null); setFormData({ name: '', email: '', department: '', designation: '', specialization: '', qualification: '', phone_extension: '' }); }} style={styles.addButton}>
          <i className="fas fa-user-plus"></i> Add Faculty
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalFaculty}</div>
          <div style={styles.statLabel}>Total Faculty</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{departments.length}</div>
          <div style={styles.statLabel}>Departments</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{faculty.filter(f => f.course_count > 0).length}</div>
          <div style={styles.statLabel}>Teaching Faculty</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{faculty.filter(f => f.qualification).length}</div>
          <div style={styles.statLabel}>Qualified</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search faculty by name, email or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
        </div>
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={styles.selectInput}>
          <option>All Departments</option>
          {departments.map(dept => <option key={dept}>{dept}</option>)}
        </select>
        <button onClick={() => { setDepartmentFilter('All Departments'); setSearchTerm(''); setCurrentPage(1); }} style={styles.clearButton}>
          <i className="fas fa-filter"></i> Clear Filters
        </button>
      </div>

      {/* Faculty Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableTitle}>Faculty Directory</h2>
        
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Faculty ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Designation</th>
                <th style={styles.th}>Specialization</th>
                <th style={styles.th}>Courses</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFaculty.map((f) => (
                <tr key={f.user_id}>
                  <td style={styles.td}>{f.user_id}</td>
                  <td style={styles.tdName}>{f.name}</td>
                  <td style={styles.td}>{f.email}</td>
                  <td style={styles.td}>{f.department || '—'}</td>
                  <td style={styles.td}>{f.designation || '—'}</td>
                  <td style={styles.td}>{f.specialization || '—'}</td>
                  <td style={styles.td}>{f.course_count || 0} courses</td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button style={styles.actionBtn} onClick={() => openEditModal(f)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button style={styles.actionBtn} onClick={() => deleteFaculty(f.user_id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                   </td>
                 </tr>
              ))}
              {paginatedFaculty.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No faculty members found
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
              Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredFaculty.length)} of {filteredFaculty.length} faculty
            </div>
            <div style={styles.paginationButtons}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
                disabled={currentPage === 1}
                style={currentPage === 1 ? { ...styles.pageButton, opacity: 0.5, cursor: 'not-allowed' } : styles.pageButton}
              >
                Previous
              </button>
              {[1, 2, 3].filter(p => p <= totalPages).map(pageNum => (
                <button 
                  key={pageNum} 
                  onClick={() => setCurrentPage(pageNum)} 
                  style={currentPage === pageNum ? styles.activePageButton : styles.pageButton}
                >
                  {pageNum}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} 
                disabled={currentPage === totalPages}
                style={currentPage === totalPages ? { ...styles.pageButton, opacity: 0.5, cursor: 'not-allowed' } : styles.pageButton}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingFaculty) && (
        <div style={styles.modalOverlay} onClick={() => { setShowAddModal(false); setEditingFaculty(null); }}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Full Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Dr. Sarah Johnson" style={styles.formInput} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="faculty@university.edu" style={styles.formInput} />
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Department</label>
                <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} placeholder="Computer Science" style={styles.formInput} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Designation</label>
                <input type="text" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} placeholder="Professor / Associate Professor" style={styles.formInput} />
              </div>
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Specialization</label>
                <input type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} placeholder="e.g., AI, Databases, Networks" style={styles.formInput} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Qualification</label>
                <input type="text" value={formData.qualification} onChange={(e) => setFormData({...formData, qualification: e.target.value})} placeholder="Ph.D., M.S., M.Sc." style={styles.formInput} />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Extension</label>
              <input type="text" value={formData.phone_extension} onChange={(e) => setFormData({...formData, phone_extension: e.target.value})} placeholder="e.g., ext. 1234" style={styles.formInput} />
            </div>
            
            <div style={styles.modalButtons}>
              <button onClick={() => { setShowAddModal(false); setEditingFaculty(null); }} style={styles.cancelButton}>Cancel</button>
              <button onClick={editingFaculty ? updateFaculty : addFaculty} style={styles.submitButton}>
                {editingFaculty ? 'Update Faculty' : 'Create Faculty'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;
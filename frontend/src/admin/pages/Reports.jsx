import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [generatingId, setGeneratingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'student-enrollment',
    config: {}
  });

  // Fetch reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Create report
  const createReport = async () => {
    if (!formData.title) {
      alert('Please enter report title');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Report created successfully!');
        setShowAddModal(false);
        setFormData({ title: '', description: '', type: 'student-enrollment', config: {} });
        fetchReports();
      } else {
        alert('Failed to create report');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Update report
  const updateReport = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/reports/${selectedReport.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Report updated successfully!');
        setShowEditModal(false);
        setFormData({ title: '', description: '', type: 'student-enrollment', config: {} });
        fetchReports();
      } else {
        alert('Failed to update report');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Delete report
  const deleteReport = async (id) => {
    if (window.confirm('Delete this report?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/reports/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Report deleted successfully!');
          fetchReports();
        } else {
          alert('Failed to delete report');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  // Generate report
  const generateReport = async (id, format) => {
    setGeneratingId(id);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/reports/${id}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format })
      });
      const data = await response.json();
      
      if (response.ok) {
        alert(`Report generated successfully in ${format.toUpperCase()} format!`);
      } else {
        alert('Failed to generate report');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setGeneratingId(null);
    }
  };

  const openEditModal = (report) => {
    setSelectedReport(report);
    setFormData({
      title: report.title,
      description: report.description || '',
      type: report.type,
      config: report.config || {}
    });
    setShowEditModal(true);
  };

  const getIconForType = (type) => {
    const icons = {
      'student-enrollment': 'fa-users',
      'academic-performance': 'fa-chart-bar',
      'graduation-analysis': 'fa-graduation-cap',
      'course-evaluation': 'fa-book',
      'faculty-workload': 'fa-user-tie',
      'security-audit': 'fa-shield-alt',
      'system-usage': 'fa-chart-line'
    };
    return icons[type] || 'fa-file-alt';
  };

  // Filter reports
  const filteredReports = reports.filter(report =>
    report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

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
    createButton: {
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
    clearButton: {
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '10px',
      cursor: 'pointer'
    },
    reportsContainer: {
      background: '#1a1a2e',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '20px',
      color: 'white'
    },
    reportsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    },
    reportCard: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '20px',
      transition: 'all 0.3s'
    },
    reportIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      color: 'white',
      marginBottom: '15px'
    },
    reportTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: 'white',
      marginBottom: '8px'
    },
    reportDescription: {
      color: '#94a3b8',
      fontSize: '13px',
      marginBottom: '12px',
      lineHeight: 1.4
    },
    reportType: {
      fontSize: '11px',
      color: '#94a3b8',
      marginBottom: '12px'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    exportBtn: {
      padding: '6px 10px',
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '6px',
      color: '#94a3b8',
      fontSize: '11px',
      cursor: 'pointer'
    },
    editBtn: {
      padding: '6px 10px',
      background: 'rgba(59,130,246,0.15)',
      border: '1px solid rgba(59,130,246,0.3)',
      borderRadius: '6px',
      color: '#3b82f6',
      fontSize: '11px',
      cursor: 'pointer'
    },
    deleteBtn: {
      padding: '6px 10px',
      background: 'rgba(239,68,68,0.15)',
      border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: '6px',
      color: '#ef4444',
      fontSize: '11px',
      cursor: 'pointer'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '24px',
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
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    closeModal: {
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      fontSize: '24px',
      cursor: 'pointer'
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
    formTextarea: {
      width: '100%',
      padding: '12px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '10px',
      color: 'white',
      resize: 'vertical',
      outline: 'none'
    },
    formSelect: {
      width: '100%',
      padding: '12px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '10px',
      color: 'white',
      outline: 'none'
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

  const totalReports = reports.length;
  const activeReports = reports.filter(r => r.is_active === 1).length;

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ color: '#94a3b8' }}>Loading reports...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Reports & Export</h1>
          <p style={styles.pageSubtitle}>Generate reports and export system data</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={styles.createButton}>
          <i className="fas fa-plus"></i> Create Report
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalReports}</div>
          <div style={styles.statLabel}>Total Reports</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{activeReports}</div>
          <div style={styles.statLabel}>Active Reports</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>85%</div>
          <div style={styles.statLabel}>Automated</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>12</div>
          <div style={styles.statLabel}>Scheduled</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
        </div>
        <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} style={styles.clearButton}>
          <i className="fas fa-filter"></i> Clear Filters
        </button>
      </div>

      {/* Reports Grid */}
      <div style={styles.reportsContainer}>
        <h2 style={styles.sectionTitle}>Available Reports</h2>
        
        {reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <i className="fas fa-file-alt" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></i>
            <p>No reports available. Click "Create Report" to add one.</p>
          </div>
        ) : (
          <div style={styles.reportsGrid}>
            {paginatedReports.map((report) => (
              <div key={report.id} style={styles.reportCard}>
                <div style={styles.reportIcon}>
                  <i className={`fas ${getIconForType(report.type)}`}></i>
                </div>
                <div style={styles.reportTitle}>{report.title}</div>
                <div style={styles.reportDescription}>{report.description || 'No description available'}</div>
                <div style={styles.reportType}>Type: {report.type}</div>
                <div style={styles.actionButtons}>
                  <button style={styles.exportBtn} onClick={() => generateReport(report.id, 'pdf')} disabled={generatingId === report.id}>PDF</button>
                  <button style={styles.exportBtn} onClick={() => generateReport(report.id, 'excel')} disabled={generatingId === report.id}>Excel</button>
                  <button style={styles.exportBtn} onClick={() => generateReport(report.id, 'csv')} disabled={generatingId === report.id}>CSV</button>
                  <button style={styles.editBtn} onClick={() => openEditModal(report)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => deleteReport(report.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <div style={styles.paginationText}>
              Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredReports.length)} of {filteredReports.length} reports
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

      {/* Add Report Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Report</h2>
              <button style={styles.closeModal} onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Enter report title" style={styles.formInput} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Description</label>
              <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Enter description" style={styles.formTextarea} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Report Type</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={styles.formSelect}>
                <option value="student-enrollment">Student Enrollment</option>
                <option value="academic-performance">Academic Performance</option>
                <option value="graduation-analysis">Graduation Analysis</option>
                <option value="course-evaluation">Course Evaluation</option>
                <option value="faculty-workload">Faculty Workload</option>
                <option value="security-audit">Security Audit</option>
                <option value="system-usage">System Usage</option>
              </select>
            </div>
            
            <div style={styles.modalButtons}>
              <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>Cancel</button>
              <button onClick={createReport} style={styles.submitButton}>Create Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Report Modal */}
      {showEditModal && selectedReport && (
        <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit Report</h2>
              <button style={styles.closeModal} onClick={() => setShowEditModal(false)}>×</button>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={styles.formInput} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Description</label>
              <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={styles.formTextarea} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Report Type</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={styles.formSelect}>
                <option value="student-enrollment">Student Enrollment</option>
                <option value="academic-performance">Academic Performance</option>
                <option value="graduation-analysis">Graduation Analysis</option>
                <option value="course-evaluation">Course Evaluation</option>
                <option value="faculty-workload">Faculty Workload</option>
                <option value="security-audit">Security Audit</option>
                <option value="system-usage">System Usage</option>
              </select>
            </div>
            
            <div style={styles.modalButtons}>
              <button onClick={() => setShowEditModal(false)} style={styles.cancelButton}>Cancel</button>
              <button onClick={updateReport} style={styles.submitButton}>Update Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
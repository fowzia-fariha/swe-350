import React, { useState, useEffect } from 'react';

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    grade: '',
    semester: ''
  });

  // Fetch results
  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/results');
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Add Result
  const addResult = async () => {
    if (!formData.student_id || !formData.course_id || !formData.grade) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Result added successfully!');
        setShowAddModal(false);
        setFormData({ student_id: '', course_id: '', grade: '', semester: '' });
        fetchResults();
      } else {
        alert('Failed to add result');
      }
    } catch (error) {
      alert('Error adding result');
    }
  };

  // Delete Result
  const deleteResult = async (id) => {
    if (window.confirm('Delete this result?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/results/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Result deleted successfully!');
          fetchResults();
        } else {
          alert('Failed to delete result');
        }
      } catch (error) {
        alert('Error deleting result');
      }
    }
  };

  // Filter results
  const filteredResults = results.filter(r => {
    const matchesSearch = (r.student_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.course_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, startIndex + itemsPerPage);

  const getGradeColor = (grade) => {
    if (!grade) return '#94a3b8';
    if (grade === 'A+' || grade === 'A' || grade === 'A-') return '#10b981';
    if (grade === 'B+' || grade === 'B' || grade === 'B-') return '#3b82f6';
    if (grade === 'C+' || grade === 'C' || grade === 'C-') return '#f59e0b';
    return '#ef4444';
  };

  const getStatusColor = (status) => {
    return status === 'pending' ? '#f59e0b' : '#10b981';
  };

  const totalResults = results.length;
  const passedCount = results.filter(r => r.grade && r.grade !== 'F' && r.grade !== 'D').length;
  const pendingCount = results.filter(r => r.status === 'pending').length;

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
    gradeBadge: (grade) => ({
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
      background: `${getGradeColor(grade)}20`,
      color: getGradeColor(grade),
      display: 'inline-block'
    }),
    statusBadge: (status) => ({
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
      background: `${getStatusColor(status)}20`,
      color: getStatusColor(status),
      display: 'inline-block'
    }),
    actionBtn: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.2)',
      color: '#ef4444',
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
          <div style={{ color: '#94a3b8' }}>Loading results...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Results & Grades</h1>
          <p style={styles.pageSubtitle}>Manage student grades and academic results</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={styles.addButton}>
          <i className="fas fa-plus"></i> Add Result
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalResults}</div>
          <div style={styles.statLabel}>Total Results</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{passedCount}</div>
          <div style={styles.statLabel}>Passed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{pendingCount}</div>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{results.length}</div>
          <div style={styles.statLabel}>Records</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search by student or course..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
        </div>
        <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} style={styles.clearButton}>
          <i className="fas fa-filter"></i> Clear Filters
        </button>
      </div>

      {/* Results Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableTitle}>Student Grades</h2>
        
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Grade</th>
                <th style={styles.th}>Semester</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResults.map((r) => (
                <tr key={r.id}>
                  <td style={styles.td}>{r.student_name}</td>
                  <td style={styles.td}>{r.course_name}</td>
                  <td style={styles.td}>
                    <span style={styles.gradeBadge(r.grade)}>{r.grade}</span>
                  </td>
                  <td style={styles.td}>{r.semester || '—'}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(r.status)}>{r.status || 'published'}</span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.actionBtn} onClick={() => deleteResult(r.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedResults.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <div style={styles.paginationText}>
              Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredResults.length)} of {filteredResults.length} results
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

      {/* Add Result Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Add New Result</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Student ID *</label>
              <input type="text" value={formData.student_id} onChange={(e) => setFormData({...formData, student_id: e.target.value})} placeholder="e.g., ST2023001" style={styles.formInput} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Course ID *</label>
              <input type="text" value={formData.course_id} onChange={(e) => setFormData({...formData, course_id: e.target.value})} placeholder="e.g., CS301" style={styles.formInput} />
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Grade *</label>
                <select value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} style={styles.formInput}>
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Semester</label>
                <input type="text" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} placeholder="e.g., Fall 2025" style={styles.formInput} />
              </div>
            </div>
            
            <div style={styles.modalButtons}>
              <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>Cancel</button>
              <button onClick={addResult} style={styles.submitButton}>Create Result</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
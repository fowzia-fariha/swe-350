// // // import React, { useState, useEffect } from 'react';

// // // const Results = () => {
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [results, setResults] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showAddModal, setShowAddModal] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     student_id: '',
// // //     course_id: '',
// // //     grade: '',
// // //     semester: ''
// // //   });

// // //   // Fetch results
// // //   const fetchResults = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await fetch('http://localhost:5000/api/admin/results');
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setResults(data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchResults();
// // //   }, []);

// // //   // Add Result
// // //   const addResult = async () => {
// // //     if (!formData.student_id || !formData.course_id || !formData.grade) {
// // //       alert('Please fill all required fields');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/admin/results', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(formData)
// // //       });

// // //       if (response.ok) {
// // //         alert('Result added successfully!');
// // //         setShowAddModal(false);
// // //         setFormData({ student_id: '', course_id: '', grade: '', semester: '' });
// // //         fetchResults();
// // //       } else {
// // //         alert('Failed to add result');
// // //       }
// // //     } catch (error) {
// // //       alert('Error adding result');
// // //     }
// // //   };

// // //   // Delete Result
// // //   const deleteResult = async (id) => {
// // //     if (window.confirm('Delete this result?')) {
// // //       try {
// // //         const response = await fetch(`http://localhost:5000/api/admin/results/${id}`, {
// // //           method: 'DELETE'
// // //         });
// // //         if (response.ok) {
// // //           alert('Result deleted successfully!');
// // //           fetchResults();
// // //         } else {
// // //           alert('Failed to delete result');
// // //         }
// // //       } catch (error) {
// // //         alert('Error deleting result');
// // //       }
// // //     }
// // //   };

// // //   // Filter results
// // //   const filteredResults = results.filter(r => {
// // //     const matchesSearch = (r.student_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //                           (r.course_name || '').toLowerCase().includes(searchTerm.toLowerCase());
// // //     return matchesSearch;
// // //   });

// // //   // Pagination
// // //   const itemsPerPage = 5;
// // //   const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
// // //   const startIndex = (currentPage - 1) * itemsPerPage;
// // //   const paginatedResults = filteredResults.slice(startIndex, startIndex + itemsPerPage);

// // //   const getGradeColor = (grade) => {
// // //     if (!grade) return '#94a3b8';
// // //     if (grade === 'A+' || grade === 'A' || grade === 'A-') return '#10b981';
// // //     if (grade === 'B+' || grade === 'B' || grade === 'B-') return '#3b82f6';
// // //     if (grade === 'C+' || grade === 'C' || grade === 'C-') return '#f59e0b';
// // //     return '#ef4444';
// // //   };

// // //   const getStatusColor = (status) => {
// // //     return status === 'pending' ? '#f59e0b' : '#10b981';
// // //   };

// // //   const totalResults = results.length;
// // //   const passedCount = results.filter(r => r.grade && r.grade !== 'F' && r.grade !== 'D').length;
// // //   const pendingCount = results.filter(r => r.status === 'pending').length;

// // //   const styles = {
// // //     container: {
// // //       minHeight: '100vh',
// // //       background: '#0a0a15',
// // //       fontFamily: "'Inter', sans-serif",
// // //       color: 'white'
// // //     },
// // //     header: {
// // //       display: 'flex',
// // //       justifyContent: 'space-between',
// // //       alignItems: 'center',
// // //       marginBottom: '30px',
// // //       flexWrap: 'wrap',
// // //       gap: '15px'
// // //     },
// // //     pageTitle: {
// // //       fontSize: '28px',
// // //       fontWeight: 700,
// // //       background: 'linear-gradient(135deg, #667eea, #764ba2)',
// // //       WebkitBackgroundClip: 'text',
// // //       WebkitTextFillColor: 'transparent',
// // //       marginBottom: '4px'
// // //     },
// // //     pageSubtitle: {
// // //       color: '#94a3b8',
// // //       fontSize: '14px'
// // //     },
// // //     addButton: {
// // //       background: 'linear-gradient(135deg, #667eea, #764ba2)',
// // //       color: 'white',
// // //       border: 'none',
// // //       padding: '10px 20px',
// // //       borderRadius: '10px',
// // //       fontWeight: 500,
// // //       cursor: 'pointer',
// // //       display: 'flex',
// // //       alignItems: 'center',
// // //       gap: '8px'
// // //     },
// // //     statsGrid: {
// // //       display: 'grid',
// // //       gridTemplateColumns: 'repeat(4, 1fr)',
// // //       gap: '20px',
// // //       marginBottom: '30px'
// // //     },
// // //     statCard: {
// // //       background: '#1a1a2e',
// // //       borderRadius: '16px',
// // //       padding: '20px',
// // //       textAlign: 'center',
// // //       border: '1px solid rgba(255,255,255,0.05)'
// // //     },
// // //     statValue: {
// // //       fontSize: '28px',
// // //       fontWeight: 700,
// // //       color: '#667eea'
// // //     },
// // //     statLabel: {
// // //       fontSize: '13px',
// // //       color: '#94a3b8',
// // //       marginTop: '4px'
// // //     },
// // //     filters: {
// // //       display: 'flex',
// // //       gap: '12px',
// // //       marginBottom: '20px',
// // //       flexWrap: 'wrap',
// // //       alignItems: 'center'
// // //     },
// // //     searchWrapper: {
// // //       position: 'relative'
// // //     },
// // //     searchIcon: {
// // //       position: 'absolute',
// // //       left: '12px',
// // //       top: '50%',
// // //       transform: 'translateY(-50%)',
// // //       color: '#667eea',
// // //       fontSize: '12px'
// // //     },
// // //     searchInput: {
// // //       padding: '10px 12px 10px 32px',
// // //       background: '#1a1a2e',
// // //       border: '1px solid rgba(102,126,234,0.3)',
// // //       borderRadius: '10px',
// // //       color: 'white',
// // //       width: '250px',
// // //       outline: 'none'
// // //     },
// // //     clearButton: {
// // //       background: '#1a1a2e',
// // //       border: '1px solid rgba(102,126,234,0.3)',
// // //       color: 'white',
// // //       padding: '10px 20px',
// // //       borderRadius: '10px',
// // //       cursor: 'pointer'
// // //     },
// // //     tableContainer: {
// // //       background: '#1a1a2e',
// // //       borderRadius: '20px',
// // //       padding: '24px',
// // //       border: '1px solid rgba(255,255,255,0.05)'
// // //     },
// // //     tableTitle: {
// // //       fontSize: '18px',
// // //       fontWeight: 600,
// // //       marginBottom: '20px',
// // //       color: 'white'
// // //     },
// // //     tableWrapper: {
// // //       overflowX: 'auto'
// // //     },
// // //     table: {
// // //       width: '100%',
// // //       borderCollapse: 'collapse'
// // //     },
// // //     th: {
// // //       textAlign: 'left',
// // //       padding: '12px',
// // //       color: '#94a3b8',
// // //       fontWeight: 500,
// // //       fontSize: '13px',
// // //       borderBottom: '1px solid rgba(255,255,255,0.1)'
// // //     },
// // //     td: {
// // //       padding: '12px',
// // //       fontSize: '13px',
// // //       borderBottom: '1px solid rgba(255,255,255,0.05)'
// // //     },
// // //     gradeBadge: (grade) => ({
// // //       padding: '4px 12px',
// // //       borderRadius: '20px',
// // //       fontSize: '12px',
// // //       fontWeight: 600,
// // //       background: `${getGradeColor(grade)}20`,
// // //       color: getGradeColor(grade),
// // //       display: 'inline-block'
// // //     }),
// // //     statusBadge: (status) => ({
// // //       padding: '4px 12px',
// // //       borderRadius: '20px',
// // //       fontSize: '12px',
// // //       fontWeight: 600,
// // //       background: `${getStatusColor(status)}20`,
// // //       color: getStatusColor(status),
// // //       display: 'inline-block'
// // //     }),
// // //     actionBtn: {
// // //       width: '32px',
// // //       height: '32px',
// // //       borderRadius: '8px',
// // //       background: 'rgba(239,68,68,0.1)',
// // //       border: '1px solid rgba(239,68,68,0.2)',
// // //       color: '#ef4444',
// // //       cursor: 'pointer',
// // //       display: 'inline-flex',
// // //       alignItems: 'center',
// // //       justifyContent: 'center'
// // //     },
// // //     pagination: {
// // //       display: 'flex',
// // //       justifyContent: 'space-between',
// // //       alignItems: 'center',
// // //       marginTop: '20px',
// // //       paddingTop: '16px',
// // //       borderTop: '1px solid rgba(255,255,255,0.05)'
// // //     },
// // //     paginationText: {
// // //       color: '#94a3b8',
// // //       fontSize: '13px'
// // //     },
// // //     paginationButtons: {
// // //       display: 'flex',
// // //       gap: '8px'
// // //     },
// // //     pageButton: {
// // //       padding: '8px 16px',
// // //       background: '#1a1a2e',
// // //       border: '1px solid rgba(102,126,234,0.3)',
// // //       borderRadius: '8px',
// // //       color: '#94a3b8',
// // //       cursor: 'pointer'
// // //     },
// // //     activePageButton: {
// // //       background: 'linear-gradient(135deg, #667eea, #764ba2)',
// // //       color: 'white',
// // //       border: 'none'
// // //     },
// // //     modalOverlay: {
// // //       position: 'fixed',
// // //       top: 0,
// // //       left: 0,
// // //       right: 0,
// // //       bottom: 0,
// // //       background: 'rgba(0,0,0,0.8)',
// // //       backdropFilter: 'blur(10px)',
// // //       zIndex: 1000,
// // //       display: 'flex',
// // //       alignItems: 'center',
// // //       justifyContent: 'center'
// // //     },
// // //     modalContent: {
// // //       background: '#1a1a2e',
// // //       borderRadius: '20px',
// // //       padding: '28px',
// // //       width: '500px',
// // //       maxWidth: '90%',
// // //       border: '1px solid rgba(102,126,234,0.3)'
// // //     },
// // //     modalTitle: {
// // //       fontSize: '22px',
// // //       fontWeight: 600,
// // //       color: 'white',
// // //       marginBottom: '20px'
// // //     },
// // //     formGroup: {
// // //       marginBottom: '16px'
// // //     },
// // //     formLabel: {
// // //       display: 'block',
// // //       marginBottom: '8px',
// // //       color: '#94a3b8',
// // //       fontSize: '13px'
// // //     },
// // //     formInput: {
// // //       width: '100%',
// // //       padding: '12px',
// // //       background: '#0a0a15',
// // //       border: '1px solid rgba(102,126,234,0.3)',
// // //       borderRadius: '10px',
// // //       color: 'white',
// // //       outline: 'none'
// // //     },
// // //     formRow: {
// // //       display: 'grid',
// // //       gridTemplateColumns: '1fr 1fr',
// // //       gap: '16px'
// // //     },
// // //     modalButtons: {
// // //       display: 'flex',
// // //       gap: '12px',
// // //       justifyContent: 'flex-end',
// // //       marginTop: '24px'
// // //     },
// // //     cancelButton: {
// // //       padding: '10px 20px',
// // //       background: 'transparent',
// // //       border: '1px solid rgba(255,255,255,0.2)',
// // //       borderRadius: '10px',
// // //       color: '#94a3b8',
// // //       cursor: 'pointer'
// // //     },
// // //     submitButton: {
// // //       padding: '10px 20px',
// // //       background: 'linear-gradient(135deg, #667eea, #764ba2)',
// // //       border: 'none',
// // //       borderRadius: '10px',
// // //       color: 'white',
// // //       cursor: 'pointer',
// // //       fontWeight: 500
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div style={styles.container}>
// // //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// // //           <div style={{ color: '#94a3b8' }}>Loading results...</div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={styles.container}>
// // //       {/* Header */}
// // //       <div style={styles.header}>
// // //         <div>
// // //           <h1 style={styles.pageTitle}>Results & Grades</h1>
// // //           <p style={styles.pageSubtitle}>Manage student grades and academic results</p>
// // //         </div>
// // //         <button onClick={() => setShowAddModal(true)} style={styles.addButton}>
// // //           <i className="fas fa-plus"></i> Add Result
// // //         </button>
// // //       </div>

// // //       {/* Stats Cards */}
// // //       <div style={styles.statsGrid}>
// // //         <div style={styles.statCard}>
// // //           <div style={styles.statValue}>{totalResults}</div>
// // //           <div style={styles.statLabel}>Total Results</div>
// // //         </div>
// // //         <div style={styles.statCard}>
// // //           <div style={styles.statValue}>{passedCount}</div>
// // //           <div style={styles.statLabel}>Passed</div>
// // //         </div>
// // //         <div style={styles.statCard}>
// // //           <div style={styles.statValue}>{pendingCount}</div>
// // //           <div style={styles.statLabel}>Pending</div>
// // //         </div>
// // //         <div style={styles.statCard}>
// // //           <div style={styles.statValue}>{results.length}</div>
// // //           <div style={styles.statLabel}>Records</div>
// // //         </div>
// // //       </div>

// // //       {/* Filters */}
// // //       <div style={styles.filters}>
// // //         <div style={styles.searchWrapper}>
// // //           <i className="fas fa-search" style={styles.searchIcon}></i>
// // //           <input type="text" placeholder="Search by student or course..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
// // //         </div>
// // //         <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} style={styles.clearButton}>
// // //           <i className="fas fa-filter"></i> Clear Filters
// // //         </button>
// // //       </div>

// // //       {/* Results Table */}
// // //       <div style={styles.tableContainer}>
// // //         <h2 style={styles.tableTitle}>Student Grades</h2>
        
// // //         <div style={styles.tableWrapper}>
// // //           <table style={styles.table}>
// // //             <thead>
// // //               <tr>
// // //                 <th style={styles.th}>Student</th>
// // //                 <th style={styles.th}>Course</th>
// // //                 <th style={styles.th}>Grade</th>
// // //                 <th style={styles.th}>Semester</th>
// // //                 <th style={styles.th}>Status</th>
// // //                 <th style={styles.th}>Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {paginatedResults.map((r) => (
// // //                 <tr key={r.id}>
// // //                   <td style={styles.td}>{r.student_name}</td>
// // //                   <td style={styles.td}>{r.course_name}</td>
// // //                   <td style={styles.td}>
// // //                     <span style={styles.gradeBadge(r.grade)}>{r.grade}</span>
// // //                   </td>
// // //                   <td style={styles.td}>{r.semester || '—'}</td>
// // //                   <td style={styles.td}>
// // //                     <span style={styles.statusBadge(r.status)}>{r.status || 'published'}</span>
// // //                   </td>
// // //                   <td style={styles.td}>
// // //                     <button style={styles.actionBtn} onClick={() => deleteResult(r.id)}>
// // //                       <i className="fas fa-trash"></i>
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //               {paginatedResults.length === 0 && (
// // //                 <tr>
// // //                   <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No results found</td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Pagination */}
// // //         {totalPages > 1 && (
// // //           <div style={styles.pagination}>
// // //             <div style={styles.paginationText}>
// // //               Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredResults.length)} of {filteredResults.length} results
// // //             </div>
// // //             <div style={styles.paginationButtons}>
// // //               <button 
// // //                 onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
// // //                 disabled={currentPage === 1}
// // //                 style={currentPage === 1 ? { ...styles.pageButton, opacity: 0.5, cursor: 'not-allowed' } : styles.pageButton}
// // //               >
// // //                 Previous
// // //               </button>
// // //               {[1, 2, 3].filter(p => p <= totalPages).map(pageNum => (
// // //                 <button 
// // //                   key={pageNum} 
// // //                   onClick={() => setCurrentPage(pageNum)} 
// // //                   style={currentPage === pageNum ? styles.activePageButton : styles.pageButton}
// // //                 >
// // //                   {pageNum}
// // //                 </button>
// // //               ))}
// // //               <button 
// // //                 onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} 
// // //                 disabled={currentPage === totalPages}
// // //                 style={currentPage === totalPages ? { ...styles.pageButton, opacity: 0.5, cursor: 'not-allowed' } : styles.pageButton}
// // //               >
// // //                 Next
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Add Result Modal */}
// // //       {showAddModal && (
// // //         <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
// // //           <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
// // //             <h2 style={styles.modalTitle}>Add New Result</h2>
            
// // //             <div style={styles.formGroup}>
// // //               <label style={styles.formLabel}>Student ID *</label>
// // //               <input type="text" value={formData.student_id} onChange={(e) => setFormData({...formData, student_id: e.target.value})} placeholder="e.g., ST2023001" style={styles.formInput} />
// // //             </div>
            
// // //             <div style={styles.formGroup}>
// // //               <label style={styles.formLabel}>Course ID *</label>
// // //               <input type="text" value={formData.course_id} onChange={(e) => setFormData({...formData, course_id: e.target.value})} placeholder="e.g., CS301" style={styles.formInput} />
// // //             </div>
            
// // //             <div style={styles.formRow}>
// // //               <div style={styles.formGroup}>
// // //                 <label style={styles.formLabel}>Grade *</label>
// // //                 <select value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} style={styles.formInput}>
// // //                   <option value="">Select Grade</option>
// // //                   <option value="A+">A+</option>
// // //                   <option value="A">A</option>
// // //                   <option value="A-">A-</option>
// // //                   <option value="B+">B+</option>
// // //                   <option value="B">B</option>
// // //                   <option value="B-">B-</option>
// // //                   <option value="C+">C+</option>
// // //                   <option value="C">C</option>
// // //                   <option value="C-">C-</option>
// // //                   <option value="D">D</option>
// // //                   <option value="F">F</option>
// // //                 </select>
// // //               </div>
// // //               <div style={styles.formGroup}>
// // //                 <label style={styles.formLabel}>Semester</label>
// // //                 <input type="text" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} placeholder="e.g., Fall 2025" style={styles.formInput} />
// // //               </div>
// // //             </div>
            
// // //             <div style={styles.modalButtons}>
// // //               <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>Cancel</button>
// // //               <button onClick={addResult} style={styles.submitButton}>Create Result</button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Results;



// // import React, { useState, useEffect } from 'react';

// // // ============= CSS STYLES =============
// // const styles = `
// //   .student-results-container {
// //     padding: 20px;
// //     max-width: 1400px;
// //     margin: 0 auto;
// //     min-height: 100vh;
// //     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //   }

// //   .results-header {
// //     text-align: center;
// //     margin-bottom: 30px;
// //     padding: 30px;
// //     background: white;
// //     border-radius: 20px;
// //     box-shadow: 0 10px 40px rgba(0,0,0,0.1);
// //   }

// //   .results-header h1 {
// //     font-size: 32px;
// //     background: linear-gradient(135deg, #667eea, #764ba2);
// //     -webkit-background-clip: text;
// //     -webkit-text-fill-color: transparent;
// //     margin-bottom: 10px;
// //   }

// //   .students-list-section {
// //     background: white;
// //     border-radius: 20px;
// //     padding: 25px;
// //     margin-bottom: 30px;
// //     box-shadow: 0 10px 40px rgba(0,0,0,0.1);
// //   }

// //   .students-list-section h2 {
// //     font-size: 24px;
// //     margin-bottom: 20px;
// //     color: #333;
// //   }

// //   .students-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
// //     gap: 20px;
// //     margin-bottom: 20px;
// //   }

// //   .student-card {
// //     background: #f8f9fa;
// //     border-radius: 12px;
// //     padding: 20px;
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     cursor: pointer;
// //     transition: all 0.3s;
// //     box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //   }

// //   .student-card:hover {
// //     transform: translateY(-3px);
// //     box-shadow: 0 4px 15px rgba(0,0,0,0.15);
// //   }

// //   .student-card.active {
// //     background: linear-gradient(135deg, #667eea, #764ba2);
// //     color: white;
// //   }

// //   .student-avatar {
// //     width: 50px;
// //     height: 50px;
// //     background: #667eea;
// //     color: white;
// //     border-radius: 50%;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     font-size: 20px;
// //     font-weight: bold;
// //   }

// //   .student-card.active .student-avatar {
// //     background: white;
// //     color: #667eea;
// //   }

// //   .student-info h4 {
// //     margin: 0 0 5px 0;
// //     font-size: 18px;
// //   }

// //   .student-info p {
// //     margin: 3px 0;
// //     font-size: 13px;
// //     opacity: 0.8;
// //   }

// //   .results-section {
// //     background: white;
// //     border-radius: 20px;
// //     padding: 25px;
// //     box-shadow: 0 10px 40px rgba(0,0,0,0.1);
// //   }

// //   .student-profile-header {
// //     background: linear-gradient(135deg, #667eea, #764ba2);
// //     color: white;
// //     padding: 25px;
// //     border-radius: 12px;
// //     margin-bottom: 30px;
// //   }

// //   .student-profile-header h2 {
// //     margin: 0 0 10px 0;
// //     font-size: 28px;
// //   }

// //   .student-profile-header p {
// //     margin: 5px 0;
// //     opacity: 0.9;
// //   }

// //   .semester-results {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 30px;
// //   }

// //   .semester-card {
// //     background: #f8f9fa;
// //     border-radius: 12px;
// //     padding: 20px;
// //     box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //   }

// //   .semester-header {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     margin-bottom: 20px;
// //     padding-bottom: 15px;
// //     border-bottom: 2px solid #dee2e6;
// //     flex-wrap: wrap;
// //     gap: 10px;
// //   }

// //   .semester-header h3 {
// //     font-size: 22px;
// //     color: #333;
// //     margin: 0;
// //   }

// //   .semester-gpa {
// //     font-size: 18px;
// //     font-weight: bold;
// //   }

// //   .semester-gpa span {
// //     background: linear-gradient(135deg, #667eea, #764ba2);
// //     padding: 5px 15px;
// //     border-radius: 20px;
// //     color: white;
// //     margin-left: 10px;
// //   }

// //   .add-result-btn {
// //     background: #28a745;
// //     color: white;
// //     border: none;
// //     padding: 8px 16px;
// //     border-radius: 6px;
// //     cursor: pointer;
// //     font-size: 14px;
// //     transition: all 0.3s;
// //   }

// //   .add-result-btn:hover {
// //     background: #218838;
// //     transform: translateY(-2px);
// //   }

// //   .courses-table {
// //     overflow-x: auto;
// //   }

// //   .courses-table table {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }

// //   .courses-table th {
// //     background: #e9ecef;
// //     padding: 12px;
// //     text-align: left;
// //     font-weight: 600;
// //     color: #495057;
// //     border-bottom: 2px solid #dee2e6;
// //   }

// //   .courses-table td {
// //     padding: 12px;
// //     border-bottom: 1px solid #dee2e6;
// //   }

// //   .grade-cell {
// //     font-weight: bold;
// //     font-size: 16px;
// //   }

// //   .status-badge {
// //     padding: 4px 10px;
// //     border-radius: 12px;
// //     font-size: 12px;
// //     font-weight: 600;
// //     display: inline-block;
// //   }

// //   .status-published {
// //     background: #d4edda;
// //     color: #155724;
// //   }

// //   .status-pending {
// //     background: #fff3cd;
// //     color: #856404;
// //   }

// //   .status-failed {
// //     background: #f8d7da;
// //     color: #721c24;
// //   }

// //   .edit-btn {
// //     background: #ffc107;
// //     color: #333;
// //     border: none;
// //     padding: 6px 12px;
// //     border-radius: 4px;
// //     cursor: pointer;
// //     font-size: 12px;
// //     transition: all 0.3s;
// //   }

// //   .edit-btn:hover {
// //     background: #e0a800;
// //   }

// //   .no-data {
// //     text-align: center;
// //     color: #999;
// //     padding: 40px;
// //   }

// //   .modal-overlay {
// //     position: fixed;
// //     top: 0;
// //     left: 0;
// //     right: 0;
// //     bottom: 0;
// //     background: rgba(0,0,0,0.5);
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     z-index: 1000;
// //   }

// //   .result-modal {
// //     background: white;
// //     border-radius: 12px;
// //     width: 90%;
// //     max-width: 500px;
// //     max-height: 90vh;
// //     overflow-y: auto;
// //   }

// //   .modal-header {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     padding: 20px;
// //     border-bottom: 1px solid #dee2e6;
// //   }

// //   .modal-header h3 {
// //     margin: 0;
// //   }

// //   .close-btn {
// //     background: none;
// //     border: none;
// //     font-size: 24px;
// //     cursor: pointer;
// //     color: #999;
// //   }

// //   .modal-body {
// //     padding: 20px;
// //   }

// //   .form-group {
// //     margin-bottom: 20px;
// //   }

// //   .form-group label {
// //     display: block;
// //     margin-bottom: 8px;
// //     font-weight: 600;
// //     color: #333;
// //   }

// //   .form-group select,
// //   .form-group textarea {
// //     width: 100%;
// //     padding: 10px;
// //     border: 1px solid #ddd;
// //     border-radius: 6px;
// //     font-size: 14px;
// //   }

// //   .form-group textarea {
// //     resize: vertical;
// //   }

// //   .modal-footer {
// //     display: flex;
// //     justify-content: flex-end;
// //     gap: 10px;
// //     padding: 20px;
// //     border-top: 1px solid #dee2e6;
// //   }

// //   .cancel-btn {
// //     background: #6c757d;
// //     color: white;
// //     border: none;
// //     padding: 10px 20px;
// //     border-radius: 6px;
// //     cursor: pointer;
// //   }

// //   .save-btn {
// //     background: linear-gradient(135deg, #667eea, #764ba2);
// //     color: white;
// //     border: none;
// //     padding: 10px 20px;
// //     border-radius: 6px;
// //     cursor: pointer;
// //   }

// //   .loading {
// //     text-align: center;
// //     padding: 40px;
// //     font-size: 18px;
// //     color: #666;
// //   }

// //   @media (max-width: 768px) {
// //     .students-grid {
// //       grid-template-columns: 1fr;
// //     }
    
// //     .semester-header {
// //       flex-direction: column;
// //       align-items: flex-start;
// //     }
    
// //     .courses-table {
// //       font-size: 12px;
// //     }
    
// //     .courses-table th,
// //     .courses-table td {
// //       padding: 8px;
// //     }
// //   }
// // `;

// // // ============= COMPONENT =============
// // function Results() {
// //   const [students, setStudents] = useState([]);
// //   const [selectedStudent, setSelectedStudent] = useState(null);
// //   const [studentResults, setStudentResults] = useState(null);
// //   const [semesters, setSemesters] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [editingResult, setEditingResult] = useState(null);
// //   const [showResultModal, setShowResultModal] = useState(false);
// //   const [semesterCourses, setSemesterCourses] = useState([]);

// //   // Inject styles
// //   useEffect(() => {
// //     const styleSheet = document.createElement("style");
// //     styleSheet.innerText = styles;
// //     document.head.appendChild(styleSheet);
// //     return () => styleSheet.remove();
// //   }, []);

// //   // Fetch all students
// //   useEffect(() => {
// //     fetchStudents();
// //     fetchSemesters();
// //   }, []);

// //   const fetchStudents = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/admin/results/students');
// //       const data = await response.json();
// //       setStudents(data);
// //     } catch (error) {
// //       console.error('Error fetching students:', error);
// //     }
// //   };

// //   const fetchSemesters = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/admin/results/semesters');
// //       const data = await response.json();
// //       setSemesters(data);
// //     } catch (error) {
// //       console.error('Error fetching semesters:', error);
// //     }
// //   };

// //   const fetchStudentResults = async (studentId) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/admin/results/student/${studentId}`);
// //       const data = await response.json();
// //       setStudentResults(data);
// //       setSelectedStudent(data.student);
// //     } catch (error) {
// //       console.error('Error fetching student results:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCoursesForSemester = async (semesterId) => {
// //     const semesterName = getSemesterName(semesterId);
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/admin/results/courses/${encodeURIComponent(semesterName)}`);
// //       const data = await response.json();
// //       setSemesterCourses(data);
// //     } catch (error) {
// //       console.error('Error fetching courses:', error);
// //     }
// //   };

// //   const getSemesterName = (semesterId) => {
// //     const names = {
// //       1: '1st Semester',
// //       2: '2nd Semester',
// //       3: '3rd Semester',
// //       4: '4th Semester',
// //       5: '5th Semester',
// //       6: '6th Semester',
// //       7: '7th Semester',
// //       8: '8th Semester'
// //     };
// //     return names[semesterId] || `${semesterId}th Semester`;
// //   };

// //   const handleStudentClick = (student) => {
// //     fetchStudentResults(student.user_id);
// //   };

// //   const handleAddResult = (semesterId) => {
// //     fetchCoursesForSemester(semesterId);
// //     setEditingResult({
// //       student_user_id: selectedStudent.user_id,
// //       semester_id: semesterId,
// //       course_id: '',
// //       course_code: '',
// //       course_name: '',
// //       credits: 3,
// //       grade: '',
// //       grade_points: 0,
// //       status: 'published',
// //       remarks: ''
// //     });
// //     setShowResultModal(true);
// //   };

// //   const handleEditResult = (result) => {
// //     fetchCoursesForSemester(result.semester_id);
// //     setEditingResult(result);
// //     setShowResultModal(true);
// //   };

// //   const handleSaveResult = async () => {
// //     if (!editingResult.course_id) {
// //       alert('Please select a course');
// //       return;
// //     }
// //     if (!editingResult.grade) {
// //       alert('Please select a grade');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:5000/api/admin/results/save', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(editingResult)
// //       });
      
// //       if (response.ok) {
// //         alert('Result saved successfully!');
// //         setShowResultModal(false);
// //         fetchStudentResults(selectedStudent.user_id);
// //       } else {
// //         const error = await response.json();
// //         alert(error.error || 'Error saving result');
// //       }
// //     } catch (error) {
// //       console.error('Error saving result:', error);
// //       alert('Error saving result');
// //     }
// //   };

// //   const getGradePoints = (grade) => {
// //     const gradeMap = {
// //       'A+': 4.00, 'A': 4.00, 'A-': 3.70,
// //       'B+': 3.30, 'B': 3.00, 'B-': 2.70,
// //       'C+': 2.30, 'C': 2.00, 'C-': 1.70,
// //       'D+': 1.30, 'D': 1.00, 'F': 0.00
// //     };
// //     return gradeMap[grade] || 0;
// //   };

// //   const handleGradeChange = (grade) => {
// //     const gradePoints = getGradePoints(grade);
// //     setEditingResult({ ...editingResult, grade, grade_points: gradePoints });
// //   };

// //   const handleCourseSelect = (courseId) => {
// //     const course = semesterCourses.find(c => c.id === parseInt(courseId));
// //     if (course) {
// //       setEditingResult({
// //         ...editingResult,
// //         course_id: course.id,
// //         course_code: course.course_code,
// //         course_name: course.course_name,
// //         credits: course.credits
// //       });
// //     }
// //   };

// //   return (
// //     <div className="student-results-container">
// //       <div className="results-header">
// //         <h1>📊 Student Results Management</h1>
// //         <p>Manage and view student academic results semester by semester</p>
// //       </div>

// //       <div className="students-list-section">
// //         <h2>👨‍🎓 Students List</h2>
// //         <div className="students-grid">
// //           {students.map((student) => (
// //             <div 
// //               key={student.user_id} 
// //               className={`student-card ${selectedStudent?.user_id === student.user_id ? 'active' : ''}`}
// //               onClick={() => handleStudentClick(student)}
// //             >
// //               <div className="student-avatar">
// //                 {student.name.charAt(0).toUpperCase()}
// //               </div>
// //               <div className="student-info">
// //                 <h4>{student.name}</h4>
// //                 <p>{student.user_id}</p>
// //                 <p>Semester: {student.semester_id || 'Not set'}</p>
// //                 <p>Batch: {student.batch_id || 'N/A'}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {selectedStudent && (
// //         <div className="results-section">
// //           <div className="student-profile-header">
// //             <h2>{selectedStudent.name}</h2>
// //             <p>ID: {selectedStudent.user_id} | Email: {selectedStudent.email}</p>
// //             <p>Current Semester: {getSemesterName(selectedStudent.current_semester)}</p>
// //           </div>

// //           {loading ? (
// //             <div className="loading">Loading results...</div>
// //           ) : (
// //             <div className="semester-results">
// //               {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
// //                 const semesterResult = studentResults?.results?.[semNum];
// //                 const isCurrentOrPast = semNum <= (selectedStudent.current_semester || 1);
                
// //                 if (!isCurrentOrPast && !semesterResult) return null;
                
// //                 return (
// //                   <div key={semNum} className="semester-card">
// //                     <div className="semester-header">
// //                       <h3>{getSemesterName(semNum)}</h3>
// //                       {semesterResult && semesterResult.gpa > 0 && (
// //                         <div className="semester-gpa">
// //                           GPA: <span>{semesterResult.gpa}</span>
// //                         </div>
// //                       )}
// //                       <button 
// //                         className="add-result-btn"
// //                         onClick={() => handleAddResult(semNum)}
// //                       >
// //                         + Add/Edit Results
// //                       </button>
// //                     </div>
                    
// //                     <div className="courses-table">
// //                       <table>
// //                         <thead>
// //                           <tr>
// //                             <th>Course Code</th>
// //                             <th>Course Name</th>
// //                             <th>Credits</th>
// //                             <th>Grade</th>
// //                             <th>Grade Points</th>
// //                             <th>Status</th>
// //                             <th>Actions</th>
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {semesterResult?.courses?.map((course) => (
// //                             <tr key={course.id}>
// //                               <td>{course.course_code}</td>
// //                               <td>{course.course_name}</td>
// //                               <td>{course.credits}</td>
// //                               <td className="grade-cell">{course.grade || '-'}</td>
// //                               <td>{course.grade_points || '-'}</td>
// //                               <td>
// //                                 <span className={`status-badge status-${course.status}`}>
// //                                   {course.status}
// //                                 </span>
// //                               </td>
// //                               <td>
// //                                 <button 
// //                                   className="edit-btn"
// //                                   onClick={() => handleEditResult(course)}
// //                                 >
// //                                   Edit
// //                                 </button>
// //                               </td>
// //                             </tr>
// //                           ))}
// //                           {(!semesterResult?.courses || semesterResult.courses.length === 0) && (
// //                             <tr>
// //                               <td colSpan="7" className="no-data">
// //                                 No results added yet. Click "Add Results" to add.
// //                               </td>
// //                             </tr>
// //                           )}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Result Edit Modal */}
// //       {showResultModal && editingResult && (
// //         <div className="modal-overlay" onClick={() => setShowResultModal(false)}>
// //           <div className="result-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h3>Add/Edit Result</h3>
// //               <button className="close-btn" onClick={() => setShowResultModal(false)}>×</button>
// //             </div>
// //             <div className="modal-body">
// //               <div className="form-group">
// //                 <label>Course *</label>
// //                 <select 
// //                   value={editingResult.course_id || ''} 
// //                   onChange={(e) => handleCourseSelect(e.target.value)}
// //                 >
// //                   <option value="">Select Course</option>
// //                   {semesterCourses.map(course => (
// //                     <option key={course.id} value={course.id}>
// //                       {course.course_code} - {course.course_name} ({course.credits} credits)
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
              
// //               <div className="form-group">
// //                 <label>Grade *</label>
// //                 <select 
// //                   value={editingResult.grade || ''} 
// //                   onChange={(e) => handleGradeChange(e.target.value)}
// //                 >
// //                   <option value="">Select Grade</option>
// //                   <option value="A+">A+ (4.00)</option>
// //                   <option value="A">A (4.00)</option>
// //                   <option value="A-">A- (3.70)</option>
// //                   <option value="B+">B+ (3.30)</option>
// //                   <option value="B">B (3.00)</option>
// //                   <option value="B-">B- (2.70)</option>
// //                   <option value="C+">C+ (2.30)</option>
// //                   <option value="C">C (2.00)</option>
// //                   <option value="C-">C- (1.70)</option>
// //                   <option value="D+">D+ (1.30)</option>
// //                   <option value="D">D (1.00)</option>
// //                   <option value="F">F (0.00)</option>
// //                 </select>
// //               </div>
              
// //               <div className="form-group">
// //                 <label>Status</label>
// //                 <select 
// //                   value={editingResult.status || 'published'} 
// //                   onChange={(e) => setEditingResult({...editingResult, status: e.target.value})}
// //                 >
// //                   <option value="published">Published</option>
// //                   <option value="pending">Pending</option>
// //                   <option value="failed">Failed</option>
// //                 </select>
// //               </div>
              
// //               <div className="form-group">
// //                 <label>Remarks (Optional)</label>
// //                 <textarea 
// //                   value={editingResult.remarks || ''} 
// //                   onChange={(e) => setEditingResult({...editingResult, remarks: e.target.value})}
// //                   rows="3"
// //                   placeholder="Any additional remarks about this course result..."
// //                 />
// //               </div>
// //             </div>
// //             <div className="modal-footer">
// //               <button className="cancel-btn" onClick={() => setShowResultModal(false)}>Cancel</button>
// //               <button className="save-btn" onClick={handleSaveResult}>Save Result</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Results;


// import React, { useState, useEffect } from 'react';

// function Results() {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [studentResults, setStudentResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [editingResult, setEditingResult] = useState(null);
//   const [showResultModal, setShowResultModal] = useState(false);
//   const [semesterCourses, setSemesterCourses] = useState([]);

//   // Fetch all students
//   useEffect(() => {
//     fetchStudents();
//     createFloatingShapes();
//   }, []);

//   const createFloatingShapes = () => {
//     const container = document.getElementById('floatingShapes');
//     if (!container) return;
//     container.innerHTML = '';
//     for (let i = 0; i < 12; i++) {
//       const shape = document.createElement('div');
//       shape.className = `shape shape-${Math.random() > 0.5 ? 'circle' : 'square'}`;
//       const size = Math.random() * 60 + 30;
//       shape.style.width = size + 'px';
//       shape.style.height = size + 'px';
//       shape.style.left = Math.random() * 100 + '%';
//       shape.style.animationDuration = (Math.random() * 25 + 30) + 's';
//       shape.style.animationDelay = Math.random() * 15 + 's';
//       container.appendChild(shape);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/admin/results/students');
//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const fetchStudentResults = async (studentId) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/results/student/${studentId}`);
//       const data = await response.json();
//       setStudentResults(data);
//       setSelectedStudent(data.student);
//     } catch (error) {
//       console.error('Error fetching student results:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCoursesForSemester = async (semesterId) => {
//     const semesterName = getSemesterName(semesterId);
//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/results/courses/${encodeURIComponent(semesterName)}`);
//       const data = await response.json();
//       setSemesterCourses(data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   const getSemesterName = (semesterId) => {
//     const names = {
//       1: '1st Semester',
//       2: '2nd Semester',
//       3: '3rd Semester',
//       4: '4th Semester',
//       5: '5th Semester',
//       6: '6th Semester',
//       7: '7th Semester',
//       8: '8th Semester'
//     };
//     return names[semesterId] || `${semesterId}th Semester`;
//   };

//   const handleStudentClick = (student) => {
//     fetchStudentResults(student.user_id);
//   };

//   const handleAddResult = (semesterId) => {
//     fetchCoursesForSemester(semesterId);
//     setEditingResult({
//       student_user_id: selectedStudent.user_id,
//       semester_id: semesterId,
//       course_id: '',
//       course_code: '',
//       course_name: '',
//       credits: 3,
//       grade: '',
//       grade_points: 0,
//       status: 'published',
//       remarks: ''
//     });
//     setShowResultModal(true);
//   };

//   const handleEditResult = (result) => {
//     fetchCoursesForSemester(result.semester_id);
//     setEditingResult(result);
//     setShowResultModal(true);
//   };

//   const handleSaveResult = async () => {
//     if (!editingResult.course_id) {
//       alert('Please select a course');
//       return;
//     }
//     if (!editingResult.grade) {
//       alert('Please select a grade');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/admin/results/save', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingResult)
//       });
      
//       if (response.ok) {
//         alert('Result saved successfully!');
//         setShowResultModal(false);
//         fetchStudentResults(selectedStudent.user_id);
//       } else {
//         const error = await response.json();
//         alert(error.error || 'Error saving result');
//       }
//     } catch (error) {
//       console.error('Error saving result:', error);
//       alert('Error saving result');
//     }
//   };

//   const getGradePoints = (grade) => {
//     const gradeMap = {
//       'A+': 4.00, 'A': 4.00, 'A-': 3.70,
//       'B+': 3.30, 'B': 3.00, 'B-': 2.70,
//       'C+': 2.30, 'C': 2.00, 'C-': 1.70,
//       'D+': 1.30, 'D': 1.00, 'F': 0.00
//     };
//     return gradeMap[grade] || 0;
//   };

//   const handleGradeChange = (grade) => {
//     const gradePoints = getGradePoints(grade);
//     setEditingResult({ ...editingResult, grade, grade_points: gradePoints });
//   };

//   const handleCourseSelect = (courseId) => {
//     const course = semesterCourses.find(c => c.id === parseInt(courseId));
//     if (course) {
//       setEditingResult({
//         ...editingResult,
//         course_id: course.id,
//         course_code: course.course_code,
//         course_name: course.course_name,
//         credits: course.credits
//       });
//     }
//   };

//   return (
//     <>
//       <div className="background"></div>
//       <div className="floating-shapes" id="floatingShapes"></div>
//       <div className="gradient-orb orb-1"></div>
//       <div className="gradient-orb orb-2"></div>

//       <div className="dashboard-container" style={{ padding: '20px' }}>
//         {/* Students Grid */}
//         <div className="dashboard-cards" style={{ marginBottom: '30px' }}>
//           <h2 style={{ gridColumn: '1/-1', marginBottom: '20px', color: '#333' }}>📊 Student Results Management</h2>
//           {students.map((student) => (
//             <div 
//               key={student.user_id} 
//               className={`card ${selectedStudent?.user_id === student.user_id ? 'active' : ''}`}
//               onClick={() => handleStudentClick(student)}
//               style={{ 
//                 cursor: 'pointer',
//                 background: selectedStudent?.user_id === student.user_id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
//                 color: selectedStudent?.user_id === student.user_id ? 'white' : '#333'
//               }}
//             >
//               <div className="card-icon" style={{ fontSize: '40px' }}>👨‍🎓</div>
//               <h3>{student.name}</h3>
//               <p>{student.user_id}</p>
//               <p style={{ fontSize: '12px', marginTop: '5px' }}>
//                 Semester: {student.semester_id || 'Not set'} | Batch: {student.batch_id || 'N/A'}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Results Section */}
//         {selectedStudent && (
//           <div className="dashboard-section" style={{ marginTop: '40px' }}>
//             <div className="dashboard-header" style={{ 
//               background: 'linear-gradient(135deg, #667eea, #764ba2)', 
//               padding: '20px', 
//               borderRadius: '12px', 
//               marginBottom: '20px',
//               color: 'white'
//             }}>
//               <h2 style={{ margin: 0 }}>{selectedStudent.name}</h2>
//               <p style={{ margin: '5px 0 0 0' }}>
//                 ID: {selectedStudent.user_id} | Email: {selectedStudent.email} | 
//                 Current Semester: {getSemesterName(selectedStudent.current_semester)}
//               </p>
//             </div>

//             {loading ? (
//               <div style={{ textAlign: 'center', padding: '40px' }}>Loading results...</div>
//             ) : (
//               <div>
//                 {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
//                   const semesterResult = studentResults?.results?.[semNum];
//                   const isCurrentOrPast = semNum <= (selectedStudent.current_semester || 1);
                  
//                   if (!isCurrentOrPast && !semesterResult) return null;
                  
//                   return (
//                     <div key={semNum} style={{ 
//                       background: 'white', 
//                       borderRadius: '12px', 
//                       padding: '20px', 
//                       marginBottom: '20px',
//                       boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//                     }}>
//                       <div style={{ 
//                         display: 'flex', 
//                         justifyContent: 'space-between', 
//                         alignItems: 'center',
//                         marginBottom: '15px',
//                         paddingBottom: '10px',
//                         borderBottom: '2px solid #f0f0f0',
//                         flexWrap: 'wrap',
//                         gap: '10px'
//                       }}>
//                         <h3 style={{ margin: 0, color: '#333' }}>{getSemesterName(semNum)}</h3>
//                         {semesterResult && semesterResult.gpa > 0 && (
//                           <div style={{ 
//                             background: 'linear-gradient(135deg, #667eea, #764ba2)', 
//                             padding: '5px 15px', 
//                             borderRadius: '20px', 
//                             color: 'white',
//                             fontWeight: 'bold'
//                           }}>
//                             GPA: {semesterResult.gpa}
//                           </div>
//                         )}
//                         <button 
//                           className="submit-btn"
//                           onClick={() => handleAddResult(semNum)}
//                           style={{ padding: '8px 16px', fontSize: '14px', margin: 0 }}
//                         >
//                           + Add Results
//                         </button>
//                       </div>
                      
//                       <div style={{ overflowX: 'auto' }}>
//                         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                           <thead>
//                             <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
//                               <th style={{ padding: '12px', textAlign: 'left' }}>Course Code</th>
//                               <th style={{ padding: '12px', textAlign: 'left' }}>Course Name</th>
//                               <th style={{ padding: '12px', textAlign: 'center' }}>Credits</th>
//                               <th style={{ padding: '12px', textAlign: 'center' }}>Grade</th>
//                               <th style={{ padding: '12px', textAlign: 'center' }}>Grade Points</th>
//                               <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
//                               <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {semesterResult?.courses?.map((course) => (
//                               <tr key={course.id} style={{ borderBottom: '1px solid #dee2e6' }}>
//                                 <td style={{ padding: '12px' }}><strong>{course.course_code}</strong></td>
//                                 <td style={{ padding: '12px' }}>{course.course_name}</td>
//                                 <td style={{ padding: '12px', textAlign: 'center' }}>{course.credits}</td>
//                                 <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
//                                   {course.grade || '-'}
//                                 </td>
//                                 <td style={{ padding: '12px', textAlign: 'center' }}>{course.grade_points || '-'}</td>
//                                 <td style={{ padding: '12px', textAlign: 'center' }}>
//                                   <span style={{ 
//                                     padding: '4px 10px', 
//                                     borderRadius: '12px', 
//                                     fontSize: '12px',
//                                     fontWeight: '600',
//                                     background: course.status === 'published' ? '#d4edda' : course.status === 'pending' ? '#fff3cd' : '#f8d7da',
//                                     color: course.status === 'published' ? '#155724' : course.status === 'pending' ? '#856404' : '#721c24'
//                                   }}>
//                                     {course.status}
//                                   </span>
//                                 </td>
//                                 <td style={{ padding: '12px', textAlign: 'center' }}>
//                                   <button 
//                                     className="submit-btn"
//                                     onClick={() => handleEditResult(course)}
//                                     style={{ padding: '6px 12px', fontSize: '12px', margin: 0 }}
//                                   >
//                                     Edit
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                             {(!semesterResult?.courses || semesterResult.courses.length === 0) && (
//                               <tr>
//                                 <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
//                                   No results added yet. Click "Add Results" to add.
//                                 </td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showResultModal && editingResult && (
//         <div className="modal-overlay" onClick={() => setShowResultModal(false)}>
//           <div className="auth-card" style={{ maxWidth: '500px', padding: '0', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
//             <div style={{ 
//               background: 'linear-gradient(135deg, #667eea, #764ba2)', 
//               padding: '20px',
//               color: 'white'
//             }}>
//               <h3 style={{ margin: 0 }}>Add/Edit Result</h3>
//             </div>
//             <div style={{ padding: '20px' }}>
//               <div className="form-group">
//                 <label>Course</label>
//                 <select 
//                   value={editingResult.course_id || ''} 
//                   onChange={(e) => handleCourseSelect(e.target.value)}
//                   style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
//                 >
//                   <option value="">Select Course</option>
//                   {semesterCourses.map(course => (
//                     <option key={course.id} value={course.id}>
//                       {course.course_code} - {course.course_name} ({course.credits} credits)
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label>Grade</label>
//                 <select 
//                   value={editingResult.grade || ''} 
//                   onChange={(e) => handleGradeChange(e.target.value)}
//                   style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
//                 >
//                   <option value="">Select Grade</option>
//                   <option value="A+">A+ (4.00)</option>
//                   <option value="A">A (4.00)</option>
//                   <option value="A-">A- (3.70)</option>
//                   <option value="B+">B+ (3.30)</option>
//                   <option value="B">B (3.00)</option>
//                   <option value="B-">B- (2.70)</option>
//                   <option value="C+">C+ (2.30)</option>
//                   <option value="C">C (2.00)</option>
//                   <option value="C-">C- (1.70)</option>
//                   <option value="D+">D+ (1.30)</option>
//                   <option value="D">D (1.00)</option>
//                   <option value="F">F (0.00)</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label>Status</label>
//                 <select 
//                   value={editingResult.status || 'published'} 
//                   onChange={(e) => setEditingResult({...editingResult, status: e.target.value})}
//                   style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
//                 >
//                   <option value="published">Published</option>
//                   <option value="pending">Pending</option>
//                   <option value="failed">Failed</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label>Remarks</label>
//                 <textarea 
//                   value={editingResult.remarks || ''} 
//                   onChange={(e) => setEditingResult({...editingResult, remarks: e.target.value})}
//                   rows="3"
//                   style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
//                 />
//               </div>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '20px', borderTop: '1px solid #f0f0f0' }}>
//               <button 
//                 className="submit-btn" 
//                 onClick={() => setShowResultModal(false)}
//                 style={{ background: '#6c757d', margin: 0 }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="submit-btn" 
//                 onClick={handleSaveResult}
//                 style={{ margin: 0 }}
//               >
//                 Save Result
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .dashboard-card.active {
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           color: white;
//           transform: translateY(-5px);
//         }
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0,0,0,0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Results;



import React, { useState, useEffect } from 'react';

function Results() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentResults, setStudentResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [semesterCourses, setSemesterCourses] = useState([]);

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/results/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStudentResults = async (studentId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/results/student/${studentId}`);
      const data = await response.json();
      setStudentResults(data);
      setSelectedStudent(data.student);
    } catch (error) {
      console.error('Error fetching student results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoursesForSemester = async (semesterId) => {
    const semesterName = getSemesterName(semesterId);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/results/courses/${encodeURIComponent(semesterName)}`);
      const data = await response.json();
      setSemesterCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const getSemesterName = (semesterId) => {
    const names = {
      1: '1st Semester',
      2: '2nd Semester',
      3: '3rd Semester',
      4: '4th Semester',
      5: '5th Semester',
      6: '6th Semester',
      7: '7th Semester',
      8: '8th Semester'
    };
    return names[semesterId] || `${semesterId}th Semester`;
  };

  const handleStudentClick = (student) => {
    fetchStudentResults(student.user_id);
  };

  const handleAddResult = (semesterId) => {
    fetchCoursesForSemester(semesterId);
    setEditingResult({
      student_user_id: selectedStudent.user_id,
      semester_id: semesterId,
      course_id: '',
      course_code: '',
      course_name: '',
      credits: 3,
      grade: '',
      grade_points: 0,
      status: 'published',
      remarks: ''
    });
    setShowResultModal(true);
  };

  const handleEditResult = (result) => {
    fetchCoursesForSemester(result.semester_id);
    setEditingResult(result);
    setShowResultModal(true);
  };

  const handleSaveResult = async () => {
    if (!editingResult.course_id) {
      alert('Please select a course');
      return;
    }
    if (!editingResult.grade) {
      alert('Please select a grade');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/results/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingResult)
      });
      
      if (response.ok) {
        alert('Result saved successfully!');
        setShowResultModal(false);
        fetchStudentResults(selectedStudent.user_id);
      } else {
        const error = await response.json();
        alert(error.error || 'Error saving result');
      }
    } catch (error) {
      console.error('Error saving result:', error);
      alert('Error saving result');
    }
  };

  const getGradePoints = (grade) => {
    const gradeMap = {
      'A+': 4.00, 'A': 4.00, 'A-': 3.70,
      'B+': 3.30, 'B': 3.00, 'B-': 2.70,
      'C+': 2.30, 'C': 2.00, 'C-': 1.70,
      'D+': 1.30, 'D': 1.00, 'F': 0.00
    };
    return gradeMap[grade] || 0;
  };

  const handleGradeChange = (grade) => {
    const gradePoints = getGradePoints(grade);
    setEditingResult({ ...editingResult, grade, grade_points: gradePoints });
  };

  const handleCourseSelect = (courseId) => {
    const course = semesterCourses.find(c => c.id === parseInt(courseId));
    if (course) {
      setEditingResult({
        ...editingResult,
        course_id: course.id,
        course_code: course.course_code,
        course_name: course.course_name,
        credits: course.credits
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Students Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px', gridColumn: '1/-1' }}>
          📊 Student Results Management
        </h2>
        {students.map((student) => (
          <div 
            key={student.user_id} 
            onClick={() => handleStudentClick(student)}
            style={{ 
              background: selectedStudent?.user_id === student.user_id ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#1a1a2e',
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              border: selectedStudent?.user_id === student.user_id ? '1px solid rgba(102,126,234,0.5)' : '1px solid rgba(255,255,255,0.05)',
              transform: selectedStudent?.user_id === student.user_id ? 'translateY(-3px)' : 'none'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>👨‍🎓</div>
            <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '18px' }}>{student.name}</h3>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '12px' }}>{student.user_id}</p>
            <p style={{ color: '#94a3b8', margin: '5px 0 0 0', fontSize: '11px' }}>
              Semester: {student.semester_id || 'Not set'} | Batch: {student.batch_id || 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {/* Results Section */}
      {selectedStudent && (
        <div style={{ marginTop: '40px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea, #764ba2)', 
            padding: '20px', 
            borderRadius: '16px', 
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: 'white' }}>{selectedStudent.name}</h2>
            <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.9)' }}>
              ID: {selectedStudent.user_id} | Email: {selectedStudent.email} | 
              Current Semester: {getSemesterName(selectedStudent.current_semester)}
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading results...</div>
          ) : (
            <div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
                const semesterResult = studentResults?.results?.[semNum];
                const isCurrentOrPast = semNum <= (selectedStudent.current_semester || 1);
                
                if (!isCurrentOrPast && !semesterResult) return null;
                
                return (
                  <div key={semNum} style={{ 
                    background: '#1a1a2e', 
                    borderRadius: '16px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      <h3 style={{ margin: 0, color: 'white' }}>{getSemesterName(semNum)}</h3>
                      {semesterResult && semesterResult.gpa > 0 && (
                        <div style={{ 
                          background: 'rgba(102,126,234,0.2)', 
                          padding: '5px 15px', 
                          borderRadius: '20px', 
                          color: '#667eea',
                          fontWeight: 'bold'
                        }}>
                          GPA: {semesterResult.gpa}
                        </div>
                      )}
                      <button 
                        onClick={() => handleAddResult(semNum)}
                        style={{ 
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 500
                        }}
                      >
                        + Add Results
                      </button>
                    </div>
                    
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '13px' }}>Course Code</th>
                            <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '13px' }}>Course Name</th>
                            <th style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Credits</th>
                            <th style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Grade</th>
                            <th style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Grade Points</th>
                            <th style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Status</th>
                            <th style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {semesterResult?.courses?.map((course) => (
                            <tr key={course.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <td style={{ padding: '12px', color: 'white' }}><strong>{course.course_code}</strong></td>
                              <td style={{ padding: '12px', color: '#cbd5e1' }}>{course.course_name}</td>
                              <td style={{ padding: '12px', textAlign: 'center', color: '#cbd5e1' }}>{course.credits}</td>
                              <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', color: course.grade === 'F' ? '#ef4444' : '#10b981' }}>
                                {course.grade || '-'}
                              </td>
                              <td style={{ padding: '12px', textAlign: 'center', color: '#cbd5e1' }}>{course.grade_points || '-'}</td>
                              <td style={{ padding: '12px', textAlign: 'center' }}>
                                <span style={{ 
                                  padding: '4px 10px', 
                                  borderRadius: '12px', 
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  background: course.status === 'published' ? 'rgba(16,185,129,0.2)' : course.status === 'pending' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                                  color: course.status === 'published' ? '#10b981' : course.status === 'pending' ? '#f59e0b' : '#ef4444'
                                }}>
                                  {course.status}
                                </span>
                              </td>
                              <td style={{ padding: '12px', textAlign: 'center' }}>
                                <button 
                                  onClick={() => handleEditResult(course)}
                                  style={{ 
                                    background: 'rgba(102,126,234,0.2)',
                                    color: '#667eea',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                          {(!semesterResult?.courses || semesterResult.courses.length === 0) && (
                            <tr>
                              <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                                No results added yet. Click "Add Results" to add.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showResultModal && editingResult && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowResultModal(false)}>
          <div style={{
            background: '#1a1a2e',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(102,126,234,0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea, #764ba2)', 
              padding: '20px',
              borderRadius: '20px 20px 0 0'
            }}>
              <h3 style={{ margin: 0, color: 'white' }}>Add/Edit Result</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '13px' }}>Course *</label>
                <select 
                  value={editingResult.course_id || ''} 
                  onChange={(e) => handleCourseSelect(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: '#0a0a15', border: '1px solid rgba(102,126,234,0.3)', borderRadius: '10px', color: 'white', outline: 'none' }}
                >
                  <option value="">Select Course</option>
                  {semesterCourses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.course_code} - {course.course_name} ({course.credits} credits)
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '13px' }}>Grade *</label>
                <select 
                  value={editingResult.grade || ''} 
                  onChange={(e) => handleGradeChange(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: '#0a0a15', border: '1px solid rgba(102,126,234,0.3)', borderRadius: '10px', color: 'white', outline: 'none' }}
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+ (4.00)</option>
                  <option value="A">A (4.00)</option>
                  <option value="A-">A- (3.70)</option>
                  <option value="B+">B+ (3.30)</option>
                  <option value="B">B (3.00)</option>
                  <option value="B-">B- (2.70)</option>
                  <option value="C+">C+ (2.30)</option>
                  <option value="C">C (2.00)</option>
                  <option value="C-">C- (1.70)</option>
                  <option value="D+">D+ (1.30)</option>
                  <option value="D">D (1.00)</option>
                  <option value="F">F (0.00)</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '13px' }}>Status</label>
                <select 
                  value={editingResult.status || 'published'} 
                  onChange={(e) => setEditingResult({...editingResult, status: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#0a0a15', border: '1px solid rgba(102,126,234,0.3)', borderRadius: '10px', color: 'white', outline: 'none' }}
                >
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '13px' }}>Remarks</label>
                <textarea 
                  value={editingResult.remarks || ''} 
                  onChange={(e) => setEditingResult({...editingResult, remarks: e.target.value})}
                  rows="3"
                  style={{ width: '100%', padding: '12px', background: '#0a0a15', border: '1px solid rgba(102,126,234,0.3)', borderRadius: '10px', color: 'white', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                onClick={() => setShowResultModal(false)}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveResult}
                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 500 }}
              >
                Save Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
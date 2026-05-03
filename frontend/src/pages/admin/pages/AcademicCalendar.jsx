import React, { useState, useEffect } from 'react';

const AcademicCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    event_type: 'general',
    location: ''
  });

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/calendar');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add event
  const addEvent = async () => {
    if (!formData.title || !formData.date) {
      alert('Please enter title and date');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Event added successfully!');
        setShowAddModal(false);
        setFormData({ title: '', description: '', date: '', event_type: 'general', location: '' });
        fetchEvents();
      } else {
        alert('Failed to add event');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    if (window.confirm('Delete this event?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/calendar/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Event deleted!');
          fetchEvents();
        } else {
          alert('Failed to delete');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  // Filter events
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getMonthDay = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate()
    };
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
    eventsContainer: {
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
    eventCard: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      transition: 'all 0.3s'
    },
    dateBox: {
      background: 'rgba(102,126,234,0.15)',
      borderRadius: '12px',
      padding: '12px 16px',
      textAlign: 'center',
      minWidth: '70px'
    },
    dateMonth: {
      fontSize: '12px',
      color: '#667eea',
      textTransform: 'uppercase'
    },
    dateDay: {
      fontSize: '24px',
      fontWeight: 700,
      color: 'white'
    },
    eventTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '4px',
      color: 'white'
    },
    eventDate: {
      fontSize: '13px',
      color: '#94a3b8'
    },
    eventDescription: {
      fontSize: '14px',
      color: '#94a3b8',
      marginTop: '8px'
    },
    eventTypeBadge: (type) => ({
      display: 'inline-block',
      marginTop: '8px',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      background: type === 'exam' ? 'rgba(245,158,11,0.2)' : type === 'holiday' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
      color: type === 'exam' ? '#f59e0b' : type === 'holiday' ? '#ef4444' : '#10b981'
    }),
    deleteBtn: {
      background: 'rgba(239,68,68,0.15)',
      border: '1px solid rgba(239,68,68,0.3)',
      color: '#ef4444',
      padding: '8px 12px',
      borderRadius: '8px',
      cursor: 'pointer'
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
      width: '450px',
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
    formSelect: {
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
          <div style={{ color: '#94a3b8' }}>Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Academic Calendar</h1>
          <p style={styles.pageSubtitle}>Manage events, holidays, exams, and academic deadlines</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={styles.addButton}>
          <i className="fas fa-plus"></i> Add Event
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{events.length}</div>
          <div style={styles.statLabel}>Total Events</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{events.filter(e => new Date(e.date) >= new Date()).length}</div>
          <div style={styles.statLabel}>Upcoming</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{events.filter(e => e.event_type === 'exam').length}</div>
          <div style={styles.statLabel}>Exams</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{events.filter(e => e.event_type === 'holiday').length}</div>
          <div style={styles.statLabel}>Holidays</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
        </div>
        <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} style={styles.clearButton}>
          <i className="fas fa-filter"></i> Clear Filters
        </button>
      </div>

      {/* Events List */}
      <div style={styles.eventsContainer}>
        <h2 style={styles.sectionTitle}>Events Calendar</h2>
        
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <i className="fas fa-calendar-alt" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></i>
            <p>No events scheduled yet. Click "Add Event" to create one.</p>
          </div>
        ) : (
          <div>
            {paginatedEvents.map(event => {
              const { month, day } = getMonthDay(event.date);
              return (
                <div key={event.id} style={styles.eventCard}>
                  <div style={styles.dateBox}>
                    <div style={styles.dateMonth}>{month}</div>
                    <div style={styles.dateDay}>{day}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={styles.eventTitle}>{event.title}</h3>
                    <p style={styles.eventDate}>{formatDate(event.date)}</p>
                    {event.description && <p style={styles.eventDescription}>{event.description}</p>}
                    <span style={styles.eventTypeBadge(event.event_type)}>
                      {event.event_type === 'exam' ? 'Exam' : event.event_type === 'holiday' ? 'Holiday' : event.event_type === 'academic' ? 'Academic' : 'General'}
                    </span>
                  </div>
                  <button onClick={() => deleteEvent(event.id)} style={styles.deleteBtn}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <div style={styles.paginationText}>
              Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredEvents.length)} of {filteredEvents.length} events
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

      {/* Add Event Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Add Calendar Event</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Event Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Midterm Exams" style={styles.formInput} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Date *</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} style={styles.formInput} />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Event Type</label>
              <select value={formData.event_type} onChange={(e) => setFormData({...formData, event_type: e.target.value})} style={styles.formSelect}>
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="exam">Exam</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Description</label>
              <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Event description..." style={styles.formTextarea}></textarea>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Location (optional)</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g., Room 201, Online" style={styles.formInput} />
            </div>
            
            <div style={styles.modalButtons}>
              <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>Cancel</button>
              <button onClick={addEvent} style={styles.submitButton}>Create Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;
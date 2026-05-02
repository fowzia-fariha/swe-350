
import React, { useState, useEffect } from 'react';

const AcademicCalendar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
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
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
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
    if (confirm('Delete this event?')) {
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

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1e', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        @keyframes orbFloat {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          25% { transform: translate(5%,-5%) scale(1.2) rotate(90deg); }
          50% { transform: translate(-5%,5%) scale(0.9) rotate(180deg); }
          75% { transform: translate(3%,-3%) scale(1.1) rotate(270deg); }
        }
      `}</style>

      {/* Background Effects */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%), linear-gradient(180deg, #0a0a15 0%, #0f0f1e 50%, #1a1a2e 100%)', zIndex: -2 }}></div>
      <div style={{ position: 'fixed', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%)', top: '-30%', left: '-20%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', zIndex: -1 }}></div>
      <div style={{ position: 'fixed', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)', bottom: '-20%', right: '-15%', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, animation: 'orbFloat 25s ease-in-out infinite', animationDelay: '-12s', zIndex: -1 }}></div>

      {/* Sidebar */}
      <div style={{ width: '280px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.1)', position: 'fixed', height: '100vh', left: 0, top: 0, padding: '30px 0' }}>
        <div style={{ padding: '0 30px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⚙️</div>
            <div><h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white' }}>SWE<span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hub</span></h2><p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Admin Dashboard</p></div>
          </div>
        </div>
        <nav style={{ padding: '0 20px' }}>
          {['Dashboard', 'User Management', 'Student Records', 'Faculty Management', 'Results & Grades', 'Course Catalog', 'Academic Calendar', 'System Settings', 'Security & Logs', 'Reports & Export'].map((item, i) => (
            <div key={i} style={{ padding: '12px 18px', margin: '4px 0', borderRadius: '12px', background: item === 'Academic Calendar' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent', color: item === 'Academic Calendar' ? 'white' : 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
              <i className={`fas fa-${item === 'Dashboard' ? 'home' : item === 'User Management' ? 'users' : item === 'Student Records' ? 'graduation-cap' : item === 'Faculty Management' ? 'chalkboard-teacher' : item === 'Results & Grades' ? 'chart-bar' : item === 'Course Catalog' ? 'book' : item === 'Academic Calendar' ? 'calendar-alt' : item === 'System Settings' ? 'cogs' : item === 'Security & Logs' ? 'shield-alt' : 'file-export'}`} style={{ width: '24px', marginRight: '12px' }}></i>
              <span>{item}</span>
            </div>
          ))}
        </nav>
        <div style={{ padding: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto', position: 'absolute', bottom: 0, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AD</div>
            <div><h4 style={{ fontSize: '14px', fontWeight: 600 }}>Admin Officer</h4><p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Administrator</p></div>
          </div>
          <button onClick={() => { if(confirm('Logout?')) alert('Logged out'); }} style={{ width: '100%', marginTop: '15px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: '12px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '280px', padding: '30px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800 }}>Academic Calendar</h1>
            <p style={{ color: '#94a3b8' }}>Manage events, holidays, exams, and academic deadlines</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
          >
            <i className="fas fa-plus"></i> Add Event
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#667eea' }}>{events.length}</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Total Events</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#667eea' }}>{events.filter(e => new Date(e.date) >= new Date()).length}</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Upcoming</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#667eea' }}>{events.filter(e => e.event_type === 'exam').length}</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Exams</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#667eea' }}>{events.filter(e => e.event_type === 'holiday').length}</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Holidays</div>
          </div>
        </div>

        {/* Events List */}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px' }}>
          <h2 style={{ marginBottom: '20px' }}>Events Calendar</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading events...</div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
              <i className="fas fa-calendar-alt" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></i>
              <p>No events scheduled yet. Click "Add Event" to create one.</p>
            </div>
          ) : (
            <div>
              {events.map(event => {
                const { month, day } = getMonthDay(event.date);
                return (
                  <div key={event.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '16px', transition: 'all 0.3s' }}>
                    <div style={{ background: 'rgba(102,126,234,0.15)', borderRadius: '12px', padding: '12px 16px', textAlign: 'center', minWidth: '70px' }}>
                      <div style={{ fontSize: '12px', color: '#667eea', textTransform: 'uppercase' }}>{month}</div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>{day}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{event.title}</h3>
                      <p style={{ fontSize: '13px', color: '#94a3b8' }}>{formatDate(event.date)}</p>
                      {event.description && <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '8px' }}>{event.description}</p>}
                      {event.event_type && (
                        <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: event.event_type === 'exam' ? 'rgba(245,158,11,0.2)' : event.event_type === 'holiday' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', color: event.event_type === 'exam' ? '#f59e0b' : event.event_type === 'holiday' ? '#ef4444' : '#10b981' }}>
                          {event.event_type === 'exam' ? 'Exam' : event.event_type === 'holiday' ? 'Holiday' : 'Academic'}
                        </span>
                      )}
                    </div>
                    <button onClick={() => deleteEvent(event.id)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAddModal(false)}>
          <div style={{ background: '#1e1e2e', borderRadius: '24px', padding: '32px', width: '450px', maxWidth: '90%' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px', color: 'white' }}>Add Calendar Event</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>Event Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Midterm Exams" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>Date *</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>Event Type</label>
              <select value={formData.event_type} onChange={(e) => setFormData({...formData, event_type: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}>
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="exam">Exam</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>Description</label>
              <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Event description..." style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', resize: 'vertical' }}></textarea>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>Location (optional)</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g., Room 201, Online" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>Cancel</button>
              <button onClick={addEvent} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>Create Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;

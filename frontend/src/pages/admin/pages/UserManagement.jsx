import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student' });

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = async () => {
    if (!formData.name || !formData.email) {
      alert('Please enter name and email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('User added successfully!');
        setShowAddModal(false);
        setFormData({ name: '', email: '', role: 'student' });
        fetchUsers();
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (window.confirm('Delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('User deleted!');
          fetchUsers();
        } else {
          alert('Failed to delete');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  // Edit user
  const editUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${selectedUser.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, is_active: 1 })
      });

      if (response.ok) {
        alert('User updated successfully!');
        setShowEditModal(false);
        setFormData({ name: '', email: '', role: 'student' });
        fetchUsers();
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_active === 1).length;
  const facultyCount = users.filter(u => u.role === 'teacher').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.user_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || (statusFilter === 'active' && user.is_active === 1) || (statusFilter === 'inactive' && user.is_active === 0);
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const usersPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

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
      flexWrap: 'wrap'
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
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      color: '#94a3b8',
      fontWeight: 500,
      fontSize: '13px'
    },
    td: {
      padding: '12px',
      fontSize: '13px'
    },
    tdName: {
      padding: '12px',
      fontSize: '13px',
      fontWeight: 500,
      color: 'white'
    },
    tdEmail: {
      padding: '12px',
      fontSize: '13px',
      color: '#94a3b8'
    },
    roleBadge: (role) => ({
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      background: role === 'admin' ? 'rgba(239,68,68,0.15)' : role === 'teacher' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
      color: role === 'admin' ? '#ef4444' : role === 'teacher' ? '#10b981' : '#3b82f6'
    }),
    statusBadge: (isActive) => ({
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      background: isActive === 1 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
      color: isActive === 1 ? '#10b981' : '#ef4444'
    }),
    editButton: {
      background: 'rgba(59,130,246,0.15)',
      border: '1px solid rgba(59,130,246,0.3)',
      color: '#3b82f6',
      padding: '6px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      marginRight: '8px'
    },
    deleteButton: {
      background: 'rgba(239,68,68,0.15)',
      border: '1px solid rgba(239,68,68,0.3)',
      color: '#ef4444',
      padding: '6px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
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
    paginationButton: {
      padding: '8px 16px',
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '8px',
      color: '#94a3b8',
      cursor: 'pointer'
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
      marginBottom: '20px',
      fontSize: '22px',
      fontWeight: 600,
      color: 'white'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#94a3b8',
      fontSize: '13px'
    },
    input: {
      width: '100%',
      padding: '12px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '10px',
      color: 'white',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '12px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '10px',
      color: 'white',
      cursor: 'pointer'
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '20px'
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

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>User Management</h1>
          <p style={styles.pageSubtitle}>Manage user accounts, roles, and permissions</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={styles.addButton}>
          <i className="fas fa-plus"></i> Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalUsers}</div>
          <div style={styles.statLabel}>Total Users</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{activeUsers}</div>
          <div style={styles.statLabel}>Active Users</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{facultyCount}</div>
          <div style={styles.statLabel}>Faculty</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{adminCount}</div>
          <div style={styles.statLabel}>Admins</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={styles.selectInput}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.selectInput}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={() => { setRoleFilter(''); setStatusFilter(''); setSearchTerm(''); }} style={styles.clearButton}>
          Clear Filters
        </button>
      </div>

      {/* Users Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableTitle}>All Users</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading users...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={styles.th}>User ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.user_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={styles.td}>{user.user_id}</td>
                    <td style={styles.tdName}>{user.name}</td>
                    <td style={styles.tdEmail}>{user.email}</td>
                    <td style={styles.td}>
                      <span style={styles.roleBadge(user.role)}>
                        {user.role === 'admin' ? 'Admin' : user.role === 'teacher' ? 'Teacher' : 'Student'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(user.is_active)}>
                        {user.is_active === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => openEditModal(user)} style={styles.editButton}>
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button onClick={() => deleteUser(user.user_id)} style={styles.deleteButton}>
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <div style={styles.paginationText}>Page {currentPage} of {totalPages}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} style={{ ...styles.paginationButton, opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} style={{ ...styles.paginationButton, opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Add New User</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter full name" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Enter email address" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={styles.select}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div style={styles.modalButtons}>
              <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>Cancel</button>
              <button onClick={addUser} style={styles.submitButton}>Create User</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Edit User</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.input} />
            </div>
            <div style={styles.modalButtons}>
              <button onClick={() => setShowEditModal(false)} style={styles.cancelButton}>Cancel</button>
              <button onClick={editUser} style={styles.submitButton}>Update User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
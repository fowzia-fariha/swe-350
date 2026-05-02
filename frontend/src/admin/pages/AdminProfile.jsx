// // import React, { useState, useEffect } from 'react';

// // const AdminProfile = () => {
// //   const [profile, setProfile] = useState({
// //     name: '',
// //     email: '',
// //     role: '',
// //     phone: '',
// //     location: '',
// //     bio: '',
// //     avatar_initials: ''
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [editing, setEditing] = useState(false);
// //   const [formData, setFormData] = useState({});

// //   // Fetch profile
// //   const fetchProfile = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('http://localhost:5000/api/admin/profile');
// //       const data = await response.json();
// //       setProfile(data);
// //       setFormData(data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching profile:', error);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   // Update profile
// //   const updateProfile = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/admin/profile', {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });
      
// //       const result = await response.json();
      
// //       if (response.ok) {
// //         alert('Profile updated successfully!');
// //         setProfile(formData);
// //         setEditing(false);
// //         fetchProfile();
// //       } else {
// //         alert('Failed to update profile: ' + (result.error || 'Unknown error'));
// //       }
// //     } catch (error) {
// //       alert('Error: ' + error.message);
// //     }
// //   };

// //   const styles = {
// //     container: {
// //       minHeight: '100vh',
// //       background: '#0a0a15',
// //       fontFamily: "'Inter', sans-serif",
// //       color: 'white'
// //     },
// //     header: {
// //       display: 'flex',
// //       justifyContent: 'space-between',
// //       alignItems: 'center',
// //       marginBottom: '30px',
// //       flexWrap: 'wrap',
// //       gap: '15px'
// //     },
// //     pageTitle: {
// //       fontSize: '28px',
// //       fontWeight: 700,
// //       background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //       WebkitBackgroundClip: 'text',
// //       WebkitTextFillColor: 'transparent',
// //       marginBottom: '4px'
// //     },
// //     pageSubtitle: {
// //       color: '#94a3b8',
// //       fontSize: '14px'
// //     },
// //     editButton: {
// //       background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //       color: 'white',
// //       border: 'none',
// //       padding: '10px 20px',
// //       borderRadius: '10px',
// //       fontWeight: 500,
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '8px'
// //     },
// //     cancelButton: {
// //       background: '#1a1a2e',
// //       border: '1px solid rgba(102,126,234,0.3)',
// //       color: 'white',
// //       padding: '10px 20px',
// //       borderRadius: '10px',
// //       fontWeight: 500,
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '8px'
// //     },
// //     saveButton: {
// //       background: '#10b981',
// //       color: 'white',
// //       border: 'none',
// //       padding: '10px 20px',
// //       borderRadius: '10px',
// //       fontWeight: 500,
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '8px'
// //     },
// //     profileGrid: {
// //       display: 'grid',
// //       gridTemplateColumns: '300px 1fr',
// //       gap: '24px'
// //     },
// //     profileCard: {
// //       background: '#1a1a2e',
// //       borderRadius: '20px',
// //       padding: '32px',
// //       textAlign: 'center',
// //       border: '1px solid rgba(255,255,255,0.05)'
// //     },
// //     avatar: {
// //       width: '120px',
// //       height: '120px',
// //       borderRadius: '60px',
// //       background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       fontSize: '42px',
// //       fontWeight: 600,
// //       color: 'white',
// //       margin: '0 auto 16px'
// //     },
// //     avatarInput: {
// //       width: '80px',
// //       height: '80px',
// //       borderRadius: '40px',
// //       textAlign: 'center',
// //       fontSize: '32px',
// //       background: '#0a0a15',
// //       border: '1px solid rgba(102,126,234,0.3)',
// //       color: 'white'
// //     },
// //     profileName: {
// //       fontSize: '20px',
// //       fontWeight: 600,
// //       marginBottom: '4px'
// //     },
// //     profileRole: {
// //       color: '#667eea',
// //       fontSize: '13px'
// //     },
// //     infoCard: {
// //       background: '#1a1a2e',
// //       borderRadius: '20px',
// //       padding: '32px',
// //       border: '1px solid rgba(255,255,255,0.05)'
// //     },
// //     infoTitle: {
// //       fontSize: '18px',
// //       fontWeight: 600,
// //       marginBottom: '20px'
// //     },
// //     infoRow: {
// //       display: 'grid',
// //       gridTemplateColumns: '120px 1fr',
// //       alignItems: 'center',
// //       padding: '12px 0',
// //       borderBottom: '1px solid rgba(255,255,255,0.05)'
// //     },
// //     infoLabel: {
// //       color: '#94a3b8',
// //       fontSize: '13px'
// //     },
// //     infoValue: {
// //       color: 'white',
// //       fontSize: '14px',
// //       fontWeight: 500
// //     },
// //     inputField: {
// //       padding: '10px',
// //       background: '#0a0a15',
// //       border: '1px solid rgba(102,126,234,0.3)',
// //       borderRadius: '8px',
// //       color: 'white',
// //       fontSize: '14px',
// //       width: '100%'
// //     },
// //     textareaField: {
// //       padding: '10px',
// //       background: '#0a0a15',
// //       border: '1px solid rgba(102,126,234,0.3)',
// //       borderRadius: '8px',
// //       color: 'white',
// //       fontSize: '14px',
// //       width: '100%',
// //       resize: 'vertical'
// //     },
// //     buttonGroup: {
// //       display: 'flex',
// //       gap: '12px',
// //       justifyContent: 'flex-end',
// //       marginTop: '20px'
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div style={styles.container}>
// //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //           <div style={{ color: '#94a3b8' }}>Loading profile...</div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={styles.container}>
// //       {/* Header */}
// //       <div style={styles.header}>
// //         <div>
// //           <h1 style={styles.pageTitle}>Admin Profile</h1>
// //           <p style={styles.pageSubtitle}>Manage your account settings and profile information</p>
// //         </div>
// //         {!editing ? (
// //           <button onClick={() => setEditing(true)} style={styles.editButton}>
// //             <i className="fas fa-edit"></i> Edit Profile
// //           </button>
// //         ) : (
// //           <div style={{ display: 'flex', gap: '12px' }}>
// //             <button onClick={() => { setEditing(false); setFormData(profile); }} style={styles.cancelButton}>
// //               Cancel
// //             </button>
// //             <button onClick={updateProfile} style={styles.saveButton}>
// //               <i className="fas fa-save"></i> Save Changes
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Profile Grid */}
// //       <div style={styles.profileGrid}>
// //         {/* Left Column - Avatar */}
// //         <div style={styles.profileCard}>
// //           <div style={styles.avatar}>
// //             {editing ? (
// //               <input 
// //                 type="text" 
// //                 maxLength="2" 
// //                 value={formData.avatar_initials || ''} 
// //                 onChange={(e) => setFormData({...formData, avatar_initials: e.target.value.toUpperCase()})} 
// //                 style={styles.avatarInput} 
// //               />
// //             ) : (
// //               profile.avatar_initials || 'EA'
// //             )}
// //           </div>
// //           <h2 style={styles.profileName}>{profile.name}</h2>
// //           <p style={styles.profileRole}>{profile.role}</p>
// //         </div>

// //         {/* Right Column - Details */}
// //         <div style={styles.infoCard}>
// //           <h3 style={styles.infoTitle}>Personal Information</h3>
          
// //           <div style={styles.infoRow}>
// //             <span style={styles.infoLabel}>Full Name</span>
// //             {editing ? 
// //               <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={styles.inputField} /> :
// //               <span style={styles.infoValue}>{profile.name}</span>
// //             }
// //           </div>
          
// //           <div style={styles.infoRow}>
// //             <span style={styles.infoLabel}>Email Address</span>
// //             {editing ? 
// //               <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.inputField} /> :
// //               <span style={styles.infoValue}>{profile.email}</span>
// //             }
// //           </div>
          
// //           <div style={styles.infoRow}>
// //             <span style={styles.infoLabel}>Role</span>
// //             {editing ? 
// //               <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={styles.inputField} /> :
// //               <span style={styles.infoValue}>{profile.role}</span>
// //             }
// //           </div>
          
// //           <div style={styles.infoRow}>
// //             <span style={styles.infoLabel}>Phone Number</span>
// //             {editing ? 
// //               <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={styles.inputField} /> :
// //               <span style={styles.infoValue}>{profile.phone}</span>
// //             }
// //           </div>
          
// //           <div style={styles.infoRow}>
// //             <span style={styles.infoLabel}>Location</span>
// //             {editing ? 
// //               <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={styles.inputField} /> :
// //               <span style={styles.infoValue}>{profile.location}</span>
// //             }
// //           </div>
          
// //           <div style={styles.infoRow}>
// //             <span style={styles.infoLabel}>Bio</span>
// //             {editing ? 
// //               <textarea rows="3" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} style={styles.textareaField} /> :
// //               <span style={styles.infoValue}>{profile.bio}</span>
// //             }
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminProfile;


// import React, { useState, useEffect } from 'react';

// const AdminProfile = () => {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     role: '',
//     phone: '',
//     location: '',
//     bio: '',
//     avatar_initials: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({});

//   const fetchProfile = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/admin/profile');
//       const data = await response.json();
//       setProfile(data);
//       setFormData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const updateProfile = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/admin/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
      
//       if (response.ok) {
//         alert('Profile updated successfully!');
//         setProfile(formData);
//         setEditing(false);
//       } else {
//         alert('Failed to update profile');
//       }
//     } catch (error) {
//       alert('Error: ' + error.message);
//     }
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: '#0a0a15',
//       fontFamily: "'Inter', sans-serif",
//       color: 'white'
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '30px',
//       flexWrap: 'wrap',
//       gap: '15px'
//     },
//     pageTitle: {
//       fontSize: '28px',
//       fontWeight: 700,
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       marginBottom: '4px'
//     },
//     pageSubtitle: {
//       color: '#94a3b8',
//       fontSize: '14px'
//     },
//     editButton: {
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       color: 'white',
//       border: 'none',
//       padding: '10px 20px',
//       borderRadius: '10px',
//       fontWeight: 500,
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: '12px'
//     },
//     cancelButton: {
//       background: '#1a1a2e',
//       border: '1px solid rgba(102,126,234,0.3)',
//       color: 'white',
//       padding: '10px 20px',
//       borderRadius: '10px',
//       cursor: 'pointer'
//     },
//     saveButton: {
//       background: '#10b981',
//       color: 'white',
//       border: 'none',
//       padding: '10px 20px',
//       borderRadius: '10px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
//     profileGrid: {
//       display: 'grid',
//       gridTemplateColumns: '300px 1fr',
//       gap: '24px'
//     },
//     profileCard: {
//       background: '#1a1a2e',
//       borderRadius: '20px',
//       padding: '32px',
//       textAlign: 'center',
//       border: '1px solid rgba(255,255,255,0.05)'
//     },
//     avatar: {
//       width: '100px',
//       height: '100px',
//       borderRadius: '50%',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '36px',
//       fontWeight: 600,
//       color: 'white',
//       margin: '0 auto 16px'
//     },
//     avatarInput: {
//       width: '80px',
//       height: '80px',
//       borderRadius: '40px',
//       textAlign: 'center',
//       fontSize: '32px',
//       background: '#0a0a15',
//       border: '1px solid rgba(102,126,234,0.3)',
//       color: 'white',
//       margin: '0 auto'
//     },
//     profileName: {
//       fontSize: '20px',
//       fontWeight: 600,
//       marginBottom: '4px',
//       color: 'white'
//     },
//     profileRole: {
//       color: '#667eea',
//       fontSize: '13px'
//     },
//     infoCard: {
//       background: '#1a1a2e',
//       borderRadius: '20px',
//       padding: '32px',
//       border: '1px solid rgba(255,255,255,0.05)'
//     },
//     infoTitle: {
//       fontSize: '18px',
//       fontWeight: 600,
//       marginBottom: '20px',
//       color: 'white'
//     },
//     infoRow: {
//       display: 'grid',
//       gridTemplateColumns: '120px 1fr',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid rgba(255,255,255,0.05)'
//     },
//     infoLabel: {
//       color: '#94a3b8',
//       fontSize: '13px'
//     },
//     infoValue: {
//       color: 'white',
//       fontSize: '14px',
//       fontWeight: 500
//     },
//     inputField: {
//       padding: '10px',
//       background: '#0a0a15',
//       border: '1px solid rgba(102,126,234,0.3)',
//       borderRadius: '8px',
//       color: 'white',
//       fontSize: '14px',
//       width: '100%'
//     },
//     textareaField: {
//       padding: '10px',
//       background: '#0a0a15',
//       border: '1px solid rgba(102,126,234,0.3)',
//       borderRadius: '8px',
//       color: 'white',
//       fontSize: '14px',
//       width: '100%',
//       resize: 'vertical',
//       fontFamily: "'Inter', sans-serif"
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//           <div style={{ color: '#94a3b8' }}>Loading profile...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.pageTitle}>Admin Profile</h1>
//           <p style={styles.pageSubtitle}>Manage your account settings and profile information</p>
//         </div>
//         {!editing ? (
//           <button onClick={() => setEditing(true)} style={styles.editButton}>
//             <i className="fas fa-edit"></i> Edit Profile
//           </button>
//         ) : (
//           <div style={styles.buttonGroup}>
//             <button onClick={() => { setEditing(false); setFormData(profile); }} style={styles.cancelButton}>
//               Cancel
//             </button>
//             <button onClick={updateProfile} style={styles.saveButton}>
//               <i className="fas fa-save"></i> Save Changes
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Profile Grid */}
//       <div style={styles.profileGrid}>
//         {/* Left Column - Avatar */}
//         <div style={styles.profileCard}>
//           <div style={styles.avatar}>
//             {editing ? (
//               <input 
//                 type="text" 
//                 maxLength="2" 
//                 value={formData.avatar_initials || ''} 
//                 onChange={(e) => setFormData({...formData, avatar_initials: e.target.value.toUpperCase()})} 
//                 style={styles.avatarInput} 
//               />
//             ) : (
//               profile.avatar_initials || 'EA'
//             )}
//           </div>
//           <h2 style={styles.profileName}>{profile.name}</h2>
//           <p style={styles.profileRole}>{profile.role}</p>
//         </div>

//         {/* Right Column - Details */}
//         <div style={styles.infoCard}>
//           <h3 style={styles.infoTitle}>Personal Information</h3>
          
//           <div style={styles.infoRow}>
//             <span style={styles.infoLabel}>Full Name</span>
//             {editing ? 
//               <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={styles.inputField} /> :
//               <span style={styles.infoValue}>{profile.name}</span>
//             }
//           </div>
          
//           <div style={styles.infoRow}>
//             <span style={styles.infoLabel}>Email Address</span>
//             {editing ? 
//               <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.inputField} /> :
//               <span style={styles.infoValue}>{profile.email}</span>
//             }
//           </div>
          
//           <div style={styles.infoRow}>
//             <span style={styles.infoLabel}>Role</span>
//             {editing ? 
//               <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={styles.inputField} /> :
//               <span style={styles.infoValue}>{profile.role}</span>
//             }
//           </div>
          
//           <div style={styles.infoRow}>
//             <span style={styles.infoLabel}>Phone Number</span>
//             {editing ? 
//               <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={styles.inputField} /> :
//               <span style={styles.infoValue}>{profile.phone}</span>
//             }
//           </div>
          
//           <div style={styles.infoRow}>
//             <span style={styles.infoLabel}>Location</span>
//             {editing ? 
//               <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={styles.inputField} /> :
//               <span style={styles.infoValue}>{profile.location}</span>
//             }
//           </div>
          
//           <div style={styles.infoRow}>
//             <span style={styles.infoLabel}>Bio</span>
//             {editing ? 
//               <textarea rows="3" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} style={styles.textareaField} /> :
//               <span style={styles.infoValue}>{profile.bio}</span>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    location: '',
    bio: '',
    avatar_initials: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/profile');
      const data = await response.json();
      setProfile(data);
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Profile updated successfully!');
        setProfile(formData);
        setEditing(false);
      } else {
        alert('Failed to update profile: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
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
    editButton: {
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
    cancelButton: {
      background: '#1a1a2e',
      border: '1px solid rgba(102,126,234,0.3)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '10px',
      cursor: 'pointer'
    },
    saveButton: {
      background: '#10b981',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    profileGrid: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '24px'
    },
    profileCard: {
      background: '#1a1a2e',
      borderRadius: '20px',
      padding: '32px',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      fontWeight: 600,
      color: 'white',
      margin: '0 auto 16px'
    },
    avatarInput: {
      width: '80px',
      height: '80px',
      borderRadius: '40px',
      textAlign: 'center',
      fontSize: '32px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      color: 'white'
    },
    profileName: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '4px',
      color: 'white'
    },
    profileRole: {
      color: '#667eea',
      fontSize: '13px'
    },
    infoCard: {
      background: '#1a1a2e',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    infoTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '20px',
      color: 'white'
    },
    infoRow: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    infoLabel: {
      color: '#94a3b8',
      fontSize: '13px'
    },
    infoValue: {
      color: 'white',
      fontSize: '14px',
      fontWeight: 500
    },
    inputField: {
      padding: '10px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      width: '100%'
    },
    textareaField: {
      padding: '10px',
      background: '#0a0a15',
      border: '1px solid rgba(102,126,234,0.3)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      width: '100%',
      resize: 'vertical',
      fontFamily: "'Inter', sans-serif"
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ color: '#94a3b8' }}>Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Admin Profile</h1>
          <p style={styles.pageSubtitle}>Manage your account settings and profile information</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} style={styles.editButton}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => { setEditing(false); setFormData(profile); }} style={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={updateProfile} style={styles.saveButton}>
              <i className="fas fa-save"></i> Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Grid */}
      <div style={styles.profileGrid}>
        {/* Left Column - Avatar */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            {editing ? (
              <input 
                type="text" 
                maxLength="2" 
                value={formData.avatar_initials || ''} 
                onChange={(e) => setFormData({...formData, avatar_initials: e.target.value.toUpperCase()})} 
                style={styles.avatarInput} 
              />
            ) : (
              profile.avatar_initials || 'EA'
            )}
          </div>
          <h2 style={styles.profileName}>{profile.name}</h2>
          <p style={styles.profileRole}>{profile.role}</p>
        </div>

        {/* Right Column - Details */}
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Personal Information</h3>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Full Name</span>
            {editing ? 
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={styles.inputField} /> :
              <span style={styles.infoValue}>{profile.name}</span>
            }
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Email Address</span>
            {editing ? 
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.inputField} /> :
              <span style={styles.infoValue}>{profile.email}</span>
            }
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Role</span>
            {editing ? 
              <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={styles.inputField} /> :
              <span style={styles.infoValue}>{profile.role}</span>
            }
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Phone Number</span>
            {editing ? 
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={styles.inputField} /> :
              <span style={styles.infoValue}>{profile.phone}</span>
            }
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Location</span>
            {editing ? 
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={styles.inputField} /> :
              <span style={styles.infoValue}>{profile.location}</span>
            }
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Bio</span>
            {editing ? 
              <textarea rows="3" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} style={styles.textareaField} /> :
              <span style={styles.infoValue}>{profile.bio}</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
// // import { Outlet } from 'react-router-dom'
// // import Sidebar from './components/Sidebar.jsx'

// // export default function AdminLayout() {
// //   return (
// //     <div className="flex h-screen bg-gray-100 overflow-hidden">
// //       <Sidebar />
// //       <main className="flex-1 overflow-y-auto p-6">
// //         <Outlet />
// //       </main>
// //     </div>
// //   )
// // }

// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const [sidebarActive, setSidebarActive] = useState(false);
//   const [profile, setProfile] = useState({ name: 'EduAdmin', avatar: 'EA', email: 'eduadmin@swehub.com' });

//   const menuItems = [
//     { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer-alt', path: '/' },
//     { id: 'users', name: 'User Management', icon: 'fa-users', path: '/users' },
//     { id: 'students', name: 'Student Records', icon: 'fa-graduation-cap', path: '/students' },
//     { id: 'faculty', name: 'Faculty Management', icon: 'fa-chalkboard-teacher', path: '/faculty' },
//     { id: 'results', name: 'Results & Grades', icon: 'fa-chart-line', path: '/results' },
//     { id: 'courses', name: 'Course Catalog', icon: 'fa-book', path: '/courses' },
//     { id: 'calendar', name: 'Academic Calendar', icon: 'fa-calendar-alt', path: '/calendar' },
//     { id: 'settings', name: 'System Settings', icon: 'fa-cogs', path: '/settings' },
//     { id: 'reports', name: 'Reports & Export', icon: 'fa-file-alt', path: '/reports' }
//   ];

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('token');
//       alert('Logged out successfully');
//       navigate('/login');
//     }
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       minHeight: '100vh',
//       background: '#0a0a15',
//       fontFamily: "'Inter', sans-serif"
//     },
//     sidebar: {
//       width: '280px',
//       background: '#0d0d1a',
//       borderRight: '1px solid rgba(255,255,255,0.05)',
//       position: 'fixed',
//       height: '100vh',
//       overflowY: 'auto',
//       zIndex: 99,
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     logoArea: {
//       padding: '24px 20px',
//       borderBottom: '1px solid rgba(255,255,255,0.05)'
//     },
//     logo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px'
//     },
//     logoIcon: {
//       width: '42px',
//       height: '42px',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       borderRadius: '12px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '22px'
//     },
//     logoText: {
//       fontSize: '22px',
//       fontWeight: 700,
//       color: 'white'
//     },
//     logoTextSpan: {
//       color: '#667eea'
//     },
//     logoSpan: {
//       fontSize: '11px',
//       color: '#667eea',
//       marginTop: '2px'
//     },
//     nav: {
//       flex: 1,
//       padding: '20px 16px'
//     },
//     navItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '14px',
//       padding: '12px 16px',
//       marginBottom: '4px',
//       borderRadius: '12px',
//       cursor: 'pointer',
//       transition: 'all 0.2s',
//       color: '#94a3b8'
//     },
//     navIcon: {
//       fontSize: '18px',
//       width: '22px'
//     },
//     navText: {
//       fontSize: '14px',
//       fontWeight: 500
//     },
//     profileSection: {
//       padding: '20px',
//       borderTop: '1px solid rgba(255,255,255,0.05)'
//     },
//     profileCard: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       padding: '12px',
//       background: 'rgba(255,255,255,0.03)',
//       borderRadius: '12px',
//       marginBottom: '12px'
//     },
//     avatar: {
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '16px',
//       fontWeight: 600,
//       color: 'white'
//     },
//     profileName: {
//       fontSize: '14px',
//       fontWeight: 500,
//       color: 'white'
//     },
//     profileEmail: {
//       fontSize: '11px',
//       color: '#94a3b8'
//     },
//     logoutButton: {
//       width: '100%',
//       padding: '10px',
//       background: 'rgba(239,68,68,0.1)',
//       border: '1px solid rgba(239,68,68,0.2)',
//       color: '#ef4444',
//       borderRadius: '10px',
//       fontSize: '13px',
//       fontWeight: 500,
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px'
//     },
//     mainContent: {
//       flex: 1,
//       marginLeft: '280px',
//       padding: '24px 32px',
//       background: '#0a0a15',
//       minHeight: '100vh'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <aside style={styles.sidebar}>
//         <div style={styles.logoArea}>
//           <div style={styles.logo}>
//             <div style={styles.logoIcon}>⚙️</div>
//             <div>
//               <h2 style={styles.logoText}>SWE<span style={styles.logoTextSpan}>Hub</span></h2>
//               <p style={styles.logoSpan}>Administration Panel</p>
//             </div>
//           </div>
//         </div>

//         <nav style={styles.nav}>
//           {menuItems.map((item) => (
//             <div
//               key={item.id}
//               style={styles.navItem}
//               onClick={() => navigate(item.path)}
//             >
//               <i className={`fas ${item.icon}`} style={styles.navIcon}></i>
//               <span style={styles.navText}>{item.name}</span>
//             </div>
//           ))}
//         </nav>

//         <div style={styles.profileSection}>
//           <div style={styles.profileCard}>
//             <div style={styles.avatar}>{profile.avatar}</div>
//             <div>
//               <div style={styles.profileName}>{profile.name}</div>
//               <div style={styles.profileEmail}>{profile.email}</div>
//             </div>
//           </div>
//           <button onClick={handleLogout} style={styles.logoutButton}>
//             <i className="fas fa-sign-out-alt"></i> Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main style={styles.mainContent}>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0a0a15',
      fontFamily: "'Inter', sans-serif"
    },
    mainContent: {
      padding: '24px 32px',
      background: '#0a0a15',
      minHeight: '100vh'
    }
  };

  return (
    <div style={styles.container}>
      <main style={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
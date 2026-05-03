// import React, { useState, useEffect } from 'react';
// import UserManagement from './UserManagement';
// import StudentRecords from './StudentRecords';
// import FacultyManagement from './FacultyManagement';
// import Results from './Results';
// import CourseCatalog from './CourseCatalog';
// import AcademicCalendar from './AcademicCalendar';
// import Settings from './Settings';
// import Reports from './Reports';
// import AdminProfile from './AdminProfile';

// const Dashboard = () => {
//   const [sidebarActive, setSidebarActive] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [profile, setProfile] = useState({ name: 'EduAdmin', avatar: 'EA', email: 'eduadmin@swehub.com' });

//   const menuItems = [
//     { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer-alt' },
//     { id: 'users', name: 'User Management', icon: 'fa-users' },
//     { id: 'students', name: 'Student Records', icon: 'fa-graduation-cap' },
//     { id: 'faculty', name: 'Faculty Management', icon: 'fa-chalkboard-teacher' },
//     { id: 'results', name: 'Results & Grades', icon: 'fa-chart-line' },
//     { id: 'courses', name: 'Course Catalog', icon: 'fa-book' },
//     { id: 'calendar', name: 'Academic Calendar', icon: 'fa-calendar-alt' },
//     { id: 'settings', name: 'System Settings', icon: 'fa-cogs' },
//     { id: 'reports', name: 'Reports & Export', icon: 'fa-file-alt' }
//   ];

//   const renderPage = () => {
//     switch(currentPage) {
//       case 'users': return <UserManagement />;
//       case 'students': return <StudentRecords />;
//       case 'faculty': return <FacultyManagement />;
//       case 'results': return <Results />;
//       case 'courses': return <CourseCatalog />;
//       case 'calendar': return <AcademicCalendar />;
//       case 'settings': return <Settings />;
//       case 'reports': return <Reports />;
//       case 'profile': return <AdminProfile onBack={() => setCurrentPage('dashboard')} />;
//       default: return renderDashboard();
//     }
//   };

//   const renderDashboard = () => {
//     const stats = [
//       { label: 'Total Students', value: '1,248', change: '+5.2%', icon: 'fa-users', color: '#667eea' },
//       { label: 'Faculty Members', value: '48', change: '+2', icon: 'fa-chalkboard-teacher', color: '#10b981' },
//       { label: 'Active Courses', value: '32', change: '+3', icon: 'fa-book', color: '#f59e0b' },
//       { label: 'Pending Requests', value: '156', change: '-12', icon: 'fa-tasks', color: '#ef4444' }
//     ];

//     const activities = [
//       { time: '10:23 AM', user: 'Dr. Sarah Johnson', action: 'Grade Submitted' },
//       { time: '09:45 AM', user: 'John Smith', action: 'Course Registration' },
//       { time: '09:15 AM', user: 'EduAdmin', action: 'User Created' }
//     ];

//     const alerts = [
//       { title: 'Storage Warning', message: '85% capacity used', icon: 'fa-exclamation-triangle', color: '#f59e0b' },
//       { title: 'Backup Scheduled', message: 'Tonight at 2:00 AM', icon: 'fa-database', color: '#3b82f6' },
//       { title: 'Security Update', message: 'New patches available', icon: 'fa-shield-alt', color: '#ef4444' }
//     ];

//     return (
//       <>
//         <div style={{ marginBottom: '28px' }}>
//           <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>Dashboard</h1>
//           <p style={{ color: '#94a3b8', fontSize: '14px' }}>Welcome back, {profile.name}</p>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
//           {stats.map((stat, idx) => (
//             <div key={idx} style={{ background: '#1a1a2e', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                 <div>
//                   <div style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}>{stat.value}</div>
//                   <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{stat.label}</div>
//                 </div>
//                 <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                   <i className={`fas ${stat.icon}`} style={{ color: stat.color, fontSize: '20px' }}></i>
//                 </div>
//               </div>
//               <div style={{ marginTop: '12px', color: stat.change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '12px' }}>
//                 <i className={`fas fa-arrow-${stat.change.startsWith('+') ? 'up' : 'down'}`}></i> {stat.change}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
//           <div style={{ background: '#1a1a2e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
//             <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Recent Activity</h2>
//             {activities.map((act, idx) => (
//               <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: idx < activities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                   <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(102,126,234,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <i className="fas fa-user" style={{ color: '#667eea', fontSize: '14px' }}></i>
//                   </div>
//                   <div>
//                     <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{act.user}</div>
//                     <div style={{ color: '#94a3b8', fontSize: '12px' }}>{act.action}</div>
//                   </div>
//                 </div>
//                 <div style={{ color: '#94a3b8', fontSize: '12px' }}>{act.time}</div>
//               </div>
//             ))}
//           </div>

//           <div>
//             <div style={{ background: '#1a1a2e', borderRadius: '20px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
//               <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>System Alerts</h2>
//               {alerts.map((alert, idx) => (
//                 <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: idx < alerts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
//                   <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${alert.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <i className={`fas ${alert.icon}`} style={{ color: alert.color, fontSize: '14px' }}></i>
//                   </div>
//                   <div>
//                     <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>{alert.title}</div>
//                     <div style={{ color: '#94a3b8', fontSize: '11px' }}>{alert.message}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ background: '#1a1a2e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
//               <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Upcoming Events</h2>
//               <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//                 <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Midterm Exams</div>
//                 <div style={{ color: '#94a3b8', fontSize: '11px' }}>Mar 28-30, 2024</div>
//               </div>
//               <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//                 <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Registration Opens</div>
//                 <div style={{ color: '#94a3b8', fontSize: '11px' }}>Apr 15, 2024</div>
//               </div>
//               <div style={{ padding: '10px 0' }}>
//                 <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Final Exams</div>
//                 <div style={{ color: '#94a3b8', fontSize: '11px' }}>May 10-17, 2024</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('token');
//       alert('Logged out successfully');
//       window.location.href = '/login';
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) setSidebarActive(false);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
//         setShowProfileDropdown(false);
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [showProfileDropdown]);

//   return (
//     <div style={{ minHeight: '100vh', background: '#0a0a15', fontFamily: 'Inter, sans-serif' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
//         @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { background: #0a0a15; }
//         ::-webkit-scrollbar { width: 5px; }
//         ::-webkit-scrollbar-track { background: #1a1a2e; }
//         ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 5px; }
//       `}</style>

//       {/* Mobile Menu Button */}
//       <div 
//         onClick={() => setSidebarActive(!sidebarActive)} 
//         style={{ 
//           position: 'fixed', 
//           top: '16px', 
//           left: '16px', 
//           zIndex: 1000, 
//           width: '44px', 
//           height: '44px', 
//           background: '#1a1a2e', 
//           borderRadius: '12px', 
//           display: window.innerWidth <= 768 ? 'flex' : 'none', 
//           alignItems: 'center', 
//           justifyContent: 'center', 
//           fontSize: '20px', 
//           cursor: 'pointer', 
//           border: '1px solid rgba(255,255,255,0.1)' 
//         }}
//       >
//         <i className="fas fa-bars" style={{ color: 'white' }}></i>
//       </div>

//       <div style={{ display: 'flex', minHeight: '100vh' }}>
//         {/* Sidebar */}
//         <div style={{ 
//           width: '280px', 
//           background: '#0d0d1a', 
//           borderRight: '1px solid rgba(255,255,255,0.05)', 
//           position: 'fixed', 
//           height: '100vh', 
//           overflowY: 'auto',
//           transition: 'transform 0.3s ease',
//           transform: sidebarActive ? 'translateX(0)' : window.innerWidth <= 768 ? 'translateX(-100%)' : 'translateX(0)',
//           zIndex: 99,
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           {/* Logo Area */}
//           <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>⚙️</div>
//               <div>
//                 <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white' }}>SWE<span style={{ color: '#667eea' }}>Hub</span></h2>
//                 <p style={{ fontSize: '11px', color: '#667eea', marginTop: '2px' }}>Admin Portal</p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Menu */}
//           <nav style={{ flex: 1, padding: '20px 16px' }}>
//             {menuItems.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => {
//                   setCurrentPage(item.id);
//                   if (window.innerWidth <= 768) setSidebarActive(false);
//                 }}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '14px',
//                   padding: '12px 16px',
//                   marginBottom: '4px',
//                   borderRadius: '12px',
//                   cursor: 'pointer',
//                   transition: 'all 0.2s',
//                   background: currentPage === item.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
//                   color: currentPage === item.id ? 'white' : '#94a3b8'
//                 }}
//               >
//                 <i className={`fas ${item.icon}`} style={{ fontSize: '18px', width: '22px' }}></i>
//                 <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</span>
//               </div>
//             ))}
//           </nav>

//           {/* User Profile Section in Sidebar */}
//           <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#1a1a2e', borderRadius: '12px', marginBottom: '12px' }}>
//               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 600, color: 'white' }}>{profile.avatar}</div>
//               <div>
//                 <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{profile.name}</div>
//                 <div style={{ color: '#94a3b8', fontSize: '11px' }}>{profile.email}</div>
//               </div>
//             </div>
//             <button 
//               onClick={handleLogout} 
//               style={{ 
//                 width: '100%', 
//                 padding: '10px', 
//                 background: 'rgba(239,68,68,0.1)', 
//                 border: '1px solid rgba(239,68,68,0.2)', 
//                 color: '#ef4444', 
//                 borderRadius: '10px', 
//                 fontSize: '13px', 
//                 fontWeight: 500, 
//                 cursor: 'pointer', 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 gap: '8px' 
//               }}
//             >
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div style={{ 
//           marginLeft: window.innerWidth <= 768 ? '0' : '280px', 
//           flex: 1, 
//           padding: '24px 32px',
//           width: '100%',
//           background: '#0a0a15'
//         }}>
//           {/* Top Bar - COMPLETELY DARK, NO WHITE */}
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             marginBottom: '24px', 
//             flexWrap: 'wrap', 
//             gap: '16px',
//             background: '#0a0a15',
//             padding: '0 0 16px 0',
//             borderBottom: '1px solid rgba(255,255,255,0.05)'
//           }}>
//             <div>
//               <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
//                 {menuItems.find(i => i.id === currentPage)?.name || 'Dashboard'}
//               </h1>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//               {/* Notification Bell */}
//               <div style={{ position: 'relative', cursor: 'pointer' }}>
//                 <i className="fas fa-bell" style={{ fontSize: '18px', color: '#94a3b8' }}></i>
//                 <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#ef4444', width: '16px', height: '16px', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>5</span>
//               </div>
              
//               {/* Admin Profile Dropdown */}
//               <div className="profile-dropdown" style={{ position: 'relative' }}>
//                 <div 
//                   onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//                   style={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: '10px', 
//                     cursor: 'pointer',
//                     padding: '6px 12px',
//                     borderRadius: '30px',
//                     background: '#1a1a2e',
//                     border: '1px solid rgba(102,126,234,0.3)'
//                   }}
//                 >
//                   <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: 'white' }}>{profile.avatar}</div>
//                   <span style={{ color: 'white', fontSize: '13px', fontWeight: 500, display: window.innerWidth <= 768 ? 'none' : 'inline' }}>{profile.name}</span>
//                   <i className="fas fa-chevron-down" style={{ fontSize: '10px', color: '#667eea' }}></i>
//                 </div>
                
//                 {showProfileDropdown && (
//                   <div style={{
//                     position: 'absolute',
//                     top: '50px',
//                     right: '0',
//                     width: '220px',
//                     background: '#1a1a2e',
//                     borderRadius: '12px',
//                     border: '1px solid rgba(102,126,234,0.3)',
//                     overflow: 'hidden',
//                     zIndex: 100,
//                     boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
//                   }}>
//                     <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//                       <div style={{ fontWeight: 600, color: 'white' }}>{profile.name}</div>
//                       <div style={{ fontSize: '11px', color: '#94a3b8' }}>{profile.email}</div>
//                     </div>
//                     <div 
//                       onClick={() => {
//                         setCurrentPage('profile');
//                         setShowProfileDropdown(false);
//                         if (window.innerWidth <= 768) setSidebarActive(false);
//                       }}
//                       style={{ padding: '12px 16px', cursor: 'pointer', transition: 'all 0.2s', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '10px' }}
//                       onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102,126,234,0.1)'}
//                       onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                     >
//                       <i className="fas fa-user-circle" style={{ width: '18px', color: '#667eea' }}></i>
//                       <span>My Profile</span>
//                     </div>
//                     <div 
//                       onClick={handleLogout}
//                       style={{ padding: '12px 16px', cursor: 'pointer', transition: 'all 0.2s', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}
//                       onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
//                       onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                     >
//                       <i className="fas fa-sign-out-alt" style={{ width: '18px' }}></i>
//                       <span>Logout</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Search Bar */}
//               <div style={{ position: 'relative' }}>
//                 <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#667eea', fontSize: '12px' }}></i>
//                 <input 
//                   type="text" 
//                   placeholder="Search..." 
//                   value={searchTerm} 
//                   onChange={(e) => setSearchTerm(e.target.value)} 
//                   style={{ 
//                     padding: '8px 12px 8px 32px', 
//                     background: '#1a1a2e', 
//                     border: '1px solid rgba(102,126,234,0.3)', 
//                     borderRadius: '10px', 
//                     color: 'white', 
//                     fontSize: '13px', 
//                     width: '220px',
//                     outline: 'none'
//                   }} 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Page Content */}
//           <div style={{ background: '#0a0a15' }}>
//             {renderPage()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Dashboard;

import React, { useState, useEffect } from 'react';
import UserManagement from './UserManagement';
import StudentRecords from './StudentRecords';
import FacultyManagement from './FacultyManagement';
import Results from './Results';
import CourseCatalog from './CourseCatalog';
import AcademicCalendar from './AcademicCalendar';
import Settings from './Settings';
import Reports from './Reports';
import AdminProfile from './AdminProfile';

const Dashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profile, setProfile] = useState({ name: 'EduAdmin', avatar: 'EA', email: 'eduadmin@swehub.com' });

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer-alt' },
    { id: 'users', name: 'User Management', icon: 'fa-users' },
    { id: 'students', name: 'Student Records', icon: 'fa-graduation-cap' },
    { id: 'faculty', name: 'Faculty Management', icon: 'fa-chalkboard-teacher' },
    { id: 'results', name: 'Results & Grades', icon: 'fa-chart-line' },
    { id: 'courses', name: 'Course Catalog', icon: 'fa-book' },
    { id: 'calendar', name: 'Academic Calendar', icon: 'fa-calendar-alt' },
    { id: 'settings', name: 'System Settings', icon: 'fa-cogs' },
    { id: 'reports', name: 'Reports & Export', icon: 'fa-file-alt' }
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'users': return <UserManagement />;
      case 'students': return <StudentRecords />;
      case 'faculty': return <FacultyManagement />;
      case 'results': return <Results />;
      case 'courses': return <CourseCatalog />;
      case 'calendar': return <AcademicCalendar />;
      case 'settings': return <Settings />;
      case 'reports': return <Reports />;
      case 'profile': return <AdminProfile onBack={() => setCurrentPage('dashboard')} />;
      default: return renderDashboard();
    }
  };

  const renderDashboard = () => {
    const stats = [
      { label: 'Total Students', value: '1,248', change: '+5.2%', icon: 'fa-users', color: '#667eea' },
      { label: 'Faculty Members', value: '48', change: '+2', icon: 'fa-chalkboard-teacher', color: '#10b981' },
      { label: 'Active Courses', value: '32', change: '+3', icon: 'fa-book', color: '#f59e0b' },
      { label: 'Pending Requests', value: '156', change: '-12', icon: 'fa-tasks', color: '#ef4444' }
    ];

    const activities = [
      { time: '10:23 AM', user: 'Dr. Sarah Johnson', action: 'Grade Submitted' },
      { time: '09:45 AM', user: 'John Smith', action: 'Course Registration' },
      { time: '09:15 AM', user: 'EduAdmin', action: 'User Created' }
    ];

    const alerts = [
      { title: 'Storage Warning', message: '85% capacity used', icon: 'fa-exclamation-triangle', color: '#f59e0b' },
      { title: 'Backup Scheduled', message: 'Tonight at 2:00 AM', icon: 'fa-database', color: '#3b82f6' },
      { title: 'Security Update', message: 'New patches available', icon: 'fa-shield-alt', color: '#ef4444' }
    ];

    return (
      <>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>Dashboard</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Welcome back, {profile.name}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ background: '#1a1a2e', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}>{stat.value}</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{stat.label}</div>
                </div>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`fas ${stat.icon}`} style={{ color: stat.color, fontSize: '20px' }}></i>
                </div>
              </div>
              <div style={{ marginTop: '12px', color: stat.change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '12px' }}>
                <i className={`fas fa-arrow-${stat.change.startsWith('+') ? 'up' : 'down'}`}></i> {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={{ background: '#1a1a2e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Recent Activity</h2>
            {activities.map((act, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: idx < activities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(102,126,234,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-user" style={{ color: '#667eea', fontSize: '14px' }}></i>
                  </div>
                  <div>
                    <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{act.user}</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>{act.action}</div>
                  </div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{act.time}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ background: '#1a1a2e', borderRadius: '20px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>System Alerts</h2>
              {alerts.map((alert, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: idx < alerts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${alert.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fas ${alert.icon}`} style={{ color: alert.color, fontSize: '14px' }}></i>
                  </div>
                  <div>
                    <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>{alert.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: '11px' }}>{alert.message}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1a1a2e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Upcoming Events</h2>
              <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Midterm Exams</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>Mar 28-30, 2024</div>
              </div>
              <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Registration Opens</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>Apr 15, 2024</div>
              </div>
              <div style={{ padding: '10px 0' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Final Exams</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>May 10-17, 2024</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      alert('Logged out successfully');
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarActive(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileDropdown]);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a15', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a15; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 5px; }
      `}</style>

      {/* Mobile Menu Button */}
      <div 
        onClick={() => setSidebarActive(!sidebarActive)} 
        style={{ 
          position: 'fixed', 
          top: '16px', 
          left: '16px', 
          zIndex: 1000, 
          width: '44px', 
          height: '44px', 
          background: '#1a1a2e', 
          borderRadius: '12px', 
          display: window.innerWidth <= 768 ? 'flex' : 'none', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '20px', 
          cursor: 'pointer', 
          border: '1px solid rgba(255,255,255,0.1)' 
        }}
      >
        <i className="fas fa-bars" style={{ color: 'white' }}></i>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div style={{ 
          width: '280px', 
          background: '#0d0d1a', 
          borderRight: '1px solid rgba(255,255,255,0.05)', 
          position: 'fixed', 
          height: '100vh', 
          overflowY: 'auto',
          transition: 'transform 0.3s ease',
          transform: sidebarActive ? 'translateX(0)' : window.innerWidth <= 768 ? 'translateX(-100%)' : 'translateX(0)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Logo Area */}
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>⚙️</div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white' }}>SWE<span style={{ color: '#667eea' }}>Hub</span></h2>
                <p style={{ fontSize: '11px', color: '#667eea', marginTop: '2px' }}>Administration Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav style={{ flex: 1, padding: '20px 16px' }}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  if (window.innerWidth <= 768) setSidebarActive(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  marginBottom: '4px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: currentPage === item.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                  color: currentPage === item.id ? 'white' : '#94a3b8'
                }}
              >
                <i className={`fas ${item.icon}`} style={{ fontSize: '18px', width: '22px' }}></i>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</span>
              </div>
            ))}
          </nav>

          {/* User Profile Section in Sidebar - Logout only here */}
          <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#1a1a2e', borderRadius: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 600, color: 'white' }}>{profile.avatar}</div>
              <div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{profile.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>{profile.email}</div>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              style={{ 
                width: '100%', 
                padding: '10px', 
                background: 'rgba(239,68,68,0.1)', 
                border: '1px solid rgba(239,68,68,0.2)', 
                color: '#ef4444', 
                borderRadius: '10px', 
                fontSize: '13px', 
                fontWeight: 500, 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px' 
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ 
          marginLeft: window.innerWidth <= 768 ? '0' : '280px', 
          flex: 1, 
          padding: '24px 32px',
          width: '100%',
          background: '#0a0a15'
        }}>
          {/* Top Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px', 
            flexWrap: 'wrap', 
            gap: '16px',
            background: '#0a0a15',
            padding: '0 0 16px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                {menuItems.find(i => i.id === currentPage)?.name || 'Dashboard'}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: 500,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🎓 EduAdmin
                </span>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>/</span>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>{menuItems.find(i => i.id === currentPage)?.name || 'Dashboard'}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Notification Bell */}
              <div style={{ position: 'relative', cursor: 'pointer' }}>
                <i className="fas fa-bell" style={{ fontSize: '18px', color: '#94a3b8' }}></i>
                <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#ef4444', width: '16px', height: '16px', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>5</span>
              </div>
              
              {/* Admin Profile Dropdown */}
              <div className="profile-dropdown" style={{ position: 'relative' }}>
                <div 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    padding: '6px 12px',
                    borderRadius: '30px',
                    background: '#1a1a2e',
                    border: '1px solid rgba(102,126,234,0.3)'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: 'white' }}>{profile.avatar}</div>
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: 500, display: window.innerWidth <= 768 ? 'none' : 'inline' }}>{profile.name}</span>
                  <i className="fas fa-chevron-down" style={{ fontSize: '10px', color: '#667eea' }}></i>
                </div>
                
                {showProfileDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    width: '220px',
                    background: '#1a1a2e',
                    borderRadius: '12px',
                    border: '1px solid rgba(102,126,234,0.3)',
                    overflow: 'hidden',
                    zIndex: 100,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontWeight: 600, color: 'white' }}>{profile.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{profile.email}</div>
                    </div>
                    <div 
                      onClick={() => {
                        setCurrentPage('profile');
                        setShowProfileDropdown(false);
                        if (window.innerWidth <= 768) setSidebarActive(false);
                      }}
                      style={{ padding: '12px 16px', cursor: 'pointer', transition: 'all 0.2s', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '10px' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102,126,234,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <i className="fas fa-user-circle" style={{ width: '18px', color: '#667eea' }}></i>
                      <span>My Profile</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#667eea', fontSize: '12px' }}></i>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  style={{ 
                    padding: '8px 12px 8px 32px', 
                    background: '#1a1a2e', 
                    border: '1px solid rgba(102,126,234,0.3)', 
                    borderRadius: '10px', 
                    color: 'white', 
                    fontSize: '13px', 
                    width: '220px',
                    outline: 'none'
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div style={{ background: '#0a0a15' }}>
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
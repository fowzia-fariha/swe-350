// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/student/Dashboard";
// // import Assignment from "./pages/student/Assignment";
// // import AssignmentDetails from "./components/AssignmentDetails";
// // import StudyMaterials from "./pages/student/StudyMaterials";
// // import LiveSessions from "./pages/student/LiveSessions";
// // import CRDashboard from "./pages/student/CRDashboard";
// // import CourseOverview from "./pages/student/CourseOverview";
// // import TeacherDashboard from "./pages/teacher/TeacherDashboard";
// // import AdminDashboard from "./pages/admin/AdminDashboard";
// // import TeacherAssignment from "./pages/teacher/TeacherAssignment";

// // // Protected Route component
// // const ProtectedRoute = ({ children, allowedRoles }) => {
// //   const token = localStorage.getItem("token");
// //   const user = JSON.parse(localStorage.getItem("user") || "{}");
  
// //   if (!token) {
// //     return <Navigate to="/login" replace />;
// //   }
  
// //   if (allowedRoles && !allowedRoles.includes(user.role)) {
// //     return <Navigate to="/login" replace />;
// //   }
  
// //   return children;
// // };

// // function App() {
// //   return (
// //     <Routes>
// //       {/* Public Route - Login page is the entry point */}
// //       <Route path="/login" element={<Login />} />
      
// //       {/* CHANGE THIS - Root goes to login, not dashboard */}
// //       <Route path="/" element={<Navigate to="/login" replace />} />
      
// //       {/* Student Routes */}
// //       <Route path="/dashboard" element={
// //         <ProtectedRoute allowedRoles={['student']}>
// //           <Dashboard />
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/student-dashboard" element={
// //         <ProtectedRoute allowedRoles={['student']}>
// //           <Dashboard />
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/assignments" element={
// //         <ProtectedRoute allowedRoles={['student']}>
// //           <Assignment />
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/assignments/:id" element={
// //         <ProtectedRoute allowedRoles={['student']}>
// //           <AssignmentDetails />
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/study-materials" element={
// //         <ProtectedRoute allowedRoles={['student']}>
// //           <StudyMaterials />
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/live-sessions" element={
// //         <ProtectedRoute allowedRoles={['student']}>
// //           <LiveSessions />
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/course-overview" element={
// //         <ProtectedRoute allowedRoles={['student']}>
// //           <CourseOverview />
// //         </ProtectedRoute>
// //       } />
      
// //       {/* CR Routes */}
// //       <Route path="/cr-dashboard/:batchId" element={
// //         <ProtectedRoute allowedRoles={['cr']}>
// //           <CRDashboard />
// //         </ProtectedRoute>
// //       } />
      
// //       {/* Teacher Route */}
// //       <Route path="/teacher-dashboard" element={
// //         <ProtectedRoute allowedRoles={['teacher']}>
// //           <TeacherDashboard />
// //         </ProtectedRoute>
// //       } />
      

// //       <Route path="/teacher/assignments" element={
// //   <ProtectedRoute allowedRoles={['teacher']}>
// //     <TeacherAssignment />
// //   </ProtectedRoute>
// // } />
// //       {/* Admin Route */}
// //       <Route path="/admin-dashboard" element={
// //         <ProtectedRoute allowedRoles={['admin']}>
// //           <AdminDashboard />
// //         </ProtectedRoute>
// //       } />
// //     </Routes>
// //   );
// // }

// // export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/student/Dashboard";
// import Assignment from "./pages/student/Assignment";
// import AssignmentDetails from "./components/AssignmentDetails";
// import StudyMaterials from "./pages/student/StudyMaterials";
// import LiveSessions from "./pages/student/LiveSessions";
// import CRDashboard from "./pages/student/CRDashboard";
// import CourseOverview from "./pages/student/CourseOverview";
// import TeacherDashboard from "./pages/teacher/TeacherDashboard";
// import AdminDashboard from "./pages/admin/pages/Dashboard";
// import TeacherAssignment from "./pages/teacher/TeacherAssignment";

// // Import admin pages
// import AcademicCalendar from "./pages/admin/pages/AcademicCalendar";
// import AdminProfile from "./pages/admin/pages/AdminProfile";
// import CourseCatalog from "./pages/admin/pages/CourseCatalog";
// import FacultyManagement from "./pages/admin/pages/FacultyManagement";
// import Reports from "./pages/admin/pages/Reports";
// import Results from "./pages/admin/pages/Results";
// import Settings from "./pages/admin/pages/Settings";
// import StudentRecords from "./pages/admin/pages/StudentRecords";
// import UserManagement from "./pages/admin/pages/UserManagement";

// // Protected Route component
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
  
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<Navigate to="/login" replace />} />
      
//       {/* Student Routes */}
//       <Route path="/dashboard" element={
//         <ProtectedRoute allowedRoles={['student']}>
//           <Dashboard />
//         </ProtectedRoute>
//       } />
//       <Route path="/student-dashboard" element={
//         <ProtectedRoute allowedRoles={['student']}>
//           <Dashboard />
//         </ProtectedRoute>
//       } />
//       <Route path="/assignments" element={
//         <ProtectedRoute allowedRoles={['student']}>
//           <Assignment />
//         </ProtectedRoute>
//       } />
//       <Route path="/assignments/:id" element={
//         <ProtectedRoute allowedRoles={['student']}>
//           <AssignmentDetails />
//         </ProtectedRoute>
//       } />
//       <Route path="/study-materials" element={
//         <ProtectedRoute allowedRoles={['student']}>
//           <StudyMaterials />
//         </ProtectedRoute>
//       } />
//       <Route path="/live-sessions" element={
//         <ProtectedRoute allowedRoles={['student']}>
//           <LiveSessions />
//         </ProtectedRoute>
//       } />
//       <Route path="/course-overview" element={
//         <ProtectedRoute allowedRoles={['student']}>
//           <CourseOverview />
//         </ProtectedRoute>
//       } />
      
//       {/* CR Routes */}
//       <Route path="/cr-dashboard/:batchId" element={
//         <ProtectedRoute allowedRoles={['cr']}>
//           <CRDashboard />
//         </ProtectedRoute>
//       } />
      
//       {/* Teacher Routes */}
//       <Route path="/teacher-dashboard" element={
//         <ProtectedRoute allowedRoles={['teacher']}>
//           <TeacherDashboard />
//         </ProtectedRoute>
//       } />
//       <Route path="/teacher/assignments" element={
//         <ProtectedRoute allowedRoles={['teacher']}>
//           <TeacherAssignment />
//         </ProtectedRoute>
//       } />
      
//       {/* Admin Routes */}
//       <Route path="/admin-dashboard" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <AdminDashboard />
//         </ProtectedRoute>
//       } />
      
//       {/* Add nested admin routes - these will be handled inside AdminDashboard */}
//       <Route path="/admin/academic-calendar" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <AcademicCalendar />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/profile" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <AdminProfile />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/course-catalog" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <CourseCatalog />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/faculty" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <FacultyManagement />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/reports" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <Reports />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/results" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <Results />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/settings" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <Settings />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/students" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <StudentRecords />
//         </ProtectedRoute>
//       } />
//       <Route path="/admin/users" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <UserManagement />
//         </ProtectedRoute>
//       } />
//     </Routes>
//   );
// }

// export default App;




import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/student/Dashboard";
import Assignment from "./pages/student/Assignment";
import AssignmentDetails from "./components/AssignmentDetails";
import StudyMaterials from "./pages/student/StudyMaterials";
import LiveSessions from "./pages/student/LiveSessions";
import CRDashboard from "./pages/student/CRDashboard";
import CourseOverview from "./pages/student/CourseOverview";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AdminDashboard from "./pages/admin/pages/Dashboard";
import TeacherAssignment from "./pages/teacher/TeacherAssignment";

// Import admin pages
import AcademicCalendar from "./pages/admin/pages/AcademicCalendar";
import AdminProfile from "./pages/admin/pages/AdminProfile";
import CourseCatalog from "./pages/admin/pages/CourseCatalog";
import FacultyManagement from "./pages/admin/pages/FacultyManagement";
import Reports from "./pages/admin/pages/Reports";
import Results from "./pages/admin/pages/Results";
import Settings from "./pages/admin/pages/Settings";
import StudentRecords from "./pages/admin/pages/StudentRecords";
import UserManagement from "./pages/admin/pages/UserManagement";

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Student Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/student-dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/assignments" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Assignment />
        </ProtectedRoute>
      } />
      <Route path="/assignments/:id" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AssignmentDetails />
        </ProtectedRoute>
      } />
      <Route path="/study-materials" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudyMaterials />
        </ProtectedRoute>
      } />
      <Route path="/live-sessions" element={
        <ProtectedRoute allowedRoles={['student']}>
          <LiveSessions />
        </ProtectedRoute>
      } />
      <Route path="/course-overview" element={
        <ProtectedRoute allowedRoles={['student']}>
          <CourseOverview />
        </ProtectedRoute>
      } />
      
      {/* CR Routes */}
      <Route path="/cr-dashboard/:batchId" element={
        <ProtectedRoute allowedRoles={['cr']}>
          <CRDashboard />
        </ProtectedRoute>
      } />
      
      {/* Teacher Routes */}
      <Route path="/teacher-dashboard" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherDashboard />
        </ProtectedRoute>
      } />
      <Route path="/teacher/assignments" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherAssignment />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Nested admin routes */}
      <Route path="/admin/academic-calendar" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AcademicCalendar />
        </ProtectedRoute>
      } />
      <Route path="/admin/profile" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminProfile />
        </ProtectedRoute>
      } />
      <Route path="/admin/course-catalog" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <CourseCatalog />
        </ProtectedRoute>
      } />
      <Route path="/admin/faculty" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <FacultyManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Reports />
        </ProtectedRoute>
      } />
      <Route path="/admin/results" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Results />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/admin/students" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <StudentRecords />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <UserManagement />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
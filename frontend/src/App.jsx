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
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherAssignment from "./pages/teacher/TeacherAssignment";

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
      {/* Public Route - Login page is the entry point */}
      <Route path="/login" element={<Login />} />
      
      {/* CHANGE THIS - Root goes to login, not dashboard */}
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
      
      {/* Teacher Route */}
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
      {/* Admin Route */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
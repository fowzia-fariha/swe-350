import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const [studentResults, setStudentResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentResults();
    createFloatingShapes();
  }, []);

  const createFloatingShapes = () => {
    const container = document.getElementById('floatingShapes');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const shape = document.createElement('div');
      shape.className = `shape shape-${Math.random() > 0.5 ? 'circle' : 'square'}`;
      const size = Math.random() * 60 + 30;
      shape.style.width = size + 'px';
      shape.style.height = size + 'px';
      shape.style.left = Math.random() * 100 + '%';
      shape.style.animationDuration = (Math.random() * 25 + 30) + 's';
      shape.style.animationDelay = Math.random() * 15 + 's';
      container.appendChild(shape);
    }
  };

  const fetchStudentResults = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");
      
      if (!token || !user.user_id) {
        setError("Please login again");
        navigate("/login");
        return;
      }
      
      setStudentName(user.name || "Student");
      
      const response = await fetch(`http://localhost:5000/api/student/results/${user.user_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      
      const data = await response.json();
      setStudentResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
      setError(error.message);
    } finally {
      setLoading(false);
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

  const getGradeColor = (grade) => {
    if (!grade || grade === '-') return '#94a3b8';
    if (grade === 'F') return '#ef4444';
    if (grade === 'D' || grade === 'D+') return '#f59e0b';
    return '#10b981';
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const calculateCGPA = () => {
    if (!studentResults?.results) return '0.00';
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    Object.values(studentResults.results).forEach(semester => {
      semester.courses.forEach(course => {
        if (course.grade_points && course.grade_points > 0) {
          totalPoints += course.grade_points * course.credits;
          totalCredits += course.credits;
        }
      });
    });
    
    if (totalCredits === 0) return '0.00';
    return (totalPoints / totalCredits).toFixed(2);
  };

  if (loading) {
    return (
      <>
        <div className="background"></div>
        <div className="floating-shapes" id="floatingShapes"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', fontSize: '18px' }}>
          Loading your results...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="background"></div>
        <div className="floating-shapes" id="floatingShapes"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div style={{ textAlign: 'center', padding: '60px', color: 'white' }}>
          <h2>Error loading results</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/dashboard')} className="submit-btn" style={{ marginTop: '20px', padding: '10px 24px', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>
            Back to Dashboard
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="background"></div>
      <div className="floating-shapes" id="floatingShapes"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">🎓</div>
            <div className="logo-text">SWE<span>Hub</span></div>
          </div>
          <div className="user-section">
            <div className="user-avatar">👤</div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="welcome-section">
          <h1 className="welcome-title">My Academic Results 📊</h1>
          <p className="welcome-subtitle">Welcome back, {studentName}! Here's your semester-wise academic performance</p>
        </div>

        {/* CGPA Card */}
        <div className="cgpa-card">
          <div className="cgpa-value">{calculateCGPA()}</div>
          <div className="cgpa-label">Overall CGPA</div>
        </div>

        {/* Semester Results */}
        <div className="semester-results-container">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
            const semesterResult = studentResults?.results?.[semNum];
            const hasResults = semesterResult && semesterResult.courses && semesterResult.courses.length > 0;
            const isUpcoming = semNum > (studentResults?.current_semester || 1);
            
            if (isUpcoming && !hasResults) return null;
            
            return (
              <div key={semNum} className="semester-card">
                <div className="semester-header">
                  <div>
                    <h3 className="semester-title">{getSemesterName(semNum)}</h3>
                    <p className="semester-subtitle">
                      {semesterResult?.courses?.length || 0} Courses | 
                      {semesterResult?.total_credits || 0} Total Credits
                    </p>
                  </div>
                  {semesterResult && semesterResult.gpa > 0 && (
                    <div className="semester-gpa">
                      <span className="gpa-label">Semester GPA</span>
                      <span className="gpa-value">{semesterResult.gpa}</span>
                    </div>
                  )}
                </div>
                
                {hasResults ? (
                  <div className="courses-table-wrapper">
                    <table className="courses-table">
                      <thead>
                        <tr>
                          <th>Course Code</th>
                          <th>Course Name</th>
                          <th>Credits</th>
                          <th>Grade</th>
                          <th>Grade Points</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semesterResult.courses.map((course) => (
                          <tr key={course.id}>
                            <td className="course-code">{course.course_code}</td>
                            <td className="course-name">{course.course_name}</td>
                            <td className="credits">{course.credits}</td>
                            <td className="grade" style={{ color: getGradeColor(course.grade), fontWeight: 'bold' }}>
                              {course.grade || '-'}
                            </td>
                            <td className="grade-points">{course.grade_points || '-'}</td>
                            <td>
                              <span className={`status-badge status-${course.status || 'pending'}`}>
                                {course.status || 'pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-results">
                    <p>📚 Results will be published soon for this semester.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <style>{`
        .cgpa-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .cgpa-value {
          font-size: 48px;
          font-weight: 800;
          color: white;
          margin-bottom: 8px;
        }
        
        .cgpa-label {
          font-size: 16px;
          color: rgba(255,255,255,0.9);
        }
        
        .semester-results-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .semester-card {
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(102,126,234,0.3);
          transition: transform 0.3s;
        }
        
        .semester-card:hover {
          transform: translateY(-3px);
        }
        
        .semester-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .semester-title {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0 0 5px 0;
        }
        
        .semester-subtitle {
          font-size: 13px;
          color: #94a3b8;
          margin: 0;
        }
        
        .semester-gpa {
          text-align: center;
          background: rgba(102,126,234,0.2);
          padding: 10px 20px;
          border-radius: 12px;
        }
        
        .gpa-label {
          font-size: 12px;
          color: #94a3b8;
          display: block;
        }
        
        .gpa-value {
          font-size: 24px;
          font-weight: 700;
          color: #667eea;
        }
        
        .courses-table-wrapper {
          overflow-x: auto;
        }
        
        .courses-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .courses-table th {
          padding: 12px;
          text-align: left;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .courses-table td {
          padding: 12px;
          color: #cbd5e1;
          font-size: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .course-code {
          font-weight: 600;
          color: white;
        }
        
        .course-name {
          color: #cbd5e1;
        }
        
        .credits {
          text-align: center;
        }
        
        .grade {
          font-weight: 700;
          font-size: 16px;
          text-align: center;
        }
        
        .grade-points {
          text-align: center;
        }
        
        .status-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }
        
        .status-published {
          background: rgba(16,185,129,0.2);
          color: #10b981;
        }
        
        .status-pending {
          background: rgba(245,158,11,0.2);
          color: #f59e0b;
        }
        
        .status-failed {
          background: rgba(239,68,68,0.2);
          color: #ef4444;
        }
        
        .no-results {
          text-align: center;
          padding: 40px;
          color: #94a3b8;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
        }
        
        @media (max-width: 768px) {
          .semester-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .courses-table {
            font-size: 12px;
          }
          
          .courses-table th,
          .courses-table td {
            padding: 8px;
          }
          
          .cgpa-value {
            font-size: 36px;
          }
        }
      `}</style>
    </>
  );
}

export default Results;
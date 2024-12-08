import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const StudentDashboard = () => {
  const [isExamAccessOpen, setIsExamAccessOpen] = useState(false);
  const [isResultAccessOpen, setIsResultAccessOpen] = useState(false);
  const [hasExamAccess, setHasExamAccess] = useState(false);
  const [ongoingExams, setOngoingExams] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [studentEmail, setStudentEmail] = useState("student@example.com");

  useEffect(() => {
    // Retrieve the student access list and ongoing exams from localStorage
    const studentAccessList = JSON.parse(localStorage.getItem("studentAccessList") || "[]");
    const exams = JSON.parse(localStorage.getItem("ongoingExams") || "[]");
    const results = JSON.parse(localStorage.getItem("examResults") || "[]");

    // Check if the student has access to the exams
    setHasExamAccess(studentAccessList.includes(studentEmail));
    setOngoingExams(exams);
    setExamResults(results);
  }, [studentEmail]);

  const toggleExamAccess = () => setIsExamAccessOpen(!isExamAccessOpen);
  const toggleResultAccess = () => setIsResultAccessOpen(!isResultAccessOpen);

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>

      {/* Exam Access Section */}
      <div className="section">
        <h2 onClick={toggleExamAccess} className="section-header">
          Exam Access
        </h2>
        {isExamAccessOpen && (
          <div className="section-content">
            <p>Access your upcoming exams, view schedules, and start taking exams here.</p>

            {hasExamAccess ? (
              ongoingExams.length > 0 ? (
                <div>
                  <h3>Ongoing Exams</h3>
                  <ul>
                    {ongoingExams.map((exam, index) => (
                      <li key={index}>
                        <Link to={`/exam/${exam.id}`} className="btn btn-primary">
                          {exam.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No ongoing exams at the moment.</p>
              )
            ) : (
              <p>You do not have access to any exams at the moment.</p>
            )}
          </div>
        )}
      </div>

      {/* Result Access Section */}
      <div className="section">
        <h2 onClick={toggleResultAccess} className="section-header">
          Result Access
        </h2>
        {isResultAccessOpen && (
          <div className="section-content">
            <p>View your results, grades, and performance analytics.</p>

            {examResults.length > 0 ? (
              <div>
                <h3>Your Exam Results</h3>
                <ul>
                  {examResults.map((result, index) => (
                    <li key={index}>
                      <h4>{result.examTitle}</h4>
                      <p>Score: {result.score}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No results available yet.</p>
            )}

            <Link to="/results" className="btn btn-primary">
              View Results
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

export const TeacherDashboard = () => {
  const [studentEmail, setStudentEmail] = useState("");
  const [examsCreated, setExamsCreated] = useState<{ title: string; students: string[] }[]>(() => {
    const savedExams = localStorage.getItem("examsCreated");
    return savedExams ? JSON.parse(savedExams) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedExams = localStorage.getItem("examsCreated");
    if (savedExams) {
      const exams = JSON.parse(savedExams);
      // Ensure that each exam has a students array (even if it's empty)
      const updatedExams = exams.map((exam: { title: string; students?: string[] }) => ({
        ...exam,
        students: Array.isArray(exam.students) ? exam.students : [], // Default to an empty array if not defined
      }));
      setExamsCreated(updatedExams);
    }
  }, []);

  const giveAccessToStudent = (examTitle: string) => {
    if (!studentEmail) {
      alert("Please enter the student's email.");
      return;
    }

    const updatedExams = examsCreated.map((exam) => {
      if (exam.title === examTitle) {
        if (exam.students.includes(studentEmail)) {
          alert("This student already has access to the exam.");
        } else {
          exam.students.push(studentEmail);
        }
      }
      return exam;
    });

    localStorage.setItem("examsCreated", JSON.stringify(updatedExams));
    setExamsCreated(updatedExams);

    alert(`Access granted to ${studentEmail} for the exam: ${examTitle}`);
    setStudentEmail("");
  };

  const navigateToExamCreation = () => {
    navigate("/exam-creation");
  };

  return (
    <div className="teacher-dashboard-container">
      <h1 className="dashboard-title">Teacher Dashboard</h1>

      <div className="exam-creation-section">
        <h2>Create a New Exam</h2>
        <button className="submit-button" onClick={navigateToExamCreation}>
          Create Exam
        </button>
      </div>

      <div className="student-access-section">
        <h2>Grant Access to Students</h2>
        <div className="form-group">
          <label htmlFor="student-email">Student Email</label>
          <input
            type="email"
            id="student-email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            placeholder="Enter student email"
          />
        </div>

        <div className="exam-list">
          <h3>Select an Exam</h3>
          {examsCreated.length === 0 ? (
            <p>No exams created yet.</p>
          ) : (
            <ul>
              {examsCreated.map((exam, index) => (
                <li key={index}>
                  <h4>{exam.title}</h4>
                  <button
                    className="submit-button"
                    onClick={() => giveAccessToStudent(exam.title)}
                  >
                    Grant Access to {exam.title}
                  </button>
                  {/* Check if students is an array and then map over it */}
                  {Array.isArray(exam.students) && exam.students.length > 0 && (
                    <ul>
                      <h5>Students with Access:</h5>
                      {exam.students.map((student, idx) => (
                        <li key={idx}>{student}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

import style from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import pic4 from "../../images/logo.png";

import Dashboard from "./Dashboard/Dashboard";
import Subject from "./SubjectComponent/Subject";
import Exam from "./ExamComponent/Exam";
import { Question } from "./QuestionComponent/Question";
import Result from "./ResultComponent/Result";
import StudentList from "./StudentList/StudentList";
import Student from "./StudentList/Student/Student";
import { Details } from "./ExamComponent/DetailComponent/Details";
import ViewQuestion from "./ExamComponent/ViewQuestion/ViewQuestion";
import { AddQuestion } from "./ExamComponent/AddQuestion/AddQuestion";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  function goToAdminLogin() {
    navigate("/admin-login");
  }

  return (
    <>
      <div id={style.header}>
        <div id={style.headerHeadingBox}>
          <h3>Online Exam System</h3>
        </div>

        <div id={style.headerMenuBox}>
          <NavLink to="/admin-dashboard">
            <span>Dashboard</span>
          </NavLink>
          <span onClick={goToAdminLogin}>
            <span>Logout</span>
          </span>
        </div>
      </div>

      <div id={style.content}>
        <div id={style.sideMenubar}>
          <div id={style.sideMenubarImageBox}>
            <img src={pic4} alt="logo" />
          </div>

          <div id={style.sideMenubarList}>
            <NavLink className={style.removeUnderline} to="/admin-dashboard/subject">
              <button>
                <span>Subject</span>
              </button>
            </NavLink>
            <NavLink className={style.removeUnderline} to="/admin-dashboard/exam">
              <button>
                <span>Exam</span>
              </button>
            </NavLink>
            <NavLink className={style.removeUnderline} to="/admin-dashboard/question">
              <button>
                <span>Question</span>
              </button>
            </NavLink>
            <NavLink className={style.removeUnderline} to="/admin-dashboard/result">
              <button>
                <span>Result</span>
              </button>
            </NavLink>
            <NavLink className={style.removeUnderline} to="/admin-dashboard/studentlist">
              <button>
                <span>Student List</span>
              </button>
            </NavLink>
          </div>
        </div>

        <div id={style.display}>
          <Routes>
            {/* Basic Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="subject" element={<Subject />} />
            <Route path="Exam" element={<Exam />} />
            <Route path="question" element={<Question />} />
            <Route path="result" element={<Result />} />
            <Route path="studentlist" element={<StudentList />} />

            {/* Nested Routes */}
            <Route path="Exam/details/:id" element={<Details />} />
            <Route path="Exam/ViewQuestion/:id" element={<ViewQuestion />} />
            <Route path="Exam/addquestion/:id" element={<AddQuestion />} />
            <Route path="studentlist/details/:id" element={<Student />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

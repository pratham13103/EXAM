import style from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the types for the data
interface ExamData {
  length: number;
}

interface QuestionData {
  length: number;
}

interface UserData {
  length: number;
}

function Dashboard() {
  const [exam, setExam] = useState<string>("Updating...");
  const [question, setQuestion] = useState<string>("Updating...");
  const [user, setUser] = useState<string>("Updating...");

  useEffect(() => {
    async function getAllExam() {
      const value = await axios.get<ExamData[]>("http://localhost:3000/api/v1/Exam");
      setExam("We have total " + value.data.length + " exams");
    }
    getAllExam();

    async function getAllQuestions() {
      const value = await axios.get<QuestionData[]>("http://localhost:3000/api/v1/question");
      setQuestion("We have total " + value.data.length + " questions");
    }
    getAllQuestions();

    async function getAllUsers() {
      const value = await axios.get<UserData[]>("http://localhost:3000/api/v1/user");
      setUser("We have total " + value.data.length + " users");
    }
    getAllUsers();
  }, []); // Add dependency array to prevent infinite loop

  const navigate = useNavigate();

  function showExam() {
    navigate("/AdminDashboard/Exam");
  }

  function showQuestions() {
    navigate("/AdminDashboard/Question");
  }

  function showUsers() {
    navigate("/AdminDashboard/StudentList");
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h1>Dashboard</h1>
      </div>

      <div id={style.box1}>
        <p id={style.countOfExam}>{exam}</p>
        <button onClick={showExam}>View Details</button>
      </div>

      <div id={style.box2}>
        <p id={style.countOfQuestion}>{question}</p>
        <button onClick={showQuestions}>View Details</button>
      </div>

      <div id={style.box3}>
        <p id={style.countOfUser}>{user}</p>
        <button onClick={showUsers}>View Details</button>
      </div>
    </>
  );
}

export default Dashboard;

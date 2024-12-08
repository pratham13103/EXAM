import style from "../../SubjectComponent/Subject.module.css";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define types for the result and student data
interface ResultData {
  user_email: string;
  exam_name: string;
  exam_date: string;
  result_status: string;
  result_score: number;
  total_marks: number;
}

function Student() {
  const { id } = useParams<{ id: string }>(); // Type the params

  const [email, setEmail] = useState<string | undefined>(undefined); // email state
  const [result, setResult] = useState<ResultData[]>([]); // result state

  // Fetch the student email
  useEffect(() => {
    async function getStudentEmail() {
      const value = await axios.get(`http://localhost:3000/api/v1/user/${id}`);
      setEmail(value.data.user_email);
    }
    getStudentEmail();
  }, [id]); // Add id as a dependency to re-run if id changes

  // Fetch all results
  useEffect(() => {
    async function getAllResult() {
      const value = await axios.get("http://localhost:3000/api/v1/result");
      setResult(value.data);
    }
    getAllResult();
  }, []); // Empty dependency array means it runs only once when the component mounts

  const navigate = useNavigate(); // useNavigate instead of useHistory

  // Handle back button click
  function handleGoBack() {
    navigate("/AdminDashboard/StudentList"); // use navigate to go back
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Student Exam List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id={style.center}>User Email</th>
              <th id={style.center}>Exam Name</th>
              <th id={style.center}>Exam Date</th>
              <th id={style.center}>Result Status</th>
              <th id={style.center}>Total Marks</th>
              <th id={style.center}>Result Score</th>
            </tr>
          </thead>
          <tbody>
            {result.map((data, i) => {
              if (data.user_email === email)
                return (
                  <tr key={i}>
                    <td>{data.user_email}</td>
                    <td>{data.exam_name}</td>
                    <td>{data.exam_date}</td>
                    <td>{data.result_status}</td>
                    <td>{data.result_score}</td>
                    <td>{data.total_marks}</td>
                  </tr>
                );
              return <React.Fragment key={i}></React.Fragment>;
            })}
          </tbody>
        </table>
      </div>

      <div id={style.addSubjectBox}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </>
  );
}

export default Student;

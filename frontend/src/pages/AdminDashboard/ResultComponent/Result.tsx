import axios from "axios";
import { useEffect, useState } from "react";
import style from "../SubjectComponent/Subject.module.css";

// Define the type for the result data
interface ResultData {
  user_email: string;
  exam_name: string;
  exam_date: string;
  result_status: string;
  result_score: number;
  total_marks: number;
  total_Question: number;
}

function Result() {
  const [results, setResults] = useState<ResultData[]>([]);

  useEffect(() => {
    async function getAllResults() {
      const value = await axios.get("http://localhost:3000/api/v1/result");
      setResults(value.data);
    }
    getAllResults();
  }, []);

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Exam List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id="center">User Email</th>
              <th id="center">Exam Name</th>
              <th id="center">Exam Date</th>
              <th id="center">Result Status</th>
              <th id="center">Your Score</th>
              <th id="center">Total Marks</th>
              <th id="center">Total Question</th>
            </tr>
          </thead>
          <tbody>
            {results.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.user_email}</td>
                  <td>{data.exam_name}</td>
                  <td>{data.exam_date}</td>
                  <td>{data.result_status}</td>
                  <td>{data.result_score}</td>
                  <td>{data.total_marks}</td>
                  <td>{data.total_Question}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Result;

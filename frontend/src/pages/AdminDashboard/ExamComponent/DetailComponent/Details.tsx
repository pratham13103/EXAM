import style from "../../SubjectComponent/Subject.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Exam {
  exam_name: string;
  exam_desc: string;
  exam_level: string;
  exam_passMarks: string;
  exam_totalQuestion: string;
  exam_marks: string;
  exam_date: string;
}

export const Details = () => {
  const { id } = useParams<{ id: string }>();

  const [exam, setExam] = useState<Exam>({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: "",
  });

  useEffect(() => {
    async function getExamDetails() {
      try {
        const value = await axios.get(`http://localhost:3000/api/v1/Exam/${id}`);
        setExam(value.data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    }
    getExamDetails();
  }, [id]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/AdminDashboard/Exam");
  };

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Exam Details</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id={style.center}>Exam Name</th>
              <td id={style.center}>{exam.exam_name}</td>
            </tr>

            <tr>
              <th id={style.center}>Exam Description</th>
              <td id={style.center}>{exam.exam_desc}</td>
            </tr>

            <tr>
              <th id={style.center}>Exam Creation Date</th>
              <td id={style.center}>{exam.exam_date}</td>
            </tr>

            <tr>
              <th id={style.center}>Exam Total Marks</th>
              <td id={style.center}>{exam.exam_marks}</td>
            </tr>

            <tr>
              <th id={style.center}>Exam Total Questions</th>
              <td id={style.center}>{exam.exam_totalQuestion}</td>
            </tr>

            <tr>
              <th id={style.center}>Exam Pass Marks</th>
              <td id={style.center}>{exam.exam_passMarks}</td>
            </tr>

            <tr>
              <th id={style.center}>Exam Level</th>
              <td id={style.center}>{exam.exam_level}</td>
            </tr>
          </thead>
        </table>
      </div>

      <div id={style.addSubjectBox}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </>
  );
};

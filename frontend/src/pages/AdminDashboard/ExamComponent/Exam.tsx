import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import style from "../SubjectComponent/Subject.module.css";

interface Exam {
  id?: number;
  exam_name: string;
  exam_desc: string;
  exam_level: string;
  exam_passMarks: string;
  exam_totalQuestion: string;
  exam_marks: string;
  exam_date: string;
}

interface Question {
  id: number;
  exam_id: string;
}

function Exam() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<{ display: string }>({ display: "none" });
  const [exams, setExams] = useState<Exam[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exam, setExam] = useState<Exam>({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: new Date().toLocaleString(),
  });
  const [status, setStatus] = useState(false);
  const [statusDeleteExam, setStatusDeleteExam] = useState(false);

  useEffect(() => {
    async function getAllExam() {
      try {
        const value = await axios.get("http://localhost:3000/api/v1/Exam");
        setExams(value.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    }
    getAllExam();
  }, [status]);

  useEffect(() => {
    async function getAllQuestions() {
      try {
        const value = await axios.get("http://localhost:3000/api/v1/question");
        setQuestions(value.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getAllQuestions();
  }, []);

  useEffect(() => {
    if (status || statusDeleteExam) {
      navigate('/AdminDashboard/Exam');
    }
  }, [status, statusDeleteExam, navigate]);

  const handleAddExam = () => {
    setDisplay({ display: "block" });
  };

  const handleCloseExam = () => {
    setDisplay({ display: "none" });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleAddNewExam = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/Exam", exam);
      setStatus(true);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  const deleteExam = async (id: number) => {
    try {
      for (const question of questions) {
        if (parseInt(question.exam_id) === id) {
          await axios.delete(`http://localhost:3000/api/v1/question/${question.id}`);
        }
      }
      await axios.delete(`http://localhost:3000/api/v1/Exam/${id}`);
      setStatusDeleteExam(true);
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Exam List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id={style.center}>Exam Name</th>
              <th id={style.center}>Exam Desc.</th>
              <th id={style.center}>Exam Creation Date</th>
              <th id={style.center}>Exam Level</th>
              <th id={style.center}>Options</th>
            </tr>
          </thead>
          <tbody id={style.tbody}>
            {exams.map((data, i) => (
              <tr key={i}>
                <td>{data.exam_name}</td>
                <td>{data.exam_desc}</td>
                <td>{data.exam_date}</td>
                <td>{data.exam_level}</td>
                <td>
                  <NavLink to={`/AdminDashboard/Exam/Details/${data.id}`}>
                    <button>Details</button>
                  </NavLink>

                  <NavLink to={`/AdminDashboard/Exam/ViewQuestion/${data.id}`}>
                    <button>View Question</button>
                  </NavLink>

                  <NavLink to={`/AdminDashboard/Exam/AddQuestion/${data.id}`}>
                    <button>Add Question</button>
                  </NavLink>

                  <button onClick={() => deleteExam(data.id!)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id={style.addSubjectBox}>
        <button onClick={handleAddExam}>Add Exam</button>
      </div>

      <div id={style.addBox} style={display}>
        <label htmlFor="exam_name">Enter Exam Name</label>
        <input
          onChange={handleInput}
          name="exam_name"
          type="text"
          placeholder="Enter Exam Name"
        />

        <label htmlFor="exam_desc">Enter Exam Description</label>
        <input
          onChange={handleInput}
          name="exam_desc"
          type="text"
          placeholder="Enter Exam Description"
        />

        <label htmlFor="exam_level">Enter Exam Level</label>
        <input
          onChange={handleInput}
          name="exam_level"
          type="text"
          placeholder="Enter Exam Level"
        />

        <label htmlFor="exam_totalQuestion">Enter Total Question</label>
        <input
          onChange={handleInput}
          name="exam_totalQuestion"
          type="text"
          placeholder="Enter Total Questions"
        />

        <label htmlFor="exam_marks">Enter Total Marks</label>
        <input
          onChange={handleInput}
          name="exam_marks"
          type="text"
          placeholder="Enter Total Marks"
        />

        <label htmlFor="exam_passMarks">Enter Pass Marks</label>
        <input
          onChange={handleInput}
          name="exam_passMarks"
          type="text"
          placeholder="Enter Pass Marks"
        />

        <div id={style.buttonBox}>
          <button onClick={handleAddNewExam}>Add</button>
          <button onClick={handleCloseExam}>Close</button>
        </div>
      </div>
    </>
  );
}

export default Exam;

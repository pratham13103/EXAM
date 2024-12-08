import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../../SubjectComponent/Subject.module.css";

interface Question {
  id: number;
  question_name: string;
  option_one: string;
  option_two: string;
  option_three: string;
  option_four: string;
  question_answer: string;
  exam_id: string;
  subject_name: string;
}

function ViewQuestion() {
  const [display, setDisplay] = useState<{ display: string }>({ display: "none" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [updatedQ, setUpdatedQ] = useState<Question | Partial<Question>>({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: "",
    subject_name: "",
  });
  const [qId, setQId] = useState<number | undefined>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return; // Avoid fetching questions if `id` is not available

    async function getAllQuestions() {
      try {
        const value = await axios.get("http://localhost:3000/api/v1/question");
        setQuestions(value.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getAllQuestions();
  }, [id]); // Re-fetch when `id` changes

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedQ({
      ...updatedQ,
      [e.target.name]: e.target.value,
    });
  };

  const setDataInInputField = (questionId: number) => {
    setQId(questionId);
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setUpdatedQ(question);
    }
  };

  const updateQuestion = async () => {
    if (qId !== undefined) {
      try {
        await axios.put(`http://localhost:3000/api/v1/question/${qId}`, updatedQ);
        window.location.reload();
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };

  const deleteQuestion = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/question/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleEditQuestion = (questionId: number) => {
    setDisplay({ display: "block" });
    setDataInInputField(questionId);
  };

  const handleClose = () => {
    setDisplay({ display: "none" });
  };

  const handleGoBack = () => {
    navigate("/AdminDashboard/Exam");
  };

  // Handle if id is not available or not found
  if (!id) {
    navigate("/AdminDashboard/Exam"); // Redirect if no valid id is found
    return null; // Prevent rendering if id is missing
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Question List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id={style.center}>Question Name</th>
              <th id={style.center}>Option one</th>
              <th id={style.center}>Option two</th>
              <th id={style.center}>Option three</th>
              <th id={style.center}>Option four</th>
              <th id={style.center}>Question Answer</th>
              <th id={style.center}>Options</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((data, i) => {
              if (id && parseInt(data.exam_id) === parseInt(id)) {
                return (
                  <tr key={i}>
                    <td>{data.question_name}</td>
                    <td>{data.option_one}</td>
                    <td>{data.option_two}</td>
                    <td>{data.option_three}</td>
                    <td>{data.option_four}</td>
                    <td>{data.question_answer}</td>
                    <td>
                      <button onClick={() => handleEditQuestion(data.id)}>Edit</button>
                      <button onClick={() => deleteQuestion(data.id)}>Delete</button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      <div id={style.addSubjectBox}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>

      <div id={style.addBox} style={display}>
        <label>Enter Question</label>
        <input
          value={updatedQ.question_name || ""}
          onChange={onTextFieldChange}
          name="question_name"
          type="text"
          placeholder="Enter Question"
        />

        <label>Enter Option A</label>
        <input
          value={updatedQ.option_one || ""}
          onChange={onTextFieldChange}
          name="option_one"
          type="text"
          placeholder="Enter Option A"
        />

        <label>Enter Option B</label>
        <input
          value={updatedQ.option_two || ""}
          onChange={onTextFieldChange}
          name="option_two"
          type="text"
          placeholder="Enter Option B"
        />

        <label>Enter Option C</label>
        <input
          value={updatedQ.option_three || ""}
          onChange={onTextFieldChange}
          name="option_three"
          type="text"
          placeholder="Enter Option C"
        />

        <label>Enter Option D</label>
        <input
          value={updatedQ.option_four || ""}
          onChange={onTextFieldChange}
          name="option_four"
          type="text"
          placeholder="Enter Option D"
        />

        <label>Enter Question Answer</label>
        <input
          value={updatedQ.question_answer || ""}
          onChange={onTextFieldChange}
          name="question_answer"
          type="text"
          placeholder="Enter Answer"
        />

        <label>Enter Subject</label>
        <input
          value={updatedQ.subject_name || ""}
          onChange={onTextFieldChange}
          name="subject_name"
          type="text"
          placeholder="Enter Subject"
        />

        <div id={style.buttonBox}>
          <button onClick={updateQuestion}>Update Question</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default ViewQuestion;

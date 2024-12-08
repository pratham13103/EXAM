import style from "../../SubjectComponent/Subject.module.css";
import { useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Question {
  question_name: string;
  option_one: string;
  option_two: string;
  option_three: string;
  option_four: string;
  question_answer: string;
  exam_id: string;
  subject_name: string;
}

export const AddQuestion = () => {
  const { id } = useParams<{ id: string }>();

  const [question, setQuestion] = useState<Question>({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: id || "",
    subject_name: "",
  });

  const navigate = useNavigate();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoBack = () => {
    navigate(`/AdminDashboard/Exam`);
  };

  const addnewQuestion = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/question", question);
      navigate(`/AdminDashboard/Exam/ViewQuestion/${id}`);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Adding Question</h2>
      </div>

      <div id={style.addBox} className={style.addQuestion}>
        <label>Question Name</label>
        <input
          onChange={onInputChange}
          name="question_name"
          type="text"
          placeholder="Enter Question"
        />

        <label>Enter Option A</label>
        <input
          onChange={onInputChange}
          name="option_one"
          type="text"
          placeholder="Enter Option A"
        />

        <label>Enter Option B</label>
        <input
          onChange={onInputChange}
          name="option_two"
          type="text"
          placeholder="Enter Option B"
        />

        <label>Enter Option C</label>
        <input
          onChange={onInputChange}
          name="option_three"
          type="text"
          placeholder="Enter Option C"
        />

        <label>Enter Option D</label>
        <input
          onChange={onInputChange}
          name="option_four"
          type="text"
          placeholder="Enter Option D"
        />

        <label>Enter Question Answer</label>
        <input
          onChange={onInputChange}
          name="question_answer"
          type="text"
          placeholder="Enter Question answer (don't write option A, B, C, D)"
        />

        <label>Enter Subject</label>
        <input
          onChange={onInputChange}
          name="subject_name"
          type="text"
          placeholder="Enter Subject"
        />

        <div id={style.buttonBox}>
          <button onClick={addnewQuestion}>Add</button>
          <button onClick={handleGoBack}>Go back</button>
        </div>
      </div>
    </>
  );
};

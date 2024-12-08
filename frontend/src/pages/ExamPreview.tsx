import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExamPreview.css";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export const ExamPreview = () => {
  const [examTitle, setExamTitle] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedExamTitle = localStorage.getItem("examTitle");
    const savedQuestions = JSON.parse(localStorage.getItem("examQuestions") || "[]");

    setExamTitle(savedExamTitle);
    setQuestions(savedQuestions);
  }, []);

  return (
    <div className="exam-preview-container">
      <h1>Preview Exam</h1>

      {examTitle && <h2>{examTitle}</h2>} {/* Display exam title */}

      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((question, index) => (
          <div key={index} className="question-container">
            <p>
              <strong>{question.questionText}</strong>
            </p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
            <p>Correct Answer: {question.correctAnswer}</p>
          </div>
        ))
      )}

      <button onClick={() => navigate("/exam-list")}>Back to Exam List</button>
    </div>
  );
};

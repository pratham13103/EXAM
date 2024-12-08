import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExamCreation.css";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export const ExamCreation = () => {
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();

  // Handle change for the exam title input field to accept a string
  const handleExamTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setExamTitle(newTitle); // Allow the input to be any string
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addQuestion = () => {
    if (!questionText || options.some((option) => !option) || !correctAnswer) {
      alert("Please complete all fields.");
      return;
    }

    const newQuestion = { questionText, options, correctAnswer };
    setQuestions((prev) => [...prev, newQuestion]);

    // Save the question to localStorage
    const savedQuestions = JSON.parse(localStorage.getItem("examQuestions") || "[]");
    localStorage.setItem("examQuestions", JSON.stringify([...savedQuestions, newQuestion]));

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    alert("Question added successfully!");
  };

  // In ExamCreation.tsx, after saving the exam title
  // Save the created exam in localStorage with its questions and title
  const saveExam = () => {
    if (!examTitle) {
      alert("Please enter a title for the exam.");
      return;
    }
  
    // Save the exam title to localStorage
    const savedExams = JSON.parse(localStorage.getItem("examsCreated") || "[]");
  
    // Find if the exam already exists or create a new one
    const existingExam = savedExams.find((exam: { title: string }) => exam.title === examTitle);
    if (!existingExam) {
      savedExams.push({ title: examTitle, students: [], questions: [] });
    }
  
    // Save the questions under the selected exam
    const examIndex = savedExams.findIndex((exam: { title: string }) => exam.title === examTitle);
    savedExams[examIndex].questions = questions;
  
    // Save the updated exams array to localStorage
    localStorage.setItem("examsCreated", JSON.stringify(savedExams));
  
    alert("Exam saved successfully!");
    navigate("/teacher-dashboard"); // Navigate back to the Teacher Dashboard
  };
  


  return (
    <div className="exam-creation-container">
      <h1>Exam Creation</h1>

      {/* Exam Title Input */}
      {!examTitle ? (
        <div className="form-group">
          <label htmlFor="exam-title">Exam Title</label>
          <input
            type="text"
            id="exam-title"
            value={examTitle}
            onChange={handleExamTitleChange} // Use custom change handler
            placeholder="Enter exam title (e.g., Math, English)"
          />
          <button className="submit-button" onClick={saveExam}>
            Set Title
          </button>
        </div>
      ) : (
        <>
          <h2>{examTitle}</h2> {/* Display exam title */}
          
          {/* Question form */}
          <div className="form-group">
            <label htmlFor="question-text">Question</label>
            <input
              type="text"
              id="question-text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter question"
            />
          </div>

          {options.map((option, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`option-${index}`}>Option {index + 1}</label>
              <input
                type="text"
                id={`option-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="correct-answer">Correct Answer</label>
            <input
              type="text"
              id="correct-answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter correct answer"
            />
          </div>

          <button className="submit-button" onClick={addQuestion}>
            Add Question
          </button>

          {questions.length > 0 && (
            <div className="questions-preview">
              <h2>Questions Preview</h2>
              <ul>
                {questions.map((q, index) => (
                  <li key={index}>
                    <strong>{q.questionText}</strong>
                    <ul>
                      {q.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                    <p>Correct Answer: {q.correctAnswer}</p>
                  </li>
                ))}
              </ul>
              <button className="submit-button" onClick={saveExam}>
                Save Exam
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

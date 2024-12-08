import { useState, useEffect } from "react";
import "./Exam.css";

// Define the structure for each question
interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

// Define the structure for each exam (including subject)
interface Exam {
  title: string;
  questions: Question[];
}

export const Exam = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [previewExam, setPreviewExam] = useState<Exam | null>(null);

  // Fetch saved exams from localStorage
  useEffect(() => {
    const savedExams = JSON.parse(localStorage.getItem("examsCreated") || "[]");
    setExams(savedExams);
  }, []);

  // Handle previewing an exam
  const previewExamHandler = (exam: Exam) => {
    setPreviewExam(exam); // Set the selected exam for preview
  };

  // Handle going back to the list of exams
  const goBackToExams = () => {
    setPreviewExam(null); // Set previewExam to null to go back to the exam list
  };

  return (
    <div className="exam-page-container">
      <h1>Choose Your Exam</h1>

      {/* If an exam is selected for preview, show it */}
      {previewExam ? (
        <div className="exam-preview">
          <button onClick={goBackToExams}>Back to Exam List</button>
          <h2>{previewExam.title}</h2>
          <div className="questions-preview">
            {previewExam.questions.length === 0 ? (
              <p>No questions available for this exam.</p>
            ) : (
              previewExam.questions.map((question, index) => (
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
          </div>
        </div>
      ) : (
        // Display the list of exams if no exam is selected for preview
        exams.length === 0 ? (
          <p>No exams available. Please create an exam first.</p>
        ) : (
          exams.map((exam, index) => (
            <div key={index} className="exam-container">
              <h3>{exam.title}</h3>
              <button onClick={() => previewExamHandler(exam)}>Preview Exam</button>
            </div>
          ))
        )
      )}
    </div>
  );
};

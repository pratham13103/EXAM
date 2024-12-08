import express from "express";
import nodemailer from "nodemailer";
import { authMiddleware } from "../middleware";
const router = express.Router();

// Sample in-memory data for questions (ideally this would be in a database)
const questions = [
  {
    id: 1,
    questionText: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    correctAnswer: "New Delhi",
  },
  {
    id: 2,
    questionText: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  // Add more questions as needed
];

// Create a transport for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service here
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password",  // Replace with your email password or app-specific password
  },
});

// Route to fetch exam questions
router.get("/questions", authMiddleware, (req, res) => {
  res.json({ questions });
});

// Route to submit answers and calculate results
router.post("/submit", authMiddleware, (req, res) => {
  const { answers } = req.body; // answers should be an array of the selected answers

  let correct = 0;
  let wrong = 0;
  let notAttempted = 0;

  answers.forEach((answer: string, index: number) => {
    if (!answer) {
      notAttempted++;
    } else if (answer === questions[index].correctAnswer) {
      correct++;
    } else {
      wrong++;
    }
  });

  const score = (correct / questions.length) * 100;

  res.json({
    correctAnswers: correct,
    wrongAnswers: wrong,
    notAttempted: notAttempted,
    score: score.toFixed(2),
  });
});

// Route to grant access to the exam
router.post("/grant-access", async (req, res) => {
  const { studentEmail, examName } = req.body; // Get student's email and exam name

  const mailOptions = {
    from: "your-email@gmail.com",
    to: studentEmail,
    subject: "Exam Access Granted",
    text: `You have been granted access to the exam: ${examName}. Please log in to access and take the exam.`,
  };

  try {
    // Send email to the student
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

export default router;

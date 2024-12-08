import express from "express";
import cors from "cors";
import { Request, Response } from "express";

// Example data (replace with database logic)
const users = [
  { id: "1", user_name: "Student One", user_email: "student1@example.com" },
  { id: "2", user_name: "Student Two", user_email: "student2@example.com" },
  { id: "3", user_name: "Student Three", user_email: "student3@example.com" },
];

const results = [
  {
    user_email: "student1@example.com",
    exam_name: "Math Exam",
    exam_date: "2024-05-10",
    result_status: "Passed",
    result_score: 85,
    total_marks: 100,
  },
  {
    user_email: "student2@example.com",
    exam_name: "English Exam",
    exam_date: "2024-06-10",
    result_status: "Failed",
    result_score: 45,
    total_marks: 100,
  },
  {
    user_email: "student3@example.com",
    exam_name: "Science Exam",
    exam_date: "2024-07-15",
    result_status: "Passed",
    result_score: 90,
    total_marks: 100,
  },
];

// Create a router
const router = express.Router();

// Define routes

// Fetch all students
router.get("/user", (req: Request, res: Response) => {
  res.json(users); // Send all student data
});

// Fetch a single student by ID
router.get("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user); // Send user data
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Fetch all results
router.get("/result", (req: Request, res: Response) => {
  res.json(results); // Send all results
});

// Export the router
export { router };

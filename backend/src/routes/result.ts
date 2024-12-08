import express, { Request, Response } from "express";

const router = express.Router();

// Sample result data (in a real application, this might come from a database)
const results = [
  {
    id: 1,
    user_email: "user1@example.com",
    exam_name: "Math Quiz",
    exam_date: "2024-01-01",
    result_status: "Pass",
    result_score: 85,
    total_marks: 100,
    total_Question: 20,
  },
  {
    id: 2,
    user_email: "user2@example.com",
    exam_name: "Science Test",
    exam_date: "2024-01-02",
    result_status: "Fail",
    result_score: 40,
    total_marks: 100,
    total_Question: 20,
  },
];

// Route to get all results
router.get("/", (_req: Request, res: Response) => {
  res.json({ results });
});

// Route to add a result
router.post("/", (req: Request, res: Response) => {
  const {
    user_email,
    exam_name,
    exam_date,
    result_status,
    result_score,
    total_marks,
    total_Question,
  } = req.body;

  // Create a new result entry
  const newResult = {
    id: results.length + 1,
    user_email,
    exam_name,
    exam_date,
    result_status,
    result_score,
    total_marks,
    total_Question,
  };

  results.push(newResult);
  res.status(201).json(newResult);
});

export { router };

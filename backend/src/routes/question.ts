import express, { Request, Response } from "express";

const router = express.Router();

const questions = [
  { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { id: 3, question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Einstein" },
];

// Route to get all questions
router.get("/", (_req: Request, res: Response) => {
  res.json({ questions });
});

// Route to get a single question by ID
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const question = questions.find((q) => q.id === parseInt(id, 10));
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ message: "Question not found" });
  }
});

// Route to add a question
router.post("/", (req: Request, res: Response) => {
  const { question, options, answer } = req.body;
  if (!question || !options || !answer) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newQuestion = { id: questions.length + 1, question, options, answer };
  questions.push(newQuestion);
  res.status(201).json(newQuestion);
});

export { router };

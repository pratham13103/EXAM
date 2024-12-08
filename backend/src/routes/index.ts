// routes/index.ts
import express from "express";
import userRouter from "./user";   // Assuming you have this file
import examRouter from "./Exam";   // Assuming you have this file
import { router as subjectRouter } from "./subject";  // Correctly import subject router with named import
import { router as questionRouter } from "./question"; // Import the question router from question.ts
import { router as resultRouter } from "./result";
import { router as studentRouter } from "./student";

const router = express.Router();

// Use each router for the relevant path
router.use("/user", userRouter);   // Example: /api/v1/user
router.use("/exam", examRouter);   // Example: /api/v1/exam
router.use("/subject", subjectRouter);  // Example: /api/v1/subject
router.use("/question", questionRouter); // Example: /api/v1/question
router.use("/result", resultRouter); // Example: /api/v1/result
router.use("/student", studentRouter);  // Example: /api/v1/stufdent

export default router;

// routes/index.ts
import express from "express";
import userRouter from "./user";   // Assuming you have this file
import examRouter from "./Exam";   // Assuming you have this file


const router = express.Router();

// Use each router for the relevant path
router.use("/user", userRouter);   // Example: /api/v1/user
router.use("/exam", examRouter);   // Example: /api/v1/exam

export default router;

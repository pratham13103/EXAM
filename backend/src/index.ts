// index.ts (Main entry point for the app)
import express from "express";
import cors from "cors";
import rootRouter from "./routes"; // Import the root router from 'routes' folder

const app = express();

// Middleware for CORS and JSON parsing
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's URL
}));
app.use(express.json());

// Use /api/v1 prefix for all routes
app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

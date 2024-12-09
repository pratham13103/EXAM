import express, { Request, Response, NextFunction } from "express";
import { prisma } from "../prismaClient"; // Ensure the prisma client is correctly imported
import jwt from "jsonwebtoken"; // JWT package for verifying token

const router = express.Router();

// Middleware to check if the user is authenticated and an admin
const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    res.status(401).json({ error: "Unauthorized" }); // No token provided
    return; // Ensure we don't continue to the next middleware if no token is provided
  }

  try {
    // Verify the JWT token and extract the user role from it
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      role: string;
    };

    // Check if the user role is "admin"
    if (decoded.role !== "admin") {
      res.status(403).json({ error: "Forbidden: Admins only" }); // User is not an admin
      return; // Prevent further middleware execution
    }

    // Attach user data to the request object
    req.user = decoded; // You can add this if you want to use the user information in the next handlers

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" }); // Token verification failed
  }
};

// Admin dashboard route
router.get("/dashboard", isAdmin, async (req: Request, res: Response) => {
  try {
    // Count the total number of users in the database
    const userCount = await prisma.user.count();

    // Return the user count in the response
    res.json({
      message: "Admin Dashboard Data",
      userCount,
    });
  } catch (error) {
    // Handle any errors during the database operation
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;

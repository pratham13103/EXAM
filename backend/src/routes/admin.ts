import express from 'express';
import { prisma } from '../prismaClient';
import jwt from 'jsonwebtoken';

// Extend the Request interface locally
interface AuthenticatedRequest extends express.Request {
  user?: {
    userId: string;
    role: string;
  };
}

const router = express.Router();

// Middleware to check if user is an admin
const isAdmin = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
     res.status(401).json({ error: 'Unauthorized' });
     return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      role: string;
    };

    if (decoded.role !== 'admin') {
       res.status(403).json({ error: 'Forbidden: Admins only' });
       return;
    }

    req.user = decoded; // Assign decoded token data to `req.user`
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Admin dashboard route
router.get('/dashboard', isAdmin, async (req: AuthenticatedRequest, res: express.Response) => {
  console.log(`Admin Request by User ID: ${req.user?.userId}`); // Safely access `req.user`
  try {
    const userCount = await prisma.user.count();

    res.json({
      message: 'Admin Dashboard Data',
      userCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router;

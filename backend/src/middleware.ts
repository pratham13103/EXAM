import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from './config';
import { prisma } from './prismaClient';

// Authentication middleware
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'] || '';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({
      message: 'Provide Token / Incorrect Token',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string; role: string };

    if (decoded && decoded.userId) {
      req.user = { userId: decoded.userId, role: decoded.role }; // Assign to `req.user`
      next();
    } else {
      res.status(403).json({
        message: 'Token Verification Failed',
      });
    }
  } catch (err) {
    res.status(403).json({
      message: 'Token Verification Failed',
    });
  }
};

// Admin verification middleware
export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = req.user; // Use `req.user`

  if (!user || !user.userId) {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    if (dbUser && dbUser.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied, admin only' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying admin' });
  }
};

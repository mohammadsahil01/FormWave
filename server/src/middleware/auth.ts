import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@clerk/backend';

export interface AuthRequest extends Request {
  auth?: {
    userId: string;
    sessionId: string;
    getToken: () => Promise<string | null>;
  };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    req.auth = {
      userId: payload.sub,
      sessionId: payload.sid || '',
      getToken: async () => token,
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Optional auth - doesn't fail if no token provided
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });

      req.auth = {
        userId: payload.sub,
        sessionId: payload.sid || '',
        getToken: async () => token,
      };
    }

    next();
  } catch (error) {
    // Continue without auth if token verification fails
    next();
  }
};
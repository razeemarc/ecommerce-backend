import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "No token provided" });

      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      // Attach user info to request in a type-safe way
      (req as any).user = payload;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

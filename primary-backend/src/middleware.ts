import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1]; // usually 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, JWT_PASSWORD) as { id: string };
    // @ts-ignore
    req.id = payload.id;
    next();
  } catch (e) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

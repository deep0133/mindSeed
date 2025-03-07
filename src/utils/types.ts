import { Request } from "express";

export const JWT_SECRET_KEY = process.env.JWT_SECRET as string;

// Extend Express Request to include `user`
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    iat: number;
    exp: number;
  };
}

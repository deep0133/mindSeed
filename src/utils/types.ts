import { Request } from "express";

export const JWT_SECRET_KEY = "lkjfoiewrfmn";

// Extend Express Request to include `user`
export interface AuthRequest extends Request {
  user?: { userId: string };
}

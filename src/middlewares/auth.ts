import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { default as ErrorHanlder } from "../utils/ErrorHandler"; // Fix typo in import
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest, JWT_SECRET_KEY } from "../utils/types";

export const Auth = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get token from Authorization header
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new ErrorHanlder("No token provided", "Unauthorized", 401);
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      userId: string;
      iat: number;
      exp: number;
    };

    // Attach user to request

    if (!decoded) {
      throw new ErrorHanlder("User not found", "Unauthorized", 401);
    }

    req.user = decoded;

    next(); // Proceed to the next middleware or controller
  }
);

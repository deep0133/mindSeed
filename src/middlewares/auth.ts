import { Request, Response } from "express";
import UserModel from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler"; // Fix typo in import
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../utils/types";

export const Auth = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user || !req.user.userId) {
    throw new ErrorHandler("Unauthorized", "Token missing or invalid", 401);
  }

  const userId = req.user.userId;
  const user = await UserModel.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new ErrorHandler("User Not Exist", "Token Expired or not exist", 400);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

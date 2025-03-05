import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ErrorHanlder from "../utils/ErrorHandler";
import UserModel from "../models/userModel";

import {
  loginSchema,
  userSchema,
  validateInputeData,
} from "../utils/validationSchema";
import { AuthRequest } from "../utils/types";

export const getProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    let user = await UserModel.findOne({ _id: userId }).select("-password");
    if (!user) {
      throw new ErrorHanlder(
        "User Not Exist",
        "Token Expired or not exist",
        400
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const getUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  let user = await UserModel.findOne({ _id: id }).select("-password");
  if (!user) {
    res.status(404).json({
      success: true,
      message: "user not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUser = asyncHandler(async (req: AuthRequest, res) => {
  let user = await UserModel.find({ _id: { $ne: req.user?.userId } });
  if (!user) {
    if (!user) {
      throw new ErrorHanlder("User List is Empty", "Database is Empty", 400);
    }
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const signUp = asyncHandler(async (req, res) => {
  const userData = req.body;
  const inputValidate = validateInputeData(userSchema, userData);

  if (!inputValidate?.success) {
    throw new ErrorHanlder("Inputs are invalids", inputValidate.error, 400);
  }

  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new ErrorHanlder("Email already in use", "Email already in use", 400);
  }

  const user = await UserModel.create(userData);

  const accessToken = user.generateJwtAccessToken();

  const refreshToken = user.generateJwtRefreshToken();

  res.status(200).json({
    success: true,
    message: "user created successfully",
    user,
    accessToken,
    refreshToken,
  });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  const inputValidate = validateInputeData(loginSchema, userData);

  if (!inputValidate?.success) {
    throw new ErrorHanlder("Invalid inputs", inputValidate.error, 400);
  }

  const user = await UserModel.findOne({ email: userData.email });

  if (!user) {
    throw new ErrorHanlder("Invalid Credentails", "User Not Exist", 400);
  }

  const passwordComparison = await user.matchPassword(userData.password);

  if (!passwordComparison) {
    throw new ErrorHanlder("Invalid Credentials", "Invalid Credentials", 400);
  }

  const accessToken = user.generateJwtAccessToken();

  const refreshToken = user.generateJwtRefreshToken();

  res.status(200).json({
    success: true,
    message: "user created successfully",
    user,
    accessToken,
    refreshToken,
  });
});

export const deleteAllUser = asyncHandler(async (req, res, next) => {
  const deletedUsers = await UserModel.deleteMany({});

  res.status(200).json({
    success: true,
    message: "user created successfully",
    deletedUsers,
  });
});

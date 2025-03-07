import { Router } from "express";
import {
  deleteAllUser,
  getAllUser,
  getProfile,
  getUser,
  signIn,
  signUp,
} from "../controllers/userController";
import { Auth } from "../middlewares/auth";

const userRoutes = Router();

// profile, list
userRoutes.get("/profile", Auth, getProfile);
userRoutes.get("/otherUser/:id", Auth, getUser);
userRoutes.get("/all", Auth, getAllUser);

// auth
userRoutes.post("/register", signUp);
userRoutes.post("/login", signIn);
userRoutes.delete("/deleteAll", deleteAllUser);

export default userRoutes;

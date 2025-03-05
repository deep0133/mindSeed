import { Router } from "express";
import {
  deleteAllUser,
  getAllUser,
  getProfile,
  getUser,
  signIn,
  signUp,
} from "../controllers/userController.js";
import { Auth } from "../middlewares/auth";

const userRoutes = Router();

// // middleware that is specific to this router
// const timeLog = (req, res, next) => {
//   console.log("User API Time: ", new Date(Date.now()).toLocaleString());
//   next();
// };
// userRoutes.use(timeLog);

userRoutes.get("/profile", Auth, getProfile);
userRoutes.get("/all", Auth, getAllUser);

export default userRoutes;

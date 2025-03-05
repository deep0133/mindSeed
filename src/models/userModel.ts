import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/types";

// Define a TypeScript interface for the User schema
interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  wallet: number;
  matchPassword(password: string): Promise<boolean>;
  generateJwtAccessToken(): string;
  generateJwtRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String,
    wallet: {
      type: Number,
      min: 0,
      default: 5000,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(8);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
  }
  next();
});

userSchema.methods.matchPassword = async function (password: string) {
  const check = await bcrypt.compare(password, this.password);
  return check;
};

userSchema.methods.generateJwtAccessToken = function () {
  const userId = this._id;
  const sign = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return sign;
};
userSchema.methods.generateJwtRefreshToken = function () {
  const userId = this._id;
  const sign = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
  return sign;
};

const UserModel = model<IUser>("user", userSchema);
export default UserModel;

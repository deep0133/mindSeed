const mongoose = require("mongoose");

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

const JobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  job_title: String,
  job_category_id: mongoose.Schema.Types.ObjectId,
  job_description: String,
  job_location: String,
  last_date: String,
  row_status: { type: String, enum: ["active", "delete"] },
  created_on: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);

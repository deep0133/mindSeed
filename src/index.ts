import express, { NextFunction, Request, Response } from "express";

import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes";

import "./config/db";

import fs from "fs";
import path from "path";

const app = express();

const PORT = process.env.PORT;

// Load Swagger JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../swagger.json"), "utf8")
);

app.use(express.json());

// Initialize Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mindseed backend working",
  });
});

app.listen(PORT, () => {
  console.log(`------App listening on : http://localhost:${PORT}`);
});

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(400).json({
//     success: false,
//     message: err.message,
//     error: err.errors,
//   });
// });

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Internal Server Error";
  let error = err?.error || err?.errors || "Error not detacted yet";
  res.status(statusCode).json({
    success: false,
    message: message,
    error: error,
  });
});

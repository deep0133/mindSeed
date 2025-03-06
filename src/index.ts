import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mindseed backend working",
  });
});

app.listen(PORT, () => {
  console.log(`------App listening on : http://localhost:${PORT}`);
});

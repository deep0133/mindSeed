import express from "express";
import dotenv from "dotenv";

dotenv.config();
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const PORT = process.env.PORT;

// Swagger Configuration
const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MindSeed Doc",
      version: "1.0.0",
      description: "API documentation for Frontend developers",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Adjust this path based on your project structure
};

// Initialize Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mindseed backend working",
  });
});

app.listen(PORT, () => {
  console.log(`------App listening on : http://localhost:${PORT}`);
});

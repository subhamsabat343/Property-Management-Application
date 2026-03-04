import express from "express";
import cors from "cors";
import routes from "@/routes/index.ts";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/", routes);

export default app;

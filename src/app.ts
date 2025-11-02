import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/health", healthRoutes);

export default app;

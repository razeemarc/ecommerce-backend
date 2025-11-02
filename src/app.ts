import express from "express";
import moduleRoutes from "./modules"; // centralized import
import healthRouter  from "./routes/health.routes";

const app = express();

app.use(express.json());
app.use("/api", moduleRoutes);
app.use("/health", healthRouter);

export default app;

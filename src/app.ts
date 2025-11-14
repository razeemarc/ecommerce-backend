import express from "express";
import healthRouter  from "./routes/health.routes";
import v1Router from "./routes/v1.routes";

const app = express();

app.use(express.json());
app.use("/api/v1", v1Router);
app.use("/health", healthRouter);

export default app;

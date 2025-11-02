import { Router, Request, Response } from "express";
import { prisma } from "../config/database";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const health: any = {
    status: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    health.database = "CONNECTED";
  } catch (err) {
    health.database = "DISCONNECTED";
    health.status = "DOWN";
  }

  res.status(health.status === "UP" ? 200 : 500).json(health);
});

export default router;

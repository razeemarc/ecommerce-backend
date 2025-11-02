// src/config/database.ts
import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prisma = new PrismaClient();

export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info("✅ Database connected successfully");
  } catch (error) {
    logger.error("❌ Database connection failed", error);
    process.exit(1);
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  logger.info("🛑 Database disconnected");
}

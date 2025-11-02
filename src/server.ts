import app from "./app";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { logger } from "./config/logger";
import { ENV } from "./config/environment";

async function startServer() {
  try {
    await connectDatabase();

    const server = app.listen(ENV.PORT, () => {
      logger.info(`🚀 Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
    });

    const shutdown = async () => {
      logger.info("🛑 Shutting down server...");
      server.close(async () => {
        await disconnectDatabase();
        logger.info("✅ Server closed gracefully");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

startServer();

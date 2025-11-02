import dotenv from "dotenv";
import path from "path";

// ✅ Load .env file (from root)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ✅ Helper to ensure required env variables exist
function requireEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

// ✅ Centralized environment configuration
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: parseInt(requireEnv("PORT", "5000"), 10),

  DATABASE_URL: requireEnv("DATABASE_URL"),

  JWT_SECRET: requireEnv("JWT_SECRET"),

  LOG_LEVEL: process.env.LOG_LEVEL || "info", // e.g., info | debug | error

  // Future example: add email, redis, or s3 creds here
  // EMAIL_API_KEY: requireEnv("EMAIL_API_KEY"),
};

// ✅ Optional convenience booleans
export const isDev = ENV.NODE_ENV === "development";
export const isProd = ENV.NODE_ENV === "production";
export const isTest = ENV.NODE_ENV === "test";

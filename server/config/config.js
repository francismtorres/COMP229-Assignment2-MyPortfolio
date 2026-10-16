/**
 * config.js
 * ---------------------------------------------------------------
 * Central place for every setting the back end needs (port, MongoDB
 * connection string, JWT secret). Values come from the ".env" file in
 * the project root so that secrets are never hard-coded or committed.
 * ---------------------------------------------------------------
 */
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Resolve ".env" relative to THIS file, so it is found whether the server is
// started from the project root (node server.js) or from the client folder
// (nodemon ../server.js via "npm run dev").
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(currentDirectory, "../../.env") });

const environment = process.env.NODE_ENV || "development";

// In production a missing secret must stop the app instead of silently using a weak default.
if (environment === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set when NODE_ENV is 'production'.");
}

const config = {
  env: environment,
  port: Number(process.env.PORT) || 3000,
  // Falls back to a local MongoDB so the project still starts without Atlas.
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Portfolio",
  jwtSecret: process.env.JWT_SECRET || "dev-only-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};

export default config;

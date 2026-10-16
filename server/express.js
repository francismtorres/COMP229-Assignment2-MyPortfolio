/**
 * express.js
 * Creates and configures the Express app: middleware first, then the REST API routes.
 * (The welcome route, error handlers and listening port live in server.js.)
 */
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// ----- Middleware -----
app.use(bodyParser.json()); // parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // parse form-encoded bodies
app.use(cookieParser()); // read cookies (the "t" token cookie)
app.use(compress()); // gzip responses
app.use(helmet()); // set secure HTTP headers
app.use(cors()); // allow the React client (a different port) to call the API

// ----- REST API routes -----
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

export default app;

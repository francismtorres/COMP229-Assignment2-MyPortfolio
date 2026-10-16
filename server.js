/**
 * server.js
 * Entry point of the back end: connects to MongoDB, registers the welcome route and
 * error handlers on the configured Express app, and starts listening for requests.
 * Run from the project root with:  node server.js   (or "npm run dev" from /client)
 */
import mongoose from "mongoose";
import config from "./server/config/config.js";
import app from "./server/express.js";
import assetsRouter from "./server/assets-router.js";
import { notFoundHandler, errorHandler } from "./server/helpers/errorHandlers.js";

// ----- MongoDB connection -----
mongoose.connection.on("error", (error) => {
  console.error(`MongoDB connection error: ${error.message}`);
});

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log(`Connected to the "${mongoose.connection.name}" database.`);
  })
  .catch((error) => {
    // The server keeps running so the welcome page still works; fix MONGODB_URI in .env and restart
    console.error(`Could not connect to MongoDB: ${error.message}`);
  });

// ----- Routes -----
app.use("/src", assetsRouter); // static assets (images/videos)

// Welcome message required by the assignment (shown at http://localhost:3000/)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// These must come AFTER all other routes
app.use(notFoundHandler);
app.use(errorHandler);

// ----- Start the server -----
app.listen(config.port, (error) => {
  if (error) {
    console.error(`Could not start the server: ${error.message}`);
    return;
  }
  console.log(`App running in port ${config.port}`);
  console.log(`Server running at http://localhost:${config.port}/`);
});

export default app;

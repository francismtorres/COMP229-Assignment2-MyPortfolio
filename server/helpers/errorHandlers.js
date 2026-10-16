/**
 * errorHandlers.js
 * The last two middleware functions in the app: one for unknown routes (404)
 * and one for any error thrown while handling a request.
 */

// 404 - no route matched the request
export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} was not found.` });
};

// Central error handler (Express recognises it by its four parameters)
// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  // express-jwt throws this when the token is missing, invalid or expired
  if (error.name === "UnauthorizedError") {
    return res.status(401).json({ error: error.message });
  }
  // body-parser throws this when the request body is not valid JSON
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body contains invalid JSON." });
  }
  console.error(error);
  return res.status(500).json({ error: "Internal server error." });
};

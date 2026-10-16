import mongoose from "mongoose";

/**
 * validateId: middleware for routes with an ":id" parameter.
 * Rejects malformed ids with 400 before they reach the database, instead of
 * letting Mongoose throw a confusing CastError.
 */
const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: `"${req.params.id}" is not a valid id.` });
  }
  return next();
};

export default validateId;

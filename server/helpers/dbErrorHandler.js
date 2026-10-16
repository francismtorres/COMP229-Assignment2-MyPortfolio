/**
 * dbErrorHandler.js
 * Turns Mongoose / MongoDB errors into short, readable messages for API clients.
 */

// Returns a friendly message for a MongoDB duplicate-key error (error code 11000)
const getUniqueErrorMessage = (error) => {
  const duplicatedField = Object.keys(error.keyPattern ?? error.keyValue ?? {})[0];
  return duplicatedField
    ? `An account with that ${duplicatedField} already exists.`
    : "A record with those details already exists.";
};

/**
 * getErrorMessage: picks the most useful message out of any database error.
 * - duplicate key       -> "An account with that email already exists."
 * - validation failures -> all failing field messages joined together
 * - anything else       -> the error's own message
 */
export const getErrorMessage = (error) => {
  if (error?.code === 11000 || error?.code === 11001) {
    return getUniqueErrorMessage(error);
  }
  if (error?.name === "ValidationError" && error.errors) {
    return Object.values(error.errors)
      .map((fieldError) => fieldError.message)
      .join(" ");
  }
  return error?.message || "Something went wrong.";
};

export default { getErrorMessage };

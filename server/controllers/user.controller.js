/**
 * user.controller.js
 * Request handlers for the users REST API.
 * Passwords are hashed by the model before saving and are never sent back in a response.
 */
import User from "../models/user.model.js";
import { getErrorMessage } from "../helpers/dbErrorHandler.js";
import pickFields from "../helpers/pickFields.js";

// Fields a client may set. "created" and "updated" are managed by the server.
const allowedFields = ["name", "email", "password"];

/** POST /api/users - add a new user (public: this is how an account is registered) */
export const create = async (req, res) => {
  try {
    const user = new User(pickFields(req.body, allowedFields));
    await user.save(); // the model's pre-save hook hashes the password here
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/users - get all users */
export const list = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: 1 });
    return res.json(users);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/users/:id - get one user by id */
export const read = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** PUT /api/users/:id - update a user by id (a user may only update their own account) */
export const update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Using save() (instead of findByIdAndUpdate) makes sure a new password is validated and hashed
    user.set(pickFields(req.body, allowedFields));
    user.updated = Date.now();
    await user.save();
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/users/:id - remove a user by id (a user may only delete their own account) */
export const remove = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json({ message: "User deleted successfully.", user: deletedUser });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/users - remove ALL users */
export const removeAll = async (req, res) => {
  try {
    const { deletedCount } = await User.deleteMany({});
    return res.json({ message: `${deletedCount} users deleted successfully.`, deletedCount });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

export default { create, list, read, update, remove, removeAll };

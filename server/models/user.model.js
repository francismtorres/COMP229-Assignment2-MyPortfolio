/**
 * user.model.js
 * Mongoose schema for the "users" collection (accounts that can sign in).
 * The "password" field stores a salted HASH, never the plain-text password.
 */
import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../helpers/password.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true, // no two accounts may share an email
    required: [true, "Email is required."],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters."],
    select: false, // excluded from query results unless explicitly requested (see auth.controller.js)
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

// Safety net: even if a document that contains the password is converted to JSON, remove it.
UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
    return returnedObject;
  },
});

// Runs before every save: hash the password only when it was just set or changed.
UserSchema.pre("save", async function hashPasswordBeforeSave() {
  if (!this.isModified("password")) return;
  this.password = await hashPassword(this.password);
});

/** authenticate: compares a plain-text password with the stored hash. */
UserSchema.methods.authenticate = function authenticate(plainPassword) {
  return verifyPassword(plainPassword, this.password);
};

// Mongoose pluralises "User" -> collection name "users"
export default mongoose.model("User", UserSchema);

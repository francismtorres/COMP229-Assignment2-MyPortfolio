/**
 * qualification.model.js
 * Mongoose schema for the "qualifications" collection: education and professional qualifications.
 */
import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required."],
  },
  firstname: {
    type: String,
    trim: true,
    required: [true, "First name is required."],
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, "Last name is required."],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email is required."],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."],
  },
  // Date the qualification was (or will be) completed
  completion: {
    type: Date,
    required: [true, "Completion date is required."],
  },
  description: {
    type: String,
    trim: true,
  },
});

// Mongoose pluralises "Qualification" -> collection name "qualifications"
export default mongoose.model("Qualification", QualificationSchema);

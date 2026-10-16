/**
 * project.model.js
 * Mongoose schema for the "projects" collection: portfolio projects I want to highlight.
 */
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
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
  // Date the project was (or will be) completed
  completion: {
    type: Date,
    required: [true, "Completion date is required."],
  },
  description: {
    type: String,
    trim: true,
  },
});

// Mongoose pluralises "Project" -> collection name "projects"
export default mongoose.model("Project", ProjectSchema);

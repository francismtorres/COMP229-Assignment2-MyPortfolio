/**
 * project.controller.js
 * Request handlers for the projects REST API (create, list, read, update, remove, removeAll).
 * Every handler is async/await with try/catch so errors become clean JSON responses.
 */
import Project from "../models/project.model.js";
import { getErrorMessage } from "../helpers/dbErrorHandler.js";
import pickFields from "../helpers/pickFields.js";

// The only fields a client is allowed to send
const allowedFields = ["title", "firstname", "lastname", "email", "completion", "description"];

/** POST /api/projects - add a new project */
export const create = async (req, res) => {
  try {
    const project = await Project.create(pickFields(req.body, allowedFields));
    return res.status(201).json(project);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/projects - get all projects */
export const list = async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: 1 });
    return res.json(projects);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/projects/:id - get one project by id */
export const read = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json(project);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** PUT /api/projects/:id - update a project by id */
export const update = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      pickFields(req.body, allowedFields),
      { new: true, runValidators: true } // return the updated document and enforce the schema rules
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json(updatedProject);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/projects/:id - remove a project by id */
export const remove = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json({ message: "Project deleted successfully.", project: deletedProject });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/projects - remove ALL projects */
export const removeAll = async (req, res) => {
  try {
    const { deletedCount } = await Project.deleteMany({});
    return res.json({ message: `${deletedCount} projects deleted successfully.`, deletedCount });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

export default { create, list, read, update, remove, removeAll };

/**
 * qualification.controller.js
 * Request handlers for the qualifications REST API (create, list, read, update, remove, removeAll).
 * Every handler is async/await with try/catch so errors become clean JSON responses.
 */
import Qualification from "../models/qualification.model.js";
import { getErrorMessage } from "../helpers/dbErrorHandler.js";
import pickFields from "../helpers/pickFields.js";

// The only fields a client is allowed to send
const allowedFields = ["title", "firstname", "lastname", "email", "completion", "description"];

/** POST /api/qualifications - add a new qualification */
export const create = async (req, res) => {
  try {
    const qualification = await Qualification.create(pickFields(req.body, allowedFields));
    return res.status(201).json(qualification);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/qualifications - get all qualifications */
export const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ _id: 1 });
    return res.json(qualifications);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/qualifications/:id - get one qualification by id */
export const read = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found." });
    }
    return res.json(qualification);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** PUT /api/qualifications/:id - update a qualification by id */
export const update = async (req, res) => {
  try {
    const updatedQualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      pickFields(req.body, allowedFields),
      { new: true, runValidators: true } // return the updated document and enforce the schema rules
    );
    if (!updatedQualification) {
      return res.status(404).json({ error: "Qualification not found." });
    }
    return res.json(updatedQualification);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/qualifications/:id - remove a qualification by id */
export const remove = async (req, res) => {
  try {
    const deletedQualification = await Qualification.findByIdAndDelete(req.params.id);
    if (!deletedQualification) {
      return res.status(404).json({ error: "Qualification not found." });
    }
    return res.json({ message: "Qualification deleted successfully.", qualification: deletedQualification });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/qualifications - remove ALL qualifications */
export const removeAll = async (req, res) => {
  try {
    const { deletedCount } = await Qualification.deleteMany({});
    return res.json({ message: `${deletedCount} qualifications deleted successfully.`, deletedCount });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

export default { create, list, read, update, remove, removeAll };

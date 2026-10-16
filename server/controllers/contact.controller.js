/**
 * contact.controller.js
 * Request handlers for the contacts REST API (create, list, read, update, remove, removeAll).
 * Every handler is async/await with try/catch so errors become clean JSON responses.
 */
import Contact from "../models/contact.model.js";
import { getErrorMessage } from "../helpers/dbErrorHandler.js";
import pickFields from "../helpers/pickFields.js";

// The only fields a client is allowed to send
const allowedFields = ["firstname", "lastname", "email"];

/** POST /api/contacts - add a new contact */
export const create = async (req, res) => {
  try {
    const contact = await Contact.create(pickFields(req.body, allowedFields));
    return res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/contacts - get all contacts */
export const list = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: 1 });
    return res.json(contacts);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** GET /api/contacts/:id - get one contact by id */
export const read = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    return res.json(contact);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** PUT /api/contacts/:id - update a contact by id */
export const update = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      pickFields(req.body, allowedFields),
      { new: true, runValidators: true } // return the updated document and enforce the schema rules
    );
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    return res.json(updatedContact);
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/contacts/:id - remove a contact by id */
export const remove = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    return res.json({ message: "Contact deleted successfully.", contact: deletedContact });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

/** DELETE /api/contacts - remove ALL contacts */
export const removeAll = async (req, res) => {
  try {
    const { deletedCount } = await Contact.deleteMany({});
    return res.json({ message: `${deletedCount} contacts deleted successfully.`, deletedCount });
  } catch (error) {
    return res.status(400).json({ error: getErrorMessage(error) });
  }
};

export default { create, list, read, update, remove, removeAll };

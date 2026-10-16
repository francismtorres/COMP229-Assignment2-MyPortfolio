/**
 * contact.routes.js
 * URL map for the contacts REST API, mounted at /api/contacts in express.js.
 * Access rules: GET (list and by id) requires sign-in; POST is PUBLIC; PUT and DELETE require sign-in.
 */
import express from "express";
import * as contactController from "../controllers/contact.controller.js";
import { requireSignin } from "../controllers/auth.controller.js";
import validateId from "../helpers/validateId.js";

const router = express.Router();

router
  .route("/")
  .get(requireSignin, contactController.list) // get all contacts
  .post(contactController.create) // add a new contact
  .delete(requireSignin, contactController.removeAll); // remove all contacts

router
  .route("/:id")
  .get(requireSignin, validateId, contactController.read) // get a contact by id
  .put(requireSignin, validateId, contactController.update) // update a contact by id
  .delete(requireSignin, validateId, contactController.remove); // remove a contact by id

export default router;

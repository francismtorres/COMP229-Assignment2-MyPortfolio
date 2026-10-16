/**
 * qualification.routes.js
 * URL map for the qualifications REST API, mounted at /api/qualifications in express.js.
 * Access rules: GET (list and by id) is PUBLIC; POST requires sign-in; PUT and DELETE require sign-in.
 */
import express from "express";
import * as qualificationController from "../controllers/qualification.controller.js";
import { requireSignin } from "../controllers/auth.controller.js";
import validateId from "../helpers/validateId.js";

const router = express.Router();

router
  .route("/")
  .get(qualificationController.list) // get all qualifications
  .post(requireSignin, qualificationController.create) // add a new qualification
  .delete(requireSignin, qualificationController.removeAll); // remove all qualifications

router
  .route("/:id")
  .get(validateId, qualificationController.read) // get a qualification by id
  .put(requireSignin, validateId, qualificationController.update) // update a qualification by id
  .delete(requireSignin, validateId, qualificationController.remove); // remove a qualification by id

export default router;

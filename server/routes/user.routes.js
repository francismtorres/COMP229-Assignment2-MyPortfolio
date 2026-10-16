/**
 * user.routes.js
 * URL map for the users REST API, mounted at /api/users in express.js.
 * Access rules: POST (register) is PUBLIC; everything else requires sign-in, and
 * updating or deleting ONE user also requires that it is the signed-in user's own account.
 */
import express from "express";
import * as userController from "../controllers/user.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js";
import validateId from "../helpers/validateId.js";

const router = express.Router();

router
  .route("/")
  .get(requireSignin, userController.list) // get all users
  .post(userController.create) // add a new user (register)
  .delete(requireSignin, userController.removeAll); // remove all users

router
  .route("/:id")
  .get(requireSignin, validateId, userController.read) // get a user by id
  .put(requireSignin, validateId, hasAuthorization, userController.update) // update a user by id
  .delete(requireSignin, validateId, hasAuthorization, userController.remove); // remove a user by id

export default router;

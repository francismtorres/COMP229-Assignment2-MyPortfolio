/**
 * auth.routes.js
 * Sign-in and sign-out endpoints, mounted at /auth in express.js.
 */
import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/signin").post(authController.signin); // POST /auth/signin
router.route("/signout").get(authController.signout); // GET  /auth/signout

export default router;

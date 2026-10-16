/**
 * assets-router.js
 * Middleware for static assets (images and videos) requested from the back end.
 * Requests such as GET /src/logo.png are redirected to the Vite dev server,
 * which serves the real files from the client's "src" folder.
 */
import express from "express";
import config from "./config/config.js";

const router = express.Router();

const imageRegex = /\/.+\.(svg|png|jpg|jpeg)$/; // add other image formats here
const videoRegex = /\/.+\.(mp4|ogv)$/;

router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `${config.clientUrl}/src${filePath}`);
});

router.get(videoRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `${config.clientUrl}/src${filePath}`);
});

export default router;

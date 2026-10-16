/**
 * auth.controller.js
 * JWT authentication:
 *   signin            - checks email + password and returns a signed token
 *   signout           - clears the token cookie
 *   requireSignin     - middleware that protects a route (valid token required)
 *   hasAuthorization  - middleware that lets a user act only on their OWN account
 */
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import User from "../models/user.model.js";
import config from "../config/config.js";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

// Shared cookie options so setting and clearing the cookie always match
const cookieOptions = {
  httpOnly: true, // not readable from browser JavaScript
  sameSite: "lax",
  secure: config.env === "production", // HTTPS only in production
};

/** POST /auth/signin - authenticate a user and return a JWT */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // "password" is hidden by default (select: false), so ask for it explicitly here
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");

    // Same message for "no such user" and "wrong password" so attackers cannot tell which one failed
    if (!user || !(await user.authenticate(password))) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    res.cookie("t", token, { ...cookieOptions, maxAge: ONE_DAY_IN_MS });
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not sign in. Please try again." });
  }
};

/** GET /auth/signout - clear the token cookie */
export const signout = (req, res) => {
  res.clearCookie("t", cookieOptions);
  return res.json({ message: "Signed out successfully." });
};

// Looks for the token in the "Authorization: Bearer <token>" header first, then in the "t" cookie
const getTokenFromRequest = (req) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.slice("Bearer ".length);
  }
  return req.cookies?.t ?? null;
};

/**
 * requireSignin: protects a route. On success the decoded token payload is placed
 * on req.auth (e.g. req.auth._id); otherwise express-jwt raises an UnauthorizedError
 * which the central error handler turns into a 401 response.
 */
export const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  getToken: getTokenFromRequest,
});

/** hasAuthorization: the signed-in user's id must match the ":id" in the URL */
export const hasAuthorization = (req, res, next) => {
  const isOwnAccount = req.auth && req.params.id === req.auth._id;
  if (!isOwnAccount) {
    return res.status(403).json({ error: "User is not authorized to do that." });
  }
  return next();
};

export default { signin, signout, requireSignin, hasAuthorization };

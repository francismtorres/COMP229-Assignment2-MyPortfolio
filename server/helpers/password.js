/**
 * password.js
 * Salted password hashing using Node's built-in crypto module (scrypt), so no
 * extra dependency is needed. Passwords are NEVER stored in plain text.
 * Stored format:  "<salt hex>:<derived key hex>"
 */
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

/** hashPassword: returns "salt:hash" for a plain-text password. */
export const hashPassword = async (plainPassword) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(plainPassword, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString("hex")}`;
};

/** verifyPassword: true when the plain-text password matches the stored "salt:hash". */
export const verifyPassword = async (plainPassword, storedValue) => {
  if (typeof plainPassword !== "string" || typeof storedValue !== "string") return false;
  const [salt, storedKey] = storedValue.split(":");
  if (!salt || !storedKey) return false;

  const derivedKey = await scryptAsync(plainPassword, salt, KEY_LENGTH);
  const storedKeyBuffer = Buffer.from(storedKey, "hex");
  // timingSafeEqual avoids leaking information through comparison timing
  return storedKeyBuffer.length === derivedKey.length && timingSafeEqual(storedKeyBuffer, derivedKey);
};

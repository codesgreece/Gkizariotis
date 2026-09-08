import crypto from "node:crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gizariotis2026";
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || "gizariotis-admin-secret";

export const CATEGORIES = [
  "Κατοικίες",
  "Διαμερίσματα",
  "Επαγγελματικοί χώροι",
  "Ανακαινίσεις",
];

export const PROJECTS_BLOB_PATH = "data/projects.json";

export function createToken() {
  const payload = `${Date.now()}.${crypto.randomBytes(16).toString("hex")}`;
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export function isValidToken(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [ts, nonce, signature] = parts;
  const payload = `${ts}.${nonce}`;
  const expected = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("hex");
  if (signature !== expected) return false;
  const ageMs = Date.now() - Number(ts);
  return Number.isFinite(ageMs) && ageMs < 1000 * 60 * 60 * 24 * 7;
}

export function requireAuth(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return isValidToken(token);
}

export function checkPassword(password) {
  return String(password || "") === ADMIN_PASSWORD;
}

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

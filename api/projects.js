const { list } = require("@vercel/blob");

const PROJECTS_BLOB_PATH = "data/projects.json";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      res.statusCode = 200;
      return res.end("[]");
    }

    const result = await list({ prefix: PROJECTS_BLOB_PATH, token });
    const blob =
      result.blobs.find((item) => item.pathname === PROJECTS_BLOB_PATH) || null;

    if (!blob) {
      res.statusCode = 200;
      return res.end("[]");
    }

    const response = await fetch(`${blob.url}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      res.statusCode = 200;
      return res.end("[]");
    }

    const data = await response.json();
    const projects = Array.isArray(data) ? data : [];
    projects.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
    res.statusCode = 200;
    return res.end(JSON.stringify(projects));
  } catch (error) {
    console.error("GET /api/projects failed:", error);
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        error: "Αποτυχία φόρτωσης έργων.",
        detail: error?.message || String(error),
      }),
    );
  }
};

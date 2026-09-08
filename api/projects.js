const { json, setCors } = require("../_lib/auth");
const { readProjects } = require("../_lib/store");

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "GET") {
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return json(res, 200, []);
    }
    const projects = await readProjects();
    projects.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
    return json(res, 200, projects);
  } catch (error) {
    console.error("GET /api/projects failed:", error);
    return json(res, 500, {
      error: "Αποτυχία φόρτωσης έργων.",
      detail: error?.message || String(error),
    });
  }
};

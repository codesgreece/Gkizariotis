import { json, setCors } from "../_lib/auth.js";
import { readProjects } from "../_lib/store.js";

export default async function handler(req, res) {
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
    console.error(error);
    return json(res, 500, { error: "Αποτυχία φόρτωσης έργων." });
  }
}

import crypto from "node:crypto";
import path from "node:path";
import {
  CATEGORIES,
  json,
  requireAuth,
  setCors,
} from "../_lib/auth.js";
import { parseMultipart } from "../_lib/multipart.js";
import {
  deleteImageByUrl,
  readProjects,
  uploadImage,
  writeProjects,
} from "../_lib/store.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return json(res, 500, {
      error:
        "Λείπει το BLOB_READ_WRITE_TOKEN στο Vercel. Πρόσθεσέ το από Project Settings → Environment Variables.",
    });
  }

  if (req.method === "POST") {
    if (!requireAuth(req)) {
      return json(res, 401, { error: "Unauthorized" });
    }

    try {
      const { fields, file } = await parseMultipart(req);
      if (!file?.buffer?.length) {
        return json(res, 400, { error: "Απαιτείται φωτογραφία." });
      }
      if (!file.mimeType?.startsWith("image/")) {
        return json(res, 400, { error: "Μόνο αρχεία εικόνας επιτρέπονται." });
      }

      const title = String(fields.title || "").trim();
      const category = String(fields.category || "").trim();
      const description = String(fields.description || "").trim();

      if (!title) return json(res, 400, { error: "Απαιτείται τίτλος." });
      if (!CATEGORIES.includes(category)) {
        return json(res, 400, { error: "Μη έγκυρη κατηγορία." });
      }

      const ext = path.extname(file.filename || "").toLowerCase() || ".jpg";
      const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
        ? ext
        : ".jpg";
      const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${safeExt}`;
      const imageUrl = await uploadImage(filename, file.buffer, file.mimeType);

      const project = {
        id: crypto.randomUUID(),
        title,
        category,
        description,
        image: imageUrl,
        createdAt: Date.now(),
      };

      const projects = await readProjects();
      projects.unshift(project);
      await writeProjects(projects);
      return json(res, 201, project);
    } catch (error) {
      console.error(error);
      return json(res, 400, {
        error: error.message || "Σφάλμα ανεβάσματος.",
      });
    }
  }

  if (req.method === "DELETE") {
    if (!requireAuth(req)) {
      return json(res, 401, { error: "Unauthorized" });
    }

    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const id = url.searchParams.get("id");
      if (!id) return json(res, 400, { error: "Λείπει το id." });

      const projects = await readProjects();
      const index = projects.findIndex((p) => p.id === id);
      if (index === -1) return json(res, 404, { error: "Δεν βρέθηκε." });

      const [removed] = projects.splice(index, 1);
      await writeProjects(projects);
      await deleteImageByUrl(removed?.image);
      return json(res, 200, { ok: true });
    } catch (error) {
      console.error(error);
      return json(res, 500, { error: "Σφάλμα διαγραφής." });
    }
  }

  return json(res, 405, { error: "Method not allowed" });
}

import cors from "cors";
import express from "express";
import multer from "multer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataFile = path.join(rootDir, "data", "projects.json");
const uploadsDir = path.join(rootDir, "public", "uploads");
const distDir = path.join(rootDir, "dist");

const PORT = Number(process.env.PORT || 3001);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gizariotis2026";
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || "gizariotis-admin-secret";

const CATEGORIES = [
  "Κατοικίες",
  "Διαμερίσματα",
  "Επαγγελματικοί χώροι",
  "Ανακαινίσεις",
];

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(path.dirname(dataFile), { recursive: true });
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]", "utf8");
}

function readProjects() {
  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProjects(projects) {
  fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2), "utf8");
}

function createToken() {
  const payload = `${Date.now()}.${crypto.randomBytes(16).toString("hex")}`;
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

function isValidToken(token) {
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

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!isValidToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
      ? ext
      : ".jpg";
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Μόνο αρχεία εικόνας επιτρέπονται."));
      return;
    }
    cb(null, true);
  },
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/projects", (_req, res) => {
  const projects = readProjects().sort(
    (a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0),
  );
  res.json(projects);
});

app.get("/api/categories", (_req, res) => {
  res.json(CATEGORIES);
});

app.post("/api/admin/login", (req, res) => {
  const password = String(req.body?.password || "");
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Λάθος κωδικός πρόσβασης." });
  }
  return res.json({ token: createToken() });
});

app.get("/api/admin/me", requireAuth, (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/admin/projects", requireAuth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Σφάλμα ανεβάσματος." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Απαιτείται φωτογραφία." });
    }

    const title = String(req.body?.title || "").trim();
    const category = String(req.body?.category || "").trim();
    const description = String(req.body?.description || "").trim();

    if (!title) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Απαιτείται τίτλος." });
    }
    if (!CATEGORIES.includes(category)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Μη έγκυρη κατηγορία." });
    }

    const project = {
      id: crypto.randomUUID(),
      title,
      category,
      description,
      image: `/uploads/${req.file.filename}`,
      createdAt: Date.now(),
    };

    const projects = readProjects();
    projects.unshift(project);
    writeProjects(projects);
    return res.status(201).json(project);
  });
});

app.delete("/api/admin/projects", requireAuth, (req, res) => {
  const id = String(req.query.id || "");
  if (!id) {
    return res.status(400).json({ error: "Λείπει το id." });
  }

  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Δεν βρέθηκε." });
  }

  const [removed] = projects.splice(index, 1);
  writeProjects(projects);

  if (removed?.image) {
    const filename = path.basename(removed.image);
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  return res.json({ ok: true });
});

app.delete("/api/admin/projects/:id", requireAuth, (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Δεν βρέθηκε." });
  }

  const [removed] = projects.splice(index, 1);
  writeProjects(projects);

  if (removed?.image) {
    const filename = path.basename(removed.image);
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  return res.json({ ok: true });
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^(?!\/api(?:\/|$)|\/uploads(?:\/|$)).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Gizariotis API/admin server on http://localhost:${PORT}`);
});

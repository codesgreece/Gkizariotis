import { list, put, del } from "@vercel/blob";
import { PROJECTS_BLOB_PATH } from "./auth.js";

async function findProjectsBlob() {
  const result = await list({ prefix: PROJECTS_BLOB_PATH });
  return result.blobs.find((blob) => blob.pathname === PROJECTS_BLOB_PATH) || null;
}

export async function readProjects() {
  const blob = await findProjectsBlob();
  if (!blob) return [];
  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function writeProjects(projects) {
  await put(PROJECTS_BLOB_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function uploadImage(filename, buffer, contentType) {
  const blob = await put(`uploads/${filename}`, buffer, {
    access: "public",
    contentType: contentType || "image/jpeg",
  });
  return blob.url;
}

export async function deleteImageByUrl(url) {
  if (!url) return;
  try {
    await del(url);
  } catch {
    // ignore missing blob
  }
}

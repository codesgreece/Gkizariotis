const { list, put, del } = require("@vercel/blob");
const { PROJECTS_BLOB_PATH } = require("./auth");

function blobToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("Missing BLOB_READ_WRITE_TOKEN");
  }
  return token;
}

async function findProjectsBlob() {
  const result = await list({
    prefix: PROJECTS_BLOB_PATH,
    token: blobToken(),
  });
  return result.blobs.find((blob) => blob.pathname === PROJECTS_BLOB_PATH) || null;
}

async function readProjects() {
  const blob = await findProjectsBlob();
  if (!blob) return [];
  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function writeProjects(projects) {
  await put(PROJECTS_BLOB_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: blobToken(),
    cacheControlMaxAge: 0,
  });
}

async function uploadImage(filename, buffer, contentType) {
  const blob = await put(`uploads/${filename}`, buffer, {
    access: "public",
    contentType: contentType || "image/jpeg",
    token: blobToken(),
  });
  return blob.url;
}

async function deleteImageByUrl(url) {
  if (!url) return;
  try {
    await del(url, { token: blobToken() });
  } catch {
    // ignore missing blob
  }
}

module.exports = {
  readProjects,
  writeProjects,
  uploadImage,
  deleteImageByUrl,
};

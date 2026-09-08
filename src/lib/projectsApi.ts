export type ProjectCategory =
  | "Κατοικίες"
  | "Διαμερίσματα"
  | "Επαγγελματικοί χώροι"
  | "Ανακαινίσεις";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  createdAt: number;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Κατοικίες",
  "Διαμερίσματα",
  "Επαγγελματικοί χώροι",
  "Ανακαινίσεις",
];

const TOKEN_KEY = "gizariotis_admin_token";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Αποτυχία φόρτωσης έργων.");
  return res.json();
}

export async function adminLogin(password: string) {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Αποτυχία σύνδεσης.");
  setAdminToken(data.token);
  return data.token as string;
}

export async function createProject(formData: FormData) {
  const res = await fetch("/api/admin/projects", {
    method: "POST",
    headers: { Authorization: `Bearer ${getAdminToken()}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Αποτυχία αποθήκευσης.");
  return data as Project;
}

export async function deleteProject(id: string) {
  const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getAdminToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Αποτυχία διαγραφής.");
}

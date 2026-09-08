import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  PROJECT_CATEGORIES,
  adminLogin,
  clearAdminToken,
  createProject,
  deleteProject,
  fetchProjects,
  getAdminToken,
  type Project,
  type ProjectCategory,
} from "../lib/projectsApi";

export function AdminPage() {
  const [token, setToken] = useState(getAdminToken());
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Κατοικίες");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects().catch(() => {
      setError("Δεν ήταν δυνατή η σύνδεση με τον server.");
    });
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const nextToken = await adminLogin(password);
      setToken(nextToken);
      setPassword("");
      setSuccess("Συνδεθήκατε επιτυχώς.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Σφάλμα σύνδεσης.");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    clearAdminToken();
    setToken("");
    setSuccess("");
  };

  const onCreate = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!imageFile) {
      setError("Επιλέξτε φωτογραφία.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", imageFile);
      await createProject(formData);
      setTitle("");
      setDescription("");
      setCategory("Κατοικίες");
      setImageFile(null);
      setSuccess("Η φωτογραφία προστέθηκε επιτυχώς.");
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Σφάλμα αποθήκευσης.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Να διαγραφεί αυτό το έργο;")) return;
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await deleteProject(id);
      setSuccess("Διαγράφηκε.");
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Σφάλμα διαγραφής.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Gizariotis Construction</p>
          <h1>Διαχείριση έργων</h1>
          <p className="admin-sub">Ανεβάστε φωτογραφίες για το section «Τα έργα μας».</p>
        </div>
        <div className="admin-header-actions">
          <Link to="/" className="btn btn-outline">
            Προβολή ιστοσελίδας
          </Link>
          {token ? (
            <button type="button" className="btn btn-dark" onClick={onLogout}>
              Αποσύνδεση
            </button>
          ) : null}
        </div>
      </header>

      {error ? <p className="admin-alert admin-alert-error">{error}</p> : null}
      {success ? <p className="admin-alert admin-alert-ok">{success}</p> : null}

      {!token ? (
        <form className="admin-card admin-login" onSubmit={onLogin}>
          <h2>Σύνδεση</h2>
          <p>Μόνο για τον διαχειριστή της ιστοσελίδας.</p>
          <label htmlFor="admin-password">Κωδικός</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Σύνδεση..." : "Είσοδος"}
          </button>
        </form>
      ) : (
        <div className="admin-layout">
          <form className="admin-card" onSubmit={onCreate}>
            <h2>Νέα φωτογραφία</h2>

            <label htmlFor="project-title">Τίτλος</label>
            <input
              id="project-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="π.χ. Ανακαίνιση κατοικίας"
            />

            <label htmlFor="project-category">Κατηγορία</label>
            <select
              id="project-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            >
              {PROJECT_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label htmlFor="project-description">Σύντομη περιγραφή</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Προαιρετικά"
            />

            <label htmlFor="project-image">Φωτογραφία</label>
            <input
              id="project-image"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            {preview ? (
              <img src={preview} alt="Προεπισκόπηση" className="admin-preview" />
            ) : null}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Αποθήκευση..." : "Ανέβασμα φωτογραφίας"}
            </button>
          </form>

          <section className="admin-card">
            <h2>Ανεβασμένα έργα ({projects.length})</h2>
            {projects.length === 0 ? (
              <p className="admin-empty">Δεν υπάρχουν ακόμα φωτογραφίες.</p>
            ) : (
              <ul className="admin-list">
                {projects.map((project) => (
                  <li key={project.id} className="admin-list-item">
                    <img src={project.image} alt={project.title} />
                    <div>
                      <span>{project.category}</span>
                      <strong>{project.title}</strong>
                      {project.description ? <p>{project.description}</p> : null}
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => onDelete(project.id)}
                      disabled={loading}
                    >
                      Διαγραφή
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

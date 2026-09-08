import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../../hooks/useReveal";
import {
  PROJECT_CATEGORIES,
  fetchProjects,
  type Project,
  type ProjectCategory,
} from "../../lib/projectsApi";

type Filter = "Όλα" | ProjectCategory;

const FILTERS: Filter[] = ["Όλα", ...PROJECT_CATEGORIES];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<Filter>("Όλα");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchProjects()
      .then((data) => {
        if (alive) setProjects(data);
      })
      .catch(() => {
        if (alive) setProjects([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const visible = useMemo(
    () =>
      active === "Όλα"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects],
  );

  return (
    <section
      id="projects"
      className="section projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="projects-head">
          <Reveal>
            <span className="section-label">Portfolio</span>
            <h2 id="projects-title" className="section-title">
              Τα έργα μας
            </h2>
            <p className="section-subtitle">
              Κάθε έργο είναι μια νέα πρόκληση.
            </p>
          </Reveal>

          {projects.length > 0 ? (
            <div
              className="project-filters"
              role="tablist"
              aria-label="Κατηγορίες έργων"
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={active === filter}
                  className={`filter-btn${active === filter ? " is-active" : ""}`}
                  onClick={() => setActive(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {loading ? (
          <p className="projects-empty">Φόρτωση έργων...</p>
        ) : visible.length === 0 ? (
          <div className="projects-empty-panel">
            <p className="projects-empty">
              Σύντομα θα προστεθούν φωτογραφίες από τα έργα μας.
            </p>
          </div>
        ) : (
          <div className="projects-gallery">
            {visible.map((project, index) => (
              <Reveal
                key={project.id}
                as="article"
                className="project-card"
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="project-card-overlay">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  {project.description ? <p>{project.description}</p> : null}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

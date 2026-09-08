import { useMemo, useState } from "react";
import { Reveal } from "../../hooks/useReveal";

type Category = "Όλα" | "Κατοικίες" | "Διαμερίσματα" | "Επαγγελματικοί χώροι" | "Ανακαινίσεις";

const FILTERS: Category[] = [
  "Όλα",
  "Κατοικίες",
  "Διαμερίσματα",
  "Επαγγελματικοί χώροι",
  "Ανακαινίσεις",
];

const PROJECTS = [
  {
    title: "Σύγχρονη κατοικία",
    category: "Κατοικίες" as Category,
    description: "Πλήρης αναβάθμιση εσωτερικών χώρων με σύγχρονη αισθητική.",
    image: "/images/project-1.jpg",
  },
  {
    title: "Ανακαίνιση διαμερίσματος",
    category: "Διαμερίσματα" as Category,
    description: "Οργανωμένη ανακαίνιση με έμφαση στη λειτουργικότητα.",
    image: "/images/project-2.jpg",
  },
  {
    title: "Premium interior",
    category: "Ανακαινίσεις" as Category,
    description: "Λεπτομερής ανακαίνιση με υψηλής ποιότητας τελειώματα.",
    image: "/images/project-3.jpg",
  },
  {
    title: "Επαγγελματικός χώρος",
    category: "Επαγγελματικοί χώροι" as Category,
    description: "Σύγχρονος και λειτουργικός χώρος εργασίας.",
    image: "/images/project-4.jpg",
  },
  {
    title: "Ολοκληρωμένη ανακαίνιση",
    category: "Ανακαινίσεις" as Category,
    description: "Από τον σχεδιασμό έως την παράδοση με το κλειδί στο χέρι.",
    image: "/images/project-5.jpg",
  },
  {
    title: "Αναβάθμιση κατοικίας",
    category: "Κατοικίες" as Category,
    description: "Μετατροπή υπάρχοντος χώρου σε σύγχρονη κατοικία.",
    image: "/images/project-6.jpg",
  },
];

export function Projects() {
  const [active, setActive] = useState<Category>("Όλα");

  const visible = useMemo(
    () =>
      active === "Όλα"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === active),
    [active],
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

          <div className="project-filters" role="tablist" aria-label="Κατηγορίες έργων">
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
        </div>

        <div className={`projects-gallery${visible.length >= 5 ? " has-many" : ""}`}>
          {visible.map((project, index) => (
            <Reveal
              key={`${project.title}-${project.category}`}
              as="article"
              className={`project-card${index === 0 ? " featured" : ""}`}
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <img
                src={project.image}
                alt={project.title}
                width={1000}
                height={750}
                loading="lazy"
              />
              <div className="project-card-overlay">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

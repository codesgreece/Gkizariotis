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
  },
  {
    title: "Ανακαίνιση διαμερίσματος",
    category: "Διαμερίσματα" as Category,
    description: "Οργανωμένη ανακαίνιση με έμφαση στη λειτουργικότητα.",
  },
  {
    title: "Premium interior",
    category: "Ανακαινίσεις" as Category,
    description: "Λεπτομερής ανακαίνιση με υψηλής ποιότητας τελειώματα.",
  },
  {
    title: "Επαγγελματικός χώρος",
    category: "Επαγγελματικοί χώροι" as Category,
    description: "Σύγχρονος και λειτουργικός χώρος εργασίας.",
  },
  {
    title: "Ολοκληρωμένη ανακαίνιση",
    category: "Ανακαινίσεις" as Category,
    description: "Από τον σχεδιασμό έως την παράδοση με το κλειδί στο χέρι.",
  },
  {
    title: "Αναβάθμιση κατοικίας",
    category: "Κατοικίες" as Category,
    description: "Μετατροπή υπάρχοντος χώρου σε σύγχρονη κατοικία.",
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

        <div className="projects-list">
          {visible.map((project, index) => (
            <Reveal
              key={`${project.title}-${project.category}`}
              as="article"
              className="project-item"
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

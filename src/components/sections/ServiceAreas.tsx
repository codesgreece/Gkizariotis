import { Reveal } from "../../hooks/useReveal";

const AREAS = [
  { name: "ΚΟΡΙΝΘΙΑ", note: "Περιοχή εξυπηρέτησης" },
  { name: "ΑΤΤΙΚΗ", note: "Περιοχή εξυπηρέτησης" },
  { name: "ΑΡΓΟΛΙΔΑ", note: "Περιοχή εξυπηρέτησης" },
  { name: "ΑΡΚΑΔΙΑ", note: "Περιοχή εξυπηρέτησης" },
  { name: "ΜΑΓΝΗΣΙΑ", note: "Περιοχή εξυπηρέτησης" },
];

export function ServiceAreas() {
  return (
    <section id="areas" className="section areas" aria-labelledby="areas-title">
      <div className="container">
        <Reveal>
          <span className="section-label">Κάλυψη</span>
          <h2 id="areas-title" className="section-title">
            Περιοχές εξυπηρέτησης
          </h2>
          <p className="areas-lead">
            Αναλαμβάνουμε έργα σε επιλεγμένες περιοχές της Ελλάδας, προσφέροντας
            ολοκληρωμένες{" "}
            <a href="#services" className="text-link">
              λύσεις ανακαίνισης και κατασκευής
            </a>
            . Για να ξεκινήσετε, δείτε πώς{" "}
            <a href="#contact" className="text-link">
              επικοινωνείτε μαζί μας
            </a>
            .
          </p>
        </Reveal>

        <div className="areas-grid">
          {AREAS.map((area, index) => (
            <Reveal
              key={area.name}
              className="area-card"
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <h3>{area.name}</h3>
              <span>{area.note}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

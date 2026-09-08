import { Reveal } from "../../hooks/useReveal";

const STEPS = [
  "Συζήτηση & Καταγραφή αναγκών",
  "Σχεδιασμός & Προγραμματισμός",
  "Εκτέλεση εργασιών",
  "Έλεγχος & Ολοκλήρωση",
  "Παράδοση έργου",
];

export function KeyInHand() {
  return (
    <section className="section key-in-hand" aria-labelledby="kih-title">
      <div className="container">
        <Reveal>
          <span className="section-label">Κλειδί στο χέρι</span>
          <h2 id="kih-title" className="section-title">
            Από την πρώτη ιδέα μέχρι το κλειδί στην πόρτα.
          </h2>
          <div className="key-in-hand-copy">
            <p>
              Δεν χρειάζεται να συντονίζετε διαφορετικά συνεργεία και
              επαγγελματίες.
            </p>
            <p>
              Αναλαμβάνουμε το έργο συνολικά, με στόχο μια οργανωμένη διαδικασία
              και ένα ολοκληρωμένο αποτέλεσμα.
            </p>
          </div>
        </Reveal>

        <div className="process-visual">
          {STEPS.map((step, i) => (
            <Reveal
              key={step}
              className="process-step"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <span className="process-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

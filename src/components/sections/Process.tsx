import { useEffect, useRef } from "react";
import { Reveal } from "../../hooks/useReveal";

const STEPS = [
  {
    title: "Επικοινωνία",
    text: "Ξεκινάμε με μια πρώτη συζήτηση για τις ανάγκες και τους στόχους του έργου σας.",
  },
  {
    title: "Αυτοψία / Συζήτηση αναγκών",
    text: "Καταγράφουμε τις απαιτήσεις του χώρου και ορίζουμε μαζί τις προτεραιότητες.",
  },
  {
    title: "Πρόταση & προγραμματισμός",
    text: "Παρουσιάζουμε οργανωμένη πρόταση και χρονοδιάγραμμα εργασιών.",
  },
  {
    title: "Έναρξη εργασιών",
    text: "Εκτελούμε τις εργασίες με συνέπεια, συντονισμό και προσοχή στη λεπτομέρεια.",
  },
  {
    title: "Παράδοση",
    text: "Ολοκληρώνουμε το έργο και σας παραδίδουμε έναν έτοιμο, αναβαθμισμένο χώρο.",
  },
];

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="container">
        <Reveal>
          <span className="section-label">Διαδικασία</span>
          <h2 id="process-title" className="section-title">
            Πώς δουλεύουμε
          </h2>
        </Reveal>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line" aria-hidden="true">
            <span className="timeline-line-progress" />
          </div>
          {STEPS.map((step, index) => (
            <Reveal
              key={step.title}
              className="timeline-item"
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <div className="timeline-dot">{String(index + 1).padStart(2, "0")}</div>
              <div className="timeline-content">
                <h3>
                  Βήμα {String(index + 1).padStart(2, "0")}: {step.title}
                </h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "../../hooks/useReveal";

export function Intro() {
  return (
    <section id="about" className="section intro" aria-labelledby="intro-title">
      <div className="container">
        <div className="intro-grid">
          <Reveal className="intro-copy">
            <span className="section-label">Σχετικά με εμάς</span>
            <h2 id="intro-title" className="section-title">
              Ο χώρος σας, η δική μας δουλειά.
            </h2>
            <p>
              Με 6 χρόνια εμπειρίας στον χώρο των κατασκευών και των
              ανακαινίσεων, αναλαμβάνουμε ολοκληρωμένα έργα για κατοικίες,
              διαμερίσματα και επαγγελματικούς χώρους.
            </p>
            <p>
              Από την πρώτη ιδέα και τον σχεδιασμό μέχρι την ολοκλήρωση του
              έργου, στόχος μας είναι να προσφέρουμε μια οργανωμένη και
              αξιόπιστη διαδικασία, με προσοχή στη λεπτομέρεια και έμφαση στο
              τελικό αποτέλεσμα.
            </p>
            <div className="intro-stat">
              <span className="intro-stat-number">06+</span>
              <span className="intro-stat-label">Χρόνια εμπειρίας</span>
            </div>
          </Reveal>

          <Reveal className="intro-media" delay={2}>
            <img
              src="/images/about.jpg"
              alt="Εργασίες ανακαίνισης και κατασκευής εσωτερικού χώρου"
              width={1200}
              height={816}
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

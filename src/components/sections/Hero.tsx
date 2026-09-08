function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="hero" aria-label="Αρχική">
      <div className="hero-media">
        <img
          src="/images/hero.jpg"
          alt="Μοντέρνο ανακαινισμένο εσωτερικό κατοικίας"
          width={1920}
          height={1280}
          fetchPriority="high"
        />
        <div className="hero-overlay" aria-hidden="true" />
      </div>

      <div className="hero-content">
        <p className="hero-brand">Gizariotis Construction</p>
        <h1>
          Ανακαινίζουμε τον χώρο σας.
          <br />
          Δημιουργούμε κάτι καλύτερο.
        </h1>
        <p className="hero-lead">
          Ανακαινίσεις κατοικιών, διαμερισμάτων και επαγγελματικών χώρων με
          ολοκληρωμένες λύσεις και το κλειδί στο χέρι.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Ζητήστε Προσφορά
          </a>
          <a href="#services" className="btn btn-secondary">
            Δείτε τις Υπηρεσίες
          </a>
        </div>

        <ul className="hero-perks">
          <li className="hero-perk">
            <CheckIcon />6 χρόνια εμπειρίας
          </li>
          <li className="hero-perk">
            <CheckIcon />
            Ολοκληρωμένες λύσεις
          </li>
          <li className="hero-perk">
            <CheckIcon />
            Εξυπηρέτηση σε 5 περιοχές
          </li>
        </ul>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-indicator-line" />
      </div>
    </section>
  );
}

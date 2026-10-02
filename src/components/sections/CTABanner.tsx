import { Reveal } from "../../hooks/useReveal";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CTABanner() {
  return (
    <section className="cta-banner" aria-labelledby="cta-title">
      <div className="container">
        <Reveal>
          <h2 id="cta-title">Έχετε έναν χώρο που χρειάζεται αλλαγή;</h2>
          <p>Ας συζητήσουμε την επόμενη ανακαίνισή σας.</p>
          <div className="cta-banner-actions">
            <a href="#contact" className="btn btn-primary">
              Επικοινωνήστε Μαζί Μας
            </a>
            <a href="tel:6948033201" className="cta-phone">
              <PhoneIcon />
              694 803 3201
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

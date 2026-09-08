import { useState, type FormEvent } from "react";
import { Reveal } from "../../hooks/useReveal";

const PROJECT_TYPES = [
  "Ανακαίνιση κατοικίας",
  "Ανακαίνιση διαμερίσματος",
  "Επαγγελματικός χώρος",
  "Ανακαίνιση με το κλειδί στο χέρι",
  "Άλλο",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <Reveal>
          <span className="section-label">Επικοινωνία</span>
          <h2 id="contact-title" className="section-title">
            Ξεκινήστε το έργο σας σήμερα.
          </h2>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Ονοματεπώνυμο</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Το ονοματεπώνυμό σας"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Τηλέφωνο</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="π.χ. 69xxxxxxxx"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="area">Περιοχή</label>
                  <input
                    id="area"
                    name="area"
                    type="text"
                    required
                    placeholder="π.χ. Κορινθία"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="projectType">Τύπος έργου</label>
                <select id="projectType" name="projectType" required defaultValue="">
                  <option value="" disabled>
                    Επιλέξτε τύπο έργου
                  </option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message">Μήνυμα</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Περιγράψτε σύντομα το έργο σας"
                />
              </div>

              {submitted && (
                <p className="form-success" role="status">
                  Ευχαριστούμε για το ενδιαφέρον σας. Θα επικοινωνήσουμε μαζί σας
                  σύντομα.
                </p>
              )}

              <button type="submit" className="btn btn-primary">
                Αποστολή Ενδιαφέροντος
              </button>
            </form>
          </Reveal>

          <Reveal className="contact-info" delay={2}>
            <p className="contact-info-brand">GIZARIOTIS CONSTRUCTION</p>
            <a href="tel:6948033201" className="contact-info-phone">
              694 803 3201
            </a>
            <div className="contact-info-areas">
              <h3>Περιοχές</h3>
              <p>Κορινθία • Αττική • Αργολίδα • Αρκαδία • Μαγνησία</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

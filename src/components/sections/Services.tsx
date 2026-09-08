import { Reveal } from "../../hooks/useReveal";

const SERVICES = [
  {
    title: "Ανακαινίσεις Κατοικιών",
    description:
      "Πλήρεις ανακαινίσεις κατοικιών με οργανωμένο σχεδιασμό και ολοκληρωμένη εκτέλεση.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Ανακαινίσεις Διαμερισμάτων",
    description:
      "Ανανεώνουμε και αναβαθμίζουμε διαμερίσματα, από μικρές παρεμβάσεις έως πλήρεις ανακαινίσεις.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M4 21h16M8 8h4M8 12h4M8 16h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Επαγγελματικοί Χώροι",
    description:
      "Λειτουργικοί και σύγχρονοι επαγγελματικοί χώροι σχεδιασμένοι σύμφωνα με τις ανάγκες της επιχείρησης.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Ανακαινίσεις με το Κλειδί στο Χέρι",
    description:
      "Αναλαμβάνουμε το έργο συνολικά ώστε ο πελάτης να έχει μία ολοκληρωμένη λύση από την αρχή μέχρι την παράδοση.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="8" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M11 12.5 20 21M16.5 16.5l2 2M18.5 14.5l2 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Ολοκληρωμένες Τεχνικές Εργασίες",
    description:
      "Συντονισμός και εκτέλεση των απαραίτητων εργασιών για ένα ολοκληρωμένο αποτέλεσμα.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Αναβάθμιση Χώρων",
    description:
      "Μετατρέπουμε παλιούς ή μη λειτουργικούς χώρους σε σύγχρονους, πρακτικούς και αισθητικά αναβαθμισμένους χώρους.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 20h16M7 20V10l5-4 5 4v10M10 14h4v6h-4v-6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="section services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <Reveal className="services-head">
          <span className="section-label">Υπηρεσίες</span>
          <h2 id="services-title" className="section-title">
            Οι υπηρεσίες μας
          </h2>
          <p className="section-subtitle">
            Όλα όσα χρειάζεστε για έναν ολοκληρωμένο χώρο.
          </p>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              as="article"
              className="service-card"
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "../../hooks/useReveal";

const REASONS = [
  {
    num: "01",
    title: "6 Χρόνια Εμπειρίας",
    text: "Σταθερή παρουσία στον χώρο των ανακαινίσεων και των κατασκευών, με έργα που ολοκληρώνονται με συνέπεια.",
  },
  {
    num: "02",
    title: "Ολοκληρωμένες Λύσεις",
    text: "Από τον σχεδιασμό έως την παράδοση, αναλαμβάνουμε το σύνολο του έργου ώστε να έχετε έναν υπεύθυνο συνεργάτη.",
  },
  {
    num: "03",
    title: "Προσοχή στη Λεπτομέρεια",
    text: "Κάθε στάδιο εκτελείται με φροντίδα, ώστε το τελικό αποτέλεσμα να είναι λειτουργικό και αισθητικά άρτιο.",
  },
  {
    num: "04",
    title: "Συνέπεια & Επαγγελματισμός",
    text: "Σαφής επικοινωνία, οργανωμένη διαδικασία και σεβασμός στους χρόνους και στις ανάγκες του πελάτη.",
  },
];

export function WhyUs() {
  return (
    <section className="section why-us" aria-labelledby="why-title">
      <div className="container">
        <Reveal>
          <span className="section-label">Πλεονεκτήματα</span>
          <h2 id="why-title" className="section-title">
            Γιατί GIZARIOTIS CONSTRUCTION
          </h2>
        </Reveal>

        <div className="why-grid">
          {REASONS.map((item, index) => (
            <Reveal
              key={item.num}
              className="why-item"
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

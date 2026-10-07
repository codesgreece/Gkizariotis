import { Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { SITE_NAME, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "../lib/site";

const HELPFUL_LINKS = [
  { to: "/", hash: "#services", label: "Υπηρεσίες ανακαίνισης" },
  { to: "/", hash: "#projects", label: "Έργα μας" },
  { to: "/", hash: "#areas", label: "Περιοχές εξυπηρέτησης" },
  { to: "/", hash: "#contact", label: "Επικοινωνία & προσφορά" },
] as const;

export function NotFoundPage() {
  return (
    <>
      <SeoHead
        title={`Η σελίδα δεν βρέθηκε | ${SITE_NAME}`}
        description="Η σελίδα που ζητήσατε δεν υπάρχει. Επιστρέψτε στην αρχική ή δείτε τις υπηρεσίες ανακαίνισης της Gizariotis Construction."
        path="/404"
        robots="noindex, follow"
        noCanonical
      />

      <main className="not-found-page">
        <div className="container not-found-inner">
          <p className="not-found-code">404</p>
          <h1>Η σελίδα δεν βρέθηκε</h1>
          <p className="not-found-lead">
            Η διεύθυνση που πληκτρολογήσατε δεν αντιστοιχεί σε υπάρχουσα σελίδα.
            Μπορείτε να επιστρέψετε στην αρχική ή να επιλέξετε μία από τις
            παρακάτω ενότητες.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              Επιστροφή στην αρχική
            </Link>
            <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
              Καλέστε στο {SITE_PHONE_DISPLAY}
            </a>
          </div>

          <nav className="not-found-nav" aria-label="Χρήσιμοι σύνδεσμοι">
            <h2>Χρήσιμοι σύνδεσμοι</h2>
            <ul>
              {HELPFUL_LINKS.map((link) => (
                <li key={link.hash}>
                  <Link to={{ pathname: link.to, hash: link.hash }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}

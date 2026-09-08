const FOOTER_LINKS = [
  { href: "#home", label: "Αρχική" },
  { href: "#services", label: "Υπηρεσίες" },
  { href: "#projects", label: "Έργα" },
  { href: "#about", label: "Σχετικά" },
  { href: "#areas", label: "Περιοχές" },
  { href: "#contact", label: "Επικοινωνία" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="logo footer-logo">
              <img
                src="/logo-mark-light.svg"
                alt=""
                className="logo-mark"
                width={44}
                height={44}
              />
              <span className="logo-text">
                <span className="logo-name">GIZARIOTIS</span>
                <span className="logo-tag">CONSTRUCTION</span>
              </span>
            </a>
            <p>Ανακαινίσεις &amp; κατασκευές με ολοκληρωμένες λύσεις.</p>
          </div>

          <div>
            <h2 className="footer-title">Πλοήγηση</h2>
            <ul className="footer-links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-title">Επικοινωνία</h2>
            <a href="tel:6948033201" className="footer-phone">
              694 803 3201
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 GIZARIOTIS CONSTRUCTION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

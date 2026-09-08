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
        <div className="footer-top">
          <a href="#home" className="logo footer-logo">
            <img
              src="/logo-mark-light.svg"
              alt=""
              className="logo-mark"
              width={32}
              height={32}
            />
            <span className="logo-text">
              <span className="logo-name">GIZARIOTIS</span>
              <span className="logo-tag">CONSTRUCTION</span>
            </span>
          </a>

          <nav className="footer-nav" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="tel:6948033201" className="footer-phone">
            694 803 3201
          </a>
        </div>

        <div className="footer-bottom">
          <p>Ανακαινίσεις &amp; κατασκευές με ολοκληρωμένες λύσεις.</p>
          <p>© 2026 GIZARIOTIS CONSTRUCTION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

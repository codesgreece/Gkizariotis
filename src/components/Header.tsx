import { useEffect, useState, type MouseEvent } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Αρχική" },
  { href: "#services", label: "Υπηρεσίες" },
  { href: "#projects", label: "Έργα" },
  { href: "#about", label: "Σχετικά με εμάς" },
  { href: "#areas", label: "Περιοχές" },
  { href: "#contact", label: "Επικοινωνία" },
];

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

function BrandLogo() {
  return (
    <>
      <img
        src="/logo-mark.svg"
        alt=""
        className="logo-mark"
        width={44}
        height={44}
      />
      <span className="logo-text">
        <span className="logo-name">GIZARIOTIS</span>
        <span className="logo-tag">CONSTRUCTION</span>
      </span>
    </>
  );
}

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-mobile-nav", menuOpen);
    return () => document.body.classList.remove("has-mobile-nav");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    closeMenu();
    scrollToHash(href);
    history.replaceState(null, "", href);
  };

  return (
    <header
      className={`site-header is-transparent${scrolled ? " is-scrolled" : ""}${
        menuOpen ? " is-open" : ""
      }`}
    >
      <div className="header-inner">
        <a
          href="#home"
          className="logo"
          aria-label="Gizariotis Construction"
          onClick={(e) => onNavClick(e, "#home")}
        >
          <BrandLogo />
        </a>

        <nav className="nav-desktop" aria-label="Κύρια πλοήγηση">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href="#contact"
            className="btn btn-primary header-cta"
            onClick={(e) => onNavClick(e, "#contact")}
          >
            Ζητήστε Προσφορά
          </a>
          <a
            href="tel:6948033201"
            className="header-call"
            aria-label="Καλέστε στο 694 803 3201"
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? " is-active" : ""}`}
            aria-label={menuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        className={`nav-mobile${menuOpen ? " is-open" : ""}`}
        aria-label="Κινητή πλοήγηση"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={(e) => onNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn-primary"
          onClick={(e) => onNavClick(e, "#contact")}
        >
          Ζητήστε Προσφορά
        </a>
        <a href="tel:6948033201" className="btn btn-outline" onClick={closeMenu}>
          694 803 3201
        </a>
      </nav>
    </header>
  );
}

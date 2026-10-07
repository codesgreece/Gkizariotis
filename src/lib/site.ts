/** Canonical production origin — always use www + HTTPS. */
export const SITE_ORIGIN = "https://www.gizariotis.gr";

export const SITE_NAME = "Gizariotis Construction";

export const SITE_PHONE_DISPLAY = "694 803 3201";
export const SITE_PHONE_TEL = "6948033201";
export const SITE_PHONE_E164 = "+306948033201";

export const DEFAULT_TITLE =
  "Ανακαινίσεις Κατοικιών & Διαμερισμάτων | Gizariotis Construction";

export const DEFAULT_DESCRIPTION =
  "Ανακαινίσεις κατοικιών, διαμερισμάτων και επαγγελματικών χώρων με ολοκληρωμένες λύσεις και το κλειδί στο χέρι. Κορινθία, Αττική, Αργολίδα, Αρκαδία, Μαγνησία.";

export const OG_IMAGE_PATH = "/images/og-image.jpg";

export const SERVICE_AREAS = [
  "Κορινθία",
  "Αττική",
  "Αργολίδα",
  "Αρκαδία",
  "Μαγνησία",
] as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

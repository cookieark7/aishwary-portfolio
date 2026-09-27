/**
 * Room 03 — Experience. Roles and education, newest first.
 * `kind` picks the marker: filled for work, hollow for study. A period ending
 * in "Present" gets the accent ring.
 */
export type Stop = {
  period: string;
  role: string;
  org: string;
  /** Optional one-liner: what you owned, or something you shipped. */
  note?: string;
  kind?: "work" | "study";
};

export const experience: Stop[] = [
  {
    period: "2024 — Present",
    role: "Software Engineer",
    org: "Xpressbees",
    note: "JWT and Keycloak RBAC across a 1,000+ endpoint surface that had none, an AES-256-GCM encryption layer for customer addresses and phone numbers, and a Redis cache over 180+ endpoints that degrades open when Redis goes down.",
    kind: "work",
  },
  { period: "2023 — 2024", role: "Junior Software Engineer", org: "Xpressbees", kind: "work" },
  { period: "2022 — 2023", role: "Graduate Trainee", org: "Xpressbees", kind: "work" },
  {
    period: "2022",
    role: "B.Tech, Computer Science",
    org: "Indira College of Engineering & Management",
    kind: "study",
  },
];

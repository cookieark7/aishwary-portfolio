/**
 * Room 03 — The Corridor. Roles and education, newest first.
 * `kind` picks the marker: filled for work, hollow for study.
 *
 * ─── PLACEHOLDER ────────────────────────────────────────────────────────────
 * Dates are shaped to match "four years in", but the employers, titles and
 * notes below are invented scaffolding — replace every one of them before this
 * site goes live.
 */
export type Stop = {
  period: string;
  role: string;
  org: string;
  note: string;
  kind?: "work" | "study";
};

export const experience: Stop[] = [
  {
    period: "2024 — Present",
    role: "Fullstack Developer",
    org: "Company Name",
    note: "What you own, the stack, and one thing you shipped that mattered.",
    kind: "work",
  },
  {
    period: "2022 — 2024",
    role: "Software Engineer",
    org: "Previous Company",
    note: "Scope, team size, or a shipped highlight.",
    kind: "work",
  },
  {
    period: "2022",
    role: "Your degree",
    org: "University Name",
    note: "Honours, thesis, or relevant coursework.",
    kind: "study",
  },
];

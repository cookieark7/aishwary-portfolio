/**
 * Room 05 — Open Source.
 *
 * The first entry renders as the featured card; anything after it falls into
 * the grid below. One well-told contribution beats a padded list.
 */
export type Contribution = {
  repo: string;
  status: "Merged" | "Open" | "Maintainer";
  /** The PR title, shown verbatim. */
  title: string;
  /** Featured card only: what actually went wrong, in plain language. */
  summary?: string;
  diff: string;
  kind: string;
  href: string;
  /** Optional context that gives the contribution weight. */
  stars?: string;
  date?: string;
};

export const contributions: Contribution[] = [
  {
    repo: "SQLMesh/sqlmesh",
    status: "Merged",
    title: "fix(clickhouse): register table comments via command instead of inline CTAS",
    summary:
      "ClickHouse Cloud rejected every table comment SQLMesh generated. The adapter declared how to comment views but never tables, so it fell back to embedding COMMENT inside CREATE TABLE ... AS SELECT — which ClickHouse won't parse. Pointing it at the existing ALTER TABLE path fixed it. One missing flag, two lines.",
    diff: "+2 / −0",
    kind: "bugfix",
    href: "https://github.com/SQLMesh/sqlmesh/pull/6007",
    stars: "3.3k ★",
    date: "Merged Sep 2026",
  },
  {
    repo: "SQLMesh/sqlmesh",
    status: "Merged",
    title: "fix(tests): prevent schema collisions between integration test params",
    diff: "+10 / −2",
    kind: "tests",
    href: "https://github.com/SQLMesh/sqlmesh/pull/6072",
    date: "Merged Sep 2026",
  },
];

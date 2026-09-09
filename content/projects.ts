/**
 * Room 01 — The Workshop.
 *
 * Exactly one project should be `featured: true` — it renders full width above
 * the grid. Blurbs are condensed from each repo's own README; rewrite them in
 * your voice whenever you like.
 */
export type Project = {
  name: string;
  year: string;
  blurb: string;
  tags: string[];
  /** Drop a screenshot in public/images/ and set e.g. "/images/devvault.png". */
  image?: string;
  repo?: string;
  live?: string;
  /** Full-width lead card. Keep this to a single project. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "DevVault",
    year: "2026",
    featured: true,
    blurb:
      "A personal knowledge vault for snippets, bookmarks, commands and prompts. Express 5 and Prisma over Postgres, JWT and API-key auth, and semantic search running on local Ollama embeddings — with a Next.js dashboard, a Chrome extension that OCRs whatever you snip without the image leaving your machine, and an MCP server that hands Claude Code structured access to the database.",
    tags: ["TypeScript", "Express", "Postgres", "Prisma", "Ollama", "MCP"],
    repo: "https://github.com/cookieark7/devvault-backend",
    live: "https://devvault.arkexperiment.xyz/",
  },
  {
    name: "DevVault CLI",
    year: "2026",
    blurb:
      "Save a command, snippet or bookmark to the vault without leaving the terminal. Pulls candidates straight out of shell history and hooks in to track things as you work.",
    tags: ["Node", "CLI"],
    repo: "https://github.com/cookieark7/devvault-cli",
  },
  {
    name: "C++ HTTP Server",
    year: "2026",
    // TODO: confirm — the kanban board and this server were created the same
    // day and you gave the kanban URL as this project's live link, so it's
    // written up as the demo client. Correct me if that's wrong.
    blurb:
      "An HTTP server written from scratch in C++ — sockets, request parsing and routing done by hand rather than pulled from a framework. A React kanban board rides on top of it as the demo client.",
    tags: ["C++", "Sockets", "Docker"],
    repo: "https://github.com/cookieark7/cpp_http_server",
    live: "https://kanban.arkexperiment.xyz/",
  },
  {
    name: "Jig-Scape",
    year: "2025",
    blurb:
      "Infinite jigsaw puzzles built from images generated locally on Apple Silicon — no API keys, no cloud bill. Canvas slices each image into pieces with randomised tabs and magnetic-snap validation, behind a FastAPI service.",
    tags: ["React", "FastAPI", "Stable Diffusion", "Canvas"],
    repo: "https://github.com/cookieark7/Jig-Scape",
  },

  // ─── Python SDK ───────────────────────────────────────────────────────────
  // No public repo under github.com/cookieark7 matches this, so there was
  // nothing to describe truthfully. Fill in the blurb and repo, uncomment, and
  // it slots straight into the grid.
  //
  // {
  //   name: "Python SDK",
  //   year: "2026",
  //   blurb: "What it wraps, who it's for, and why you built it.",
  //   tags: ["Python"],
  //   repo: "https://github.com/cookieark7/...",
  // },
];

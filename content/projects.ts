/**
 * Room 01 — Projects. Every project renders at the same size.
 *
 * Wrap a phrase in **double asterisks** to highlight it. Keep blurbs to about
 * two sentences (~35 words) so the cards stay evenly weighted, and two or three
 * highlights each so they still mean something.
 */
export type Project = {
  name: string;
  year: string;
  blurb: string;
  tags: string[];
  /** Generated placeholders live in public/images/ — swap in real screenshots. */
  image?: string;
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "DevVault",
    year: "2026",
    blurb:
      "A personal knowledge vault for snippets, commands and prompts, found through **semantic search on local Ollama embeddings**. Express 5 and Prisma over Postgres, a Next.js dashboard, a Chrome extension with **on-device OCR**, and an **MCP server** for Claude Code.",
    tags: ["TypeScript", "Express", "Postgres", "Ollama", "MCP"],
    image: "/images/devvault.png",
    repo: "https://github.com/cookieark7/devvault-backend",
    live: "https://devvault.arkexperiment.xyz/",
  },
  {
    name: "DevVault CLI",
    year: "2026",
    blurb:
      "Save a command, snippet or bookmark to DevVault **without leaving the terminal**, and search it from there too. It pulls candidates straight out of **shell history**, and a shell hook adds **automatic tracking** as you work.",
    tags: ["Node", "CLI", "Shell"],
    image: "/images/devvault-cli.png",
    repo: "https://github.com/cookieark7/devvault-cli",
  },
  {
    name: "Kite Auth SDK",
    year: "2026",
    blurb:
      "An async Python SDK for Zerodha Kite Connect that owns the **whole token lifecycle** — pluggable login, token exchange, persistence and automatic re-auth. On top: **WebSocket tick streaming**, retries, a circuit breaker and rate limiting, behind a **90% coverage gate**.",
    tags: ["Python", "asyncio", "httpx", "WebSockets", "Playwright"],
    image: "/images/kite-auth-sdk.png",
    repo: "https://github.com/cookieark7/kite-auth-sdk",
  },
  {
    name: "C++ HTTP Server",
    year: "2026",
    blurb:
      "An HTTP server **built on raw sockets in C++**, no framework, persisting to **PostgreSQL** and running behind **nginx with TLS** in Docker Compose. A React kanban board rides on top of it as the live demo.",
    tags: ["C++", "Sockets", "PostgreSQL", "nginx", "Docker"],
    image: "/images/cpp-http-server.png",
    repo: "https://github.com/cookieark7/cpp_http_server",
    live: "https://kanban.arkexperiment.xyz/",
  },
  {
    name: "Jig-Scape",
    year: "2025",
    blurb:
      "Infinite jigsaw puzzles from images generated **locally on Apple Silicon** with Stable Diffusion — no API keys, no cloud bill. Canvas **slices each image procedurally**, with randomised tabs and **magnetic-snap placement**, behind a FastAPI service.",
    tags: ["React", "FastAPI", "Stable Diffusion", "Canvas"],
    image: "/images/jig-scape.png",
    repo: "https://github.com/cookieark7/Jig-Scape",
  },
];

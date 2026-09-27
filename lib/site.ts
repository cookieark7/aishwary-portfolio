/**
 * Everything about you that isn't a project, a post, or a job.
 * Editing this one file updates the whole site.
 */
export const site = {
  name: "Aishwary Kantode",
  role: "Fullstack Developer",

  /** The live site. Used for OG tags and canonical URLs. */
  url: "https://portfolio.arkexperiment.xyz",

  /** Shown in the hero, under the headline. */
  intro:
    "Fullstack developer, four years in. I write the backend, draw the frontend, and argue with both. Six rooms ahead — work, tools, the road here, writing, open source, and the way out.",

  /** Overrides the hero headline. Keep it short; it animates word by word. */
  headline: "Come in. Mind the sketches.",

  email: "aishwary.kantode2@gmail.com",

  /**
   * Served from public/resume.pdf. The file carries a phone number, so it goes
   * out with `X-Robots-Tag: noindex` (see next.config.ts) — reachable from the
   * Contact button, but kept out of search results.
   * Back to null and the Contact section promotes email instead.
   */
  resumeUrl: "/resume.pdf" as string | null,

  /** Anything left null is simply not rendered. */
  socials: {
    github: "https://github.com/cookieark7",
    linkedin: "https://www.linkedin.com/in/aishwary-kantode-72159417b/" as string | null,
    x: null as string | null,
  },

  /** Hero portrait: a square crop, served from public/images/. */
  portrait: "/images/portrait.jpg" as string | null,
};

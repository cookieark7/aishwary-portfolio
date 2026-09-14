/**
 * Everything about you that isn't a project, a post, or a job.
 * Editing this one file updates the whole site.
 */
export const site = {
  name: "Aishwary Kantode",
  role: "Fullstack Developer",

  /** ← TODO: your real domain. Used for OG tags and canonical URLs. */
  url: "https://aishwarykantode.com",

  /** Shown in the hero, under the headline. */
  intro:
    "Fullstack developer, four years in. I write the backend, draw the frontend, and argue with both. Six rooms ahead — work, tools, the road here, writing, open source, and the way out.",

  /** Overrides the hero headline. Keep it short; it animates word by word. */
  headline: "Come in. Mind the sketches.",

  email: "aishwary.kantode2@gmail.com",

  /**
   * Set to a path once the PDF exists (drop it at public/resume.pdf).
   * While this is null the Doorway promotes email to the primary action
   * instead of showing a button that 404s.
   */
  resumeUrl: null as string | null,

  /** Anything left null is simply not rendered. */
  socials: {
    github: "https://github.com/cookieark7",
    linkedin: "https://www.linkedin.com/in/aishwary-kantode-72159417b/" as string | null,
    x: null as string | null,
  },

  /** Hero portrait: a square crop, served from public/images/. */
  portrait: "/images/portrait.jpg" as string | null,
};

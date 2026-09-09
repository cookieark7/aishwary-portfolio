/**
 * Room 04 — The Reading Room. Links out to Medium.
 * Read times are from word count; adjust if you disagree with them.
 */
export type Post = {
  date: string;
  title: string;
  hook: string;
  read: string;
  href: string;
  /** Shown as the source chip, e.g. "Medium", "Hashnode", "dev.to". */
  source: string;
};

export const posts: Post[] = [
  {
    date: "Jul 2026",
    title: "Your TOTP code isn’t expiring. It’s in the wrong window.",
    hook: "Not a walkthrough of how OTP works — a look at the core implementation, and where the continuity of time quietly breaks.",
    read: "11 min",
    href: "https://medium.com/@aishwarykantode2/your-totp-code-isnt-expiring-it-s-in-the-wrong-window-2fb4f7ef9951",
    source: "Medium",
  },
  {
    date: "Mar 2026",
    title: "Dockerizing a C++ Application (with Multi-Stage Builds)",
    hook: "C++ asks for far more setup than Node or FastAPI ever did. Multi-stage builds keep every bit of it out of the shipped image.",
    read: "4 min",
    href: "https://medium.com/@aishwarykantode2/dockerizing-a-c-application-with-multi-stage-builds-f32152a8a5af",
    source: "Medium",
  },
];

/** Your profile link, shown under the list. Null hides it. */
export const archiveUrl: string | null = "https://medium.com/@aishwarykantode2";

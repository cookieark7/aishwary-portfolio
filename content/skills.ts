/** Room 02 — Skills. */
export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "SASS",
      "Redux Toolkit",
      "TanStack",
      "MUI",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Python", "FastAPI", "Pydantic", "Prisma", "SQL", "PostgreSQL", "Redis"],
  },
  {
    title: "Auth & Security",
    items: ["Keycloak", "OAuth2 / OIDC", "JWT (RS256)", "RBAC", "AES-256-GCM"],
  },
  {
    title: "Infra & Tools",
    items: ["Docker", "AWS (EC2, S3)", "Redshift", "nginx", "Git", "CI/CD", "Vitest"],
  },
];

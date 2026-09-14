/** Room 02 — Skills. */
export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { title: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion"] },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Python", "FastAPI", "Pydantic", "PostgreSQL", "Redis"],
  },
  { title: "Infra & Tools", items: ["Docker", "AWS", "S3", "Git", "CI/CD", "Vitest"] },
];

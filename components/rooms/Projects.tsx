import { Emphasis } from "../Emphasis";
import { Frame } from "../Frame";
import { Rise } from "../Rise";
import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { TrackedLink } from "../TrackedLink";
import { WordReveal } from "../WordReveal";
import { projects, type Project } from "@/content/projects";

/**
 * Every card takes the same cell. On the 4-column (md) and 6-column (xl) tracks
 * each spans two, so a short final row can be nudged in by one column and sit
 * centred instead of hugging the left edge.
 */
function centreLastRow(i: number, n: number) {
  const classes: string[] = [];
  if (n % 2 === 1 && i === n - 1) classes.push("md:col-start-2");
  if (n % 3 === 1 && i === n - 1) classes.push("xl:col-start-3");
  else if (n % 3 === 2 && i === n - 2) classes.push("xl:col-start-2");
  else if (classes.length > 0) classes.push("xl:col-start-auto");
  return classes.join(" ");
}

function Card({ project }: { project: Project }) {
  return (
    <div className="bg-card border-ink/14 hover:border-accent/45 flex h-full flex-col rounded-[5px] border-[1.5px] p-[18px] transition-[translate,rotate,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-2 hover:-rotate-[0.4deg] hover:shadow-[0_22px_38px_oklch(22%_0.02_260_/_0.17)]">
      <div className="relative mb-4 aspect-16/10 overflow-hidden rounded-[3px]">
        <Frame src={project.image} alt={project.name} hint={`${project.name} screenshot`} />
      </div>

      <div className="mb-2 flex items-baseline justify-between gap-2.5">
        <span className="font-display text-[27px] font-bold">{project.name}</span>
        <span className="text-ink/45 font-mono text-[11px]">{project.year}</span>
      </div>

      <p className="text-ink/74 m-0 mb-4 text-[14.5px] leading-[1.6] text-pretty">
        <Emphasis text={project.blurb} />
      </p>

      {/* Pinned to the bottom so every card's tags and links line up. */}
      <div className="mt-auto flex flex-wrap gap-[7px]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-ink/6 text-ink/78 rounded-[2px] px-[9px] py-1 font-mono text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Text-sized links, with touch areas stretched to a fingertip by ::after. */}
      {(project.live || project.repo) && (
        <div className="border-ink/12 mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t pt-3.5 font-mono text-[11.5px]">
          {project.live && (
            <TrackedLink
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              event="project_opened"
              eventProps={{ project: project.name, target: "live" }}
              className="relative after:absolute after:-inset-x-2 after:-inset-y-3.5 after:content-[''] text-accent hover:text-accent-deep no-underline"
            >
              live &#8599;
            </TrackedLink>
          )}
          {project.repo && (
            <TrackedLink
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              event="project_opened"
              eventProps={{ project: project.name, target: "repo" }}
              className="relative after:absolute after:-inset-x-2 after:-inset-y-3.5 after:content-[''] text-ink/55 hover:text-accent no-underline"
            >
              github &#8599;
            </TrackedLink>
          )}
        </div>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <Room id="projects" className="bg-paper-alt border-ink/10 border-t-[1.5px] py-[120px]">
      <div className="mx-auto max-w-[1180px]">
        <RoomLabel id="projects" />
        <h2 className="font-display m-0 mb-3 flex flex-wrap gap-x-[0.24em] text-[clamp(36px,4.4vw,54px)] font-bold">
          <WordReveal text="Prototypes that grew up." />
        </h2>
        <p className="text-ink/68 m-0 mb-[50px] max-w-[520px] text-[16.5px] leading-[1.6]">
          Things I built end to end. Sawdust included.
        </p>

        {/* auto-rows-[1fr]: every row matches the tallest, so no card is bigger than another. */}
        <div className="grid auto-rows-[1fr] grid-cols-1 gap-[34px] md:grid-cols-4 xl:grid-cols-6">
          {projects.map((project, i) => (
            <Rise
              key={project.name}
              index={i}
              delay={0.12}
              className={`md:col-span-2 ${centreLastRow(i, projects.length)}`}
            >
              <Card project={project} />
            </Rise>
          ))}
        </div>
      </div>
    </Room>
  );
}

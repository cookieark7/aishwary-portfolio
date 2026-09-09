import { Frame } from "../Frame";
import { Rise } from "../Rise";
import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { TrackedLink } from "../TrackedLink";
import { WordReveal } from "../WordReveal";
import { projects, type Project } from "@/content/projects";

function Card({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <div className="bg-card border-ink/14 hover:border-accent/45 group flex h-full flex-col rounded-[5px] border-[1.5px] p-[18px] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-2 hover:-rotate-[0.4deg] hover:shadow-[0_22px_38px_oklch(22%_0.02_260_/_0.17)]">
      <div
        className={`relative mb-4 overflow-hidden rounded-[3px] ${
          wide ? "aspect-16/10 md:aspect-[2.4/1]" : "aspect-16/10"
        }`}
      >
        <Frame src={project.image} alt={project.name} hint={`${project.name} screenshot`} />
      </div>

      <div className="mb-2 flex items-baseline justify-between gap-2.5">
        <span className={`font-display font-bold ${wide ? "text-[32px]" : "text-[27px]"}`}>
          {project.name}
        </span>
        <span className="text-ink/45 font-mono text-[11px]">{project.year}</span>
      </div>

      <p
        className={`text-ink/74 m-0 mb-4 leading-[1.6] text-pretty ${
          wide ? "max-w-[72ch] text-[15.5px]" : "text-[14.5px]"
        }`}
      >
        {project.blurb}
      </p>

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

      {(project.live || project.repo) && (
        <div className="border-ink/12 mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t pt-3.5 font-mono text-[11.5px]">
          {project.live && (
            <TrackedLink
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              event="project_opened"
              eventProps={{ project: project.name, target: "live" }}
              className="text-accent hover:text-accent-deep no-underline"
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
              className="text-ink/55 hover:text-accent no-underline"
            >
              github &#8599;
            </TrackedLink>
          )}
        </div>
      )}
    </div>
  );
}

export function Workshop() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);

  return (
    <Room id="workshop" className="bg-paper-alt border-ink/10 border-t-[1.5px] py-[120px]">
      <div className="mx-auto max-w-[1180px]">
        <RoomLabel id="workshop" />
        <h2 className="font-display m-0 mb-3 flex flex-wrap gap-x-[0.24em] text-[clamp(36px,4.4vw,54px)] font-bold">
          <WordReveal text="Prototypes that grew up." />
        </h2>
        <p className="text-ink/68 m-0 mb-[50px] max-w-[520px] text-[16.5px] leading-[1.6]">
          Things I built end to end. Sawdust included.
        </p>

        {featured && (
          <div className="mb-[34px]">
            <Rise index={0} delay={0.12}>
              <Card project={featured} wide />
            </Rise>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[34px]">
          {rest.map((project, i) => (
            <Rise key={project.name} index={i + 1} delay={0.12}>
              <Card project={project} />
            </Rise>
          ))}
        </div>
      </div>
    </Room>
  );
}

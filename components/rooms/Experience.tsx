import { Rise } from "../Rise";
import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { WordReveal } from "../WordReveal";
import { experience } from "@/content/experience";

/**
 * Room 03 — Experience, as a timeline. Filled markers are jobs, hollow ones are
 * study, and the current role wears the accent ring.
 */
export function Experience() {
  return (
    <Room id="experience" className="bg-paper-alt border-ink/10 border-t-[1.5px] py-[120px]">
      <div className="mx-auto max-w-[880px]">
        <RoomLabel id="experience" />
        <h2 className="font-display m-0 mb-3 flex flex-wrap gap-x-[0.24em] text-[clamp(36px,4.4vw,54px)] font-bold">
          <WordReveal text="The long way here." />
        </h2>
        <p className="text-ink/68 m-0 mb-[50px] max-w-[520px] text-[16.5px] leading-[1.6]">
          Three titles at one company, trainee to engineer &mdash; and where it started.
        </p>

        <div className="relative">
          <span aria-hidden className="bg-ink/18 absolute top-2 bottom-2 left-[6px] w-[1.5px]" />
          <ol className="relative m-0 list-none p-0">
            {experience.map((stop, i) => {
              const current = /present/i.test(stop.period);
              return (
                <Rise
                  key={`${stop.org}-${stop.period}`}
                  as="li"
                  index={i}
                  delay={0.1}
                  className="relative pb-11 pl-10 last:pb-0"
                >
                  <span
                    aria-hidden
                    className={`border-accent absolute top-[7px] left-0 size-[13px] rounded-full border-[1.5px] ${
                      stop.kind === "study" ? "bg-paper-alt" : "bg-accent"
                    } ${current ? "ring-accent/15 ring-4" : ""}`}
                  />
                  <div className="text-ink/45 mb-1 font-mono text-[11.5px] tracking-[0.08em]">
                    {stop.period}
                  </div>
                  <div className="font-display text-[27px] leading-tight font-bold">{stop.role}</div>
                  <div className={`text-accent text-[15px] ${stop.note ? "mb-2" : ""}`}>{stop.org}</div>
                  {stop.note && (
                    <p className="text-ink/70 m-0 max-w-[560px] text-[14.5px] leading-[1.6] text-pretty">
                      {stop.note}
                    </p>
                  )}
                </Rise>
              );
            })}
          </ol>
        </div>
      </div>
    </Room>
  );
}

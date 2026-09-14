import { Rise } from "../Rise";
import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { WordReveal } from "../WordReveal";
import { skillGroups } from "@/content/skills";

export function InstrumentWall() {
  return (
    <Room id="instruments" className="bg-paper border-ink/10 border-t-[1.5px] py-[120px]">
      <div className="mx-auto max-w-[1080px]">
        <RoomLabel id="instruments" />
        <h2 className="font-display m-0 mb-3 flex flex-wrap gap-x-[0.24em] text-[clamp(36px,4.4vw,54px)] font-bold">
          <WordReveal text="Instruments, not buzzwords." />
        </h2>
        <p className="text-ink/68 m-0 mb-[50px] max-w-[520px] text-[16.5px] leading-[1.6]">
          Hung on nails, within reach. Pick one up.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-[42px]">
          {skillGroups.map((group, i) => (
            <Rise key={group.title} index={i} delay={0.12}>
              <div className="font-display mb-1.5 text-[26px] font-bold">{group.title}</div>
              <div className="bg-ink/18 mb-[18px] h-[1.5px]" />
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="border-ink/25 hover:border-accent hover:text-accent inline-block -rotate-[0.8deg] rounded-[3px] border-[1.5px] bg-white/55 px-3.5 py-2 font-mono text-[13px] transition-[translate,rotate,scale,box-shadow,border-color,color,background] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:rotate-[1.2deg] hover:scale-105 hover:bg-white/95 hover:shadow-[0_12px_22px_oklch(22%_0.02_260_/_0.18)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </Room>
  );
}

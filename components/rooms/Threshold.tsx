import { Frame } from "../Frame";
import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { WordReveal } from "../WordReveal";
import { site } from "@/lib/site";

export function Threshold() {
  return (
    <Room id="threshold" className="bg-paper flex min-h-screen items-center pt-[110px] pb-[90px]">
      <div className="relative">
        {/* Portrait in its orbit: above the copy on phones, alongside it on wide screens. */}
        <div className="pointer-events-none relative mb-12 size-[220px] opacity-90 lg:absolute lg:top-1/2 lg:right-[5vw] lg:mb-0 lg:size-[300px] lg:-translate-y-1/2">
          <div className="border-accent/50 animate-orbit absolute inset-0 rounded-full border-[1.5px]" />
          <div className="border-brass/60 animate-orbit-alt absolute inset-[10%] border-[1.5px] border-dashed" />
          <div className="absolute inset-[21%] -rotate-2 overflow-hidden rounded-xl shadow-[0_18px_38px_oklch(22%_0.02_260_/_0.16)]">
            <Frame src={site.portrait} alt={site.name} hint="portrait photo" />
          </div>
        </div>

        <div className="max-w-[620px]">
          <RoomLabel id="threshold" />
          <h1 className="font-display m-0 mt-[22px] mb-6 flex flex-wrap gap-x-[0.24em] text-[clamp(50px,6.6vw,88px)] leading-[0.98] font-bold">
            <WordReveal text={site.headline} delay={0.1} />
          </h1>
          <p className="text-ink/78 m-0 mb-[34px] max-w-[500px] text-[19px] leading-[1.62] text-pretty">
            {site.intro}
          </p>
          <div className="text-ink/55 flex items-center gap-3.5 font-mono text-[12.5px]">
            <span className="bg-ink/40 inline-block h-[1.5px] w-[26px]" />
            <span>scroll to walk through</span>
          </div>
        </div>
      </div>
    </Room>
  );
}

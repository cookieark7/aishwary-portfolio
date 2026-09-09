"use client";

import { ROOMS, roomNumber } from "@/lib/rooms";
import { site } from "@/lib/site";
import { useTour } from "./TourProvider";

/** Wordmark and room plaque. Both invert as a dark wall passes behind them. */
export function Header() {
  const { active, headerDark } = useTour();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[22px] z-25 flex items-baseline justify-between px-[6vw] md:pr-[6vw] md:pl-[68px]">
      <span
        className={`font-display text-[25px] font-bold transition-colors duration-500 ${
          headerDark ? "text-chalk" : "text-ink"
        }`}
      >
        {site.name}
      </span>
      <span
        className={`font-mono text-[11.5px] tracking-[0.14em] uppercase transition-colors duration-500 ${
          headerDark ? "text-chalk/85" : "text-ink/55"
        }`}
      >
        {roomNumber(active)} / {ROOMS[active].name}
      </span>
    </header>
  );
}

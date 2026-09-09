"use client";

import { ROOMS } from "@/lib/rooms";
import { useTour } from "./TourProvider";

/**
 * The floor plan down the left edge: a dotted track, a fill that reaches the
 * current room, and a dot per room you can jump to. Hidden on narrow screens,
 * where it would sit on top of the content.
 */
export function Rail() {
  const { active, headerDark } = useTour();
  const fill = (active / (ROOMS.length - 1)) * 100;

  return (
    <nav
      aria-label="Rooms"
      className="pointer-events-none fixed top-0 bottom-0 left-5 z-30 hidden w-4 items-center md:flex"
    >
      <div className="relative flex h-[62vh] w-4 flex-col items-center justify-between">
        <div
          aria-hidden
          className={`absolute top-0 bottom-0 left-[7px] w-[2px] border-l-2 border-dotted transition-colors duration-500 ${
            headerDark ? "border-chalk/30" : "border-ink/20"
          }`}
        />
        <div
          aria-hidden
          className="bg-accent absolute top-0 left-[7px] w-[2px] rounded-[2px] transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ height: `${fill}%` }}
        />

        {ROOMS.map((room, i) => {
          const walked = i <= active;
          const here = i === active;
          return (
            <a
              key={room.id}
              href={`#${room.id}`}
              aria-label={room.name}
              aria-current={here ? "true" : undefined}
              title={room.name}
              className={`pointer-events-auto relative z-1 block box-border rounded-full border-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                here ? "size-3" : "size-2"
              } ${
                walked
                  ? "border-accent bg-accent"
                  : headerDark
                    ? "border-chalk/40 bg-transparent"
                    : "border-ink/35 bg-transparent"
              } ${here ? "ring-accent/15 ring-5" : ""}`}
            />
          );
        })}
      </div>
    </nav>
  );
}

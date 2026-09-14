"use client";

import type { CSSProperties, MouseEvent } from "react";
import { ROOMS, roomNumber } from "@/lib/rooms";
import { useTour } from "./TourProvider";

/** CSS twin of the glide's easeInOutCubic, so the fill and the page move as one. */
const GLIDE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Fraction of a glide's duration by which it has covered `p` of the distance. */
const timeAt = (p: number) => (p < 0.5 ? Math.cbrt(p / 4) : 1 - Math.cbrt(2 * (1 - p)) / 2);

/**
 * How long a dot waits before changing, so each lights (or dims) as the fill
 * actually reaches it rather than all at once the moment a glide begins.
 */
function dotDelay(i: number, from: number, to: number, glide: number | null) {
  if (glide === null || from === to) return 0;
  if (i === to) return glide;
  const onPath = from < to ? i > from && i < to : i <= from && i > to;
  return onPath ? glide * timeAt(Math.abs(i - from) / Math.abs(to - from)) : 0;
}

/**
 * The floor plan down the left edge, doubling as quick navigation. Hover the
 * rail (or tab into it) and every room's label slides out; click a dot or a
 * label to glide there. Hidden on narrow screens, where it would cover content.
 */
export function Rail() {
  const { active, headerDark, glide, glideFrom, navigate } = useTour();
  const fill = (active / (ROOMS.length - 1)) * 100;

  const go = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    // Leave modified clicks — new tab, copy link — to the browser.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(i);
  };

  return (
    <nav
      aria-label="Rooms"
      className="group/rail pointer-events-none fixed top-0 bottom-0 left-3 z-30 hidden items-center md:flex"
    >
      <div className="pointer-events-auto relative flex h-[62vh] flex-col justify-between pr-3 pl-2">
        {/* Track and fill run dot-centre to dot-centre. */}
        <div aria-hidden className="absolute top-3.5 bottom-3.5 left-[15px] w-[2px]">
          <div
            className={`absolute inset-0 border-l-2 border-dotted transition-colors duration-500 ${
              headerDark ? "border-chalk/30" : "border-ink/20"
            }`}
          />
          <div
            className="bg-accent absolute top-0 left-0 w-[2px] rounded-[2px] transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              height: `${fill}%`,
              ...(glide !== null && {
                transitionDuration: `${glide}s`,
                transitionTimingFunction: GLIDE_EASE,
              }),
            }}
          />
        </div>

        {ROOMS.map((room, i) => {
          const walked = i <= active;
          const here = i === active;
          const delay = dotDelay(i, glideFrom, active, glide);

          return (
            <a
              key={room.id}
              href={`#${room.id}`}
              onClick={go(i)}
              aria-label={room.name}
              aria-current={here ? "location" : undefined}
              className="group/dot relative z-1 flex h-7 w-4 items-center justify-center outline-none"
            >
              <span
                aria-hidden
                style={delay ? { transitionDelay: `${delay}s` } : undefined}
                className={`box-border block rounded-full border-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/dot:scale-125 group-focus-visible/dot:scale-125 ${
                  here ? "ring-accent/15 size-3 ring-5" : "size-2"
                } ${
                  walked
                    ? "border-accent bg-accent"
                    : headerDark
                      ? "border-chalk/40 bg-transparent"
                      : "border-ink/35 bg-transparent"
                }`}
              />

              {/* Labels fan out top to bottom as the rail is entered. */}
              <span
                aria-hidden
                style={{ "--stagger": `${i * 22}ms` } as CSSProperties}
                className="bg-ink text-paper ring-chalk/15 group-hover/dot:bg-accent group-focus-visible/dot:bg-accent pointer-events-none absolute top-1/2 left-[calc(100%+12px)] flex -translate-x-1.5 -translate-y-1/2 scale-95 items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] tracking-[0.12em] whitespace-nowrap uppercase opacity-0 shadow-[0_8px_20px_oklch(22%_0.02_260_/_0.24)] ring-1 transition-[opacity,translate,scale,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/rail:pointer-events-auto group-hover/rail:translate-x-0 group-hover/rail:scale-100 group-hover/rail:opacity-100 group-hover/rail:[transition-delay:var(--stagger)] group-has-[:focus-visible]/rail:pointer-events-auto group-has-[:focus-visible]/rail:translate-x-0 group-has-[:focus-visible]/rail:scale-100 group-has-[:focus-visible]/rail:opacity-100"
              >
                <span
                  className={`group-hover/dot:text-paper/70 group-focus-visible/dot:text-paper/70 ${
                    here ? "text-accent-lit" : "text-paper/45"
                  }`}
                >
                  {roomNumber(i)}
                </span>
                {room.name}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

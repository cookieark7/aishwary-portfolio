"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ROOMS } from "@/lib/rooms";
import { track } from "@/lib/analytics";

type Tour = {
  /** Index of the room the visitor is standing in. */
  active: number;
  /** True while a dark wall sits behind the fixed header band. */
  headerDark: boolean;
  register: (index: number) => (el: HTMLElement | null) => void;
};

const TourCtx = createContext<Tour | null>(null);

export function useTour(): Tour {
  const ctx = useContext(TourCtx);
  if (!ctx) throw new Error("useTour must be used inside <TourProvider>");
  return ctx;
}

/** The header sits at this y; whatever wall crosses it decides the header colour. */
const HEADER_BAND = 54;

export function TourProvider({ children }: { children: ReactNode }) {
  const els = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [headerDark, setHeaderDark] = useState(false);

  const register = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      els.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    let raf = 0;
    let lastAt = 0;

    const measure = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      let nextActive = 0;
      let nextDark = false;

      ROOMS.forEach((room, i) => {
        const el = els.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.42) nextActive = i;
        if (room.dark && r.top <= HEADER_BAND && r.bottom > HEADER_BAND) {
          nextDark = true;
        }
      });

      setActive(nextActive);
      setHeaderDark(nextDark);
    };

    const onScroll = () => {
      const now = Date.now();
      // A timestamp guard rather than a plain rAF latch: a frame dropped while
      // the tab is hidden can never wedge this permanently.
      if (raf && now - lastAt < 400) return;
      lastAt = now;
      raf = requestAnimationFrame(measure);
    };

    const onVisible = () => {
      raf = 0;
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisible);
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisible);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Report each room the first time the visitor actually reaches it. This is
  // what answers "did they get as far as the projects?" — a room only becomes
  // active once its top passes 42% of the viewport, so it can't be counted from
  // a glance at the room above it.
  const reported = useRef<Set<number>>(new Set());
  useEffect(() => {
    if (reported.current.has(active)) return;
    reported.current.add(active);
    const room = ROOMS[active];
    track("room_viewed", { room: room.id, name: room.name, index: active });
  }, [active]);

  return (
    <TourCtx.Provider value={{ active, headerDark, register }}>
      {children}
    </TourCtx.Provider>
  );
}

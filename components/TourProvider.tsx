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
import { track } from "@/lib/analytics";
import { ROOMS } from "@/lib/rooms";

type Tour = {
  /** Index of the room the visitor is standing in. */
  active: number;
  /** True while a dark wall sits behind the fixed header band. */
  headerDark: boolean;
  /** Seconds the glide in progress lasts, or null when nothing is gliding. */
  glide: number | null;
  /** The room the current glide set off from, so the rail can light dots in step. */
  glideFrom: number;
  register: (index: number) => (el: HTMLElement | null) => void;
  /** Glide to a room, then hand it keyboard focus. */
  navigate: (index: number) => void;
};

const TourCtx = createContext<Tour | null>(null);

export function useTour(): Tour {
  const ctx = useContext(TourCtx);
  if (!ctx) throw new Error("useTour must be used inside <TourProvider>");
  return ctx;
}

/** The header sits at this y; whatever wall crosses it decides the header colour. */
const HEADER_BAND = 54;

/** Symmetric, so a long jump neither lurches off the mark nor slams into place. */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Longer trips take a little longer, but never long enough to feel slow. */
const glideSeconds = (distance: number) => Math.min(1.1, 0.35 + distance / 12000);

export function TourProvider({ children }: { children: ReactNode }) {
  const els = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [headerDark, setHeaderDark] = useState(false);
  const [glide, setGlide] = useState<number | null>(null);
  const [glideFrom, setGlideFrom] = useState(0);

  // While a glide runs, `active` stays pinned to the destination rather than
  // flicking through every room it passes on the way.
  const gliding = useRef(false);
  const stopGlide = useRef<(() => void) | null>(null);
  const measureRef = useRef<() => number>(() => 0);
  const activeRef = useRef(0);
  const reported = useRef<Set<number>>(new Set());

  const register = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      els.current[index] = el;
    },
    [],
  );

  /** Report a room the first time the visitor actually stands in it. */
  const report = useCallback((index: number) => {
    if (reported.current.has(index)) return;
    reported.current.add(index);
    const room = ROOMS[index];
    track("room_viewed", { room: room.id, name: room.name, index });
  }, []);

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

      // The header keeps following the wall behind it mid-glide; only the room
      // indicator holds still.
      setHeaderDark(nextDark);
      if (!gliding.current) setActive(nextActive);
      return nextActive;
    };
    measureRef.current = measure;

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
      stopGlide.current?.();
    };
  }, []);

  // A room counts as viewed once the visitor is standing in it — never when a
  // glide merely flies past, nor the moment a glide towards it begins.
  useEffect(() => {
    activeRef.current = active;
    if (!gliding.current) report(active);
  }, [active, report]);

  const navigate = useCallback(
    (index: number) => {
      const el = els.current[index];
      if (!el) return;

      stopGlide.current?.();
      // Makes the room shareable and keeps any ?ref= attribution, without
      // stacking a history entry per click.
      window.history.replaceState(null, "", `#${ROOMS[index].id}`);

      const from = window.scrollY;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const to = Math.max(0, Math.min(maxY, from + el.getBoundingClientRect().top));
      const distance = Math.abs(to - from);

      const arrive = () => {
        el.focus({ preventScroll: true });
        report(measureRef.current());
      };

      if (distance < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({ top: to, behavior: "instant" });
        arrive();
        return;
      }

      const seconds = glideSeconds(distance);
      const start = performance.now();
      let frame = 0;
      // Belt and braces: a frame already dispatched can never outlive its glide.
      let over = false;

      const teardown = () => {
        over = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("wheel", interrupt);
        window.removeEventListener("touchstart", interrupt);
        window.removeEventListener("keydown", interrupt);
        stopGlide.current = null;
        gliding.current = false;
        setGlide(null);
      };

      // The visitor's own input ends the glide where it is, rather than
      // fighting them for the scroll position.
      function interrupt() {
        teardown();
        report(measureRef.current());
      }

      const step = (now: number) => {
        if (over) return;
        const t = Math.min(1, (now - start) / (seconds * 1000));
        window.scrollTo({ top: from + (to - from) * easeInOutCubic(t), behavior: "instant" });
        if (t < 1) {
          frame = requestAnimationFrame(step);
        } else {
          teardown();
          arrive();
        }
      };

      gliding.current = true;
      stopGlide.current = teardown;
      setGlideFrom(activeRef.current);
      setActive(index);
      setGlide(seconds);

      window.addEventListener("wheel", interrupt, { passive: true });
      window.addEventListener("touchstart", interrupt, { passive: true });
      window.addEventListener("keydown", interrupt);
      frame = requestAnimationFrame(step);
    },
    [report],
  );

  return (
    <TourCtx.Provider value={{ active, headerDark, glide, glideFrom, register, navigate }}>
      {children}
    </TourCtx.Provider>
  );
}

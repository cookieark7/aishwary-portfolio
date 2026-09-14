"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ROOMS, roomIndex, roomNumber } from "@/lib/rooms";
import { useTour } from "./TourProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A section of the tour: registers itself for the rail, drifts its oversized
 * ghost numeral against the scroll, and lifts its contents into view once.
 */
export function Room({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const index = roomIndex(id);
  const room = ROOMS[index];
  const ref = useRef<HTMLElement | null>(null);
  const { register } = useTour();
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [45, -45]);

  return (
    <section
      id={id}
      tabIndex={-1}
      ref={(el) => {
        ref.current = el;
        register(index)(el);
      }}
      className={`relative overflow-hidden px-[6vw] outline-none md:pr-[6vw] md:pl-[68px] ${className}`}
    >
      <motion.div
        aria-hidden
        style={still ? undefined : { y: ghostY }}
        className={`pointer-events-none absolute right-[4vw] bottom-[-2vw] z-0 font-display text-[clamp(160px,26vw,380px)] leading-[0.8] font-bold select-none ${
          room.dark ? "text-chalk/[0.055]" : "text-ink/[0.045]"
        }`}
      >
        {roomNumber(index)}
      </motion.div>

      <motion.div
        className="relative z-[2] w-full"
        initial={still ? false : { opacity: 0, y: 30, clipPath: "inset(0 0 10% 0)" }}
        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "0px 0px -26% 0px" }}
        transition={
          still
            ? { duration: 0 }
            : {
                duration: 0.8,
                ease: EASE,
                clipPath: { duration: 0.95, ease: EASE },
              }
        }
      >
        {children}
      </motion.div>
    </section>
  );
}

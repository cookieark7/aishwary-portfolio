"use client";

import { motion, useScroll } from "motion/react";

/** Hairline across the top of the window, filling as the tour is walked. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="bg-accent pointer-events-none fixed inset-x-0 top-0 z-40 h-[2.5px] origin-left"
    />
  );
}

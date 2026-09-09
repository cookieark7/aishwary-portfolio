"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One item in a staggered group. Later items start further down, so a row of
 * cards fans in rather than arriving as a block.
 */
export function Rise({
  index,
  delay = 0,
  className = "",
  children,
}: {
  index: number;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const still = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y: 22 + index * 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -26% 0px" }}
      transition={
        still ? { duration: 0 } : { duration: 0.66, ease: EASE, delay: delay + index * 0.09 }
      }
    >
      {children}
    </motion.div>
  );
}

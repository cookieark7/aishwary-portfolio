"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One item in a staggered group. Later items start further down, so a row of
 * cards fans in rather than arriving as a block. Pass `as="li"` inside a list
 * so the animated element is the list item itself and the markup stays valid.
 */
export function Rise({
  index,
  delay = 0,
  as = "div",
  className = "",
  children,
}: {
  index: number;
  delay?: number;
  as?: "div" | "li";
  className?: string;
  children: ReactNode;
}) {
  const still = useReducedMotion();

  const motionProps = {
    className,
    initial: still ? false : { opacity: 0, y: 22 + index * 4 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -26% 0px" },
    transition: still
      ? { duration: 0 }
      : { duration: 0.66, ease: EASE, delay: delay + index * 0.09 },
  } as const;

  return as === "li" ? (
    <motion.li {...motionProps}>{children}</motion.li>
  ) : (
    <motion.div {...motionProps}>{children}</motion.div>
  );
}

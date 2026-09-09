"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Splits a line into words that blur, lift and straighten into place one after
 * another. Renders as a fragment so the parent heading stays the flex container
 * and keeps its own column-gap between words.
 */
export function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const still = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          style={{ willChange: "opacity, transform" }}
          initial={
            still
              ? false
              : { opacity: 0, filter: "blur(8px)", y: "0.45em", rotate: -2.5 }
          }
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -26% 0px" }}
          transition={
            still
              ? { duration: 0 }
              : { duration: 0.66, ease: EASE, delay: delay + i * 0.055 }
          }
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { roomIndex, roomNumber, ROOMS } from "@/lib/rooms";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The engraved eyebrow: "Room 03 —— Experience", rule drawn on entry. */
export function RoomLabel({
  id,
  center = false,
}: {
  id: string;
  center?: boolean;
}) {
  const index = roomIndex(id);
  const room = ROOMS[index];
  const still = useReducedMotion();

  return (
    <div
      className={`mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.16em] uppercase ${
        center ? "justify-center" : ""
      } ${room.dark ? "text-accent-lit" : "text-accent"}`}
    >
      <span>Room {roomNumber(index)}</span>
      <motion.span
        aria-hidden
        className={`inline-block h-[1.5px] align-middle ${
          room.dark ? "bg-accent-lit/80" : "bg-accent/80"
        }`}
        initial={still ? false : { width: 0 }}
        whileInView={{ width: 54 }}
        viewport={{ once: true, margin: "0px 0px -26% 0px" }}
        transition={still ? { duration: 0 } : { duration: 0.9, ease: EASE, delay: 0.12 }}
      />
      <span>{room.name}</span>
    </div>
  );
}

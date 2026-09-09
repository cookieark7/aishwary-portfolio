"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { track, type EventName } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: EventName;
  eventProps?: Record<string, string | number | boolean>;
};

/**
 * An anchor that reports its own click. Keeps the room components as server
 * components — only the link itself needs to run on the client.
 */
export function TrackedLink({ event, eventProps, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}

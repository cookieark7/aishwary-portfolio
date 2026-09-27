import type { PostHog } from "posthog-js";

/**
 * The only file that knows which analytics vendor we use.
 *
 * Everything else in the app calls `track()` with a name from `EventName`, so
 * swapping PostHog for something else means rewriting this file and nothing
 * else. PostHog itself is loaded dynamically after hydration — with no key set
 * it is never downloaded at all, so local dev and forks stay clean.
 */
export type EventName =
  | "room_viewed"
  | "project_opened"
  | "resume_opened"
  | "post_opened"
  | "archive_opened"
  | "contact_clicked";

type Props = Record<string, string | number | boolean>;

let client: PostHog | null = null;
let starting = false;

/** NEXT_PUBLIC_ANALYTICS_DEBUG=1 logs every event to the console instead of
 *  needing a PostHog project to confirm the wiring works. */
const debug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "1";

/** Events fired before the SDK finishes loading wait here. */
const pending: Array<[EventName, Props | undefined]> = [];
const PENDING_LIMIT = 50;

export function track(name: EventName, props?: Props) {
  if (typeof window === "undefined") return;
  if (debug) console.debug("[analytics]", name, props ?? {});
  if (!client) {
    if (pending.length < PENDING_LIMIT) pending.push([name, props]);
    return;
  }
  client.capture(name, props);
}

export async function initAnalytics() {
  if (client || starting || typeof window === "undefined") return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return; // No key configured: analytics stays off entirely.
  starting = true;

  const { default: posthog } = await import("posthog-js");

  posthog.init(key, {
    // Same-origin proxy (see next.config.ts) so ad blockers, which a developer
    // audience runs a lot of, don't quietly delete most of the data.
    api_host: "/ingest",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu"
      ? "https://eu.posthog.com"
      : "https://us.posthog.com",
    // Cookieless: no consent banner needed. The trade-off is that a returning
    // visitor counts as a new one — switch to "localStorage+cookie" if you'd
    // rather have cross-visit identity and take on the banner.
    persistence: "memory",
    person_profiles: "identified_only",
    // Every event in this app is deliberate; autocapture would just add noise
    // and burn through the free tier.
    autocapture: false,
    // Fired by hand below, once `ref` is registered — the automatic pageview
    // goes out during init(), which would land the most important event of the
    // session without its attribution.
    capture_pageview: false,
    capture_pageleave: true,
  });

  client = posthog;

  // Per-application attribution: portfolio.arkexperiment.xyz/?ref=acme-backend. Registered
  // as a super property, so it rides along on every event in the session.
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref) posthog.register({ ref });

  posthog.capture("$pageview");

  for (const [name, props] of pending.splice(0)) {
    posthog.capture(name, props);
  }
}

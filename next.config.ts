import type { NextConfig } from "next";

const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu"
    ? { assets: "https://eu-assets.i.posthog.com", api: "https://eu.i.posthog.com" }
    : { assets: "https://us-assets.i.posthog.com", api: "https://us.i.posthog.com" };

const nextConfig: NextConfig = {
  // PostHog is proxied through our own origin so ad blockers — which a
  // developer audience runs plenty of — don't silently drop most events.
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `${posthogHost.assets}/static/:path*` },
      { source: "/ingest/:path*", destination: `${posthogHost.api}/:path*` },
    ];
  },
  // Required by the proxy above: /ingest paths must not be trailing-slash redirected.
  skipTrailingSlashRedirect: true,
  // The résumé lists a phone number. Anyone can open it from Contact, but search
  // engines are told not to index the file, so the number stays out of results.
  async headers() {
    return [{ source: "/resume.pdf", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;

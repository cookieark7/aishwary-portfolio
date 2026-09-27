# Aishwary Kantode — portfolio

A six-room walk-through portfolio, built from the Claude Design prototype in
[`design/`](design/). Next.js 16 (App Router) · React 19 · TypeScript ·
Tailwind v4 · Motion.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Editing the site

Nothing outside these files hardcodes your details — you should never need to
touch a component to change content.

| What | Where |
| --- | --- |
| Name, email, résumé link, socials, headline, portrait | [`lib/site.ts`](lib/site.ts) |
| Projects (Room 01) | [`content/projects.ts`](content/projects.ts) |
| Skills (Room 02) | [`content/skills.ts`](content/skills.ts) |
| Experience & education (Room 03) | [`content/experience.ts`](content/experience.ts) |
| Articles — external links (Room 04) | [`content/posts.ts`](content/posts.ts) |
| Open source (Room 05) | [`content/contributions.ts`](content/contributions.ts) |
| Room order, names, dark walls | [`lib/rooms.ts`](lib/rooms.ts) |
| Colours, fonts, easing | [`app/globals.css`](app/globals.css) |
| Analytics events and provider | [`lib/analytics.ts`](lib/analytics.ts) |

**Before going live:** every value in `lib/site.ts` is a placeholder, including
the email address and the social links. Add `public/resume.pdf`, drop images in
`public/images/`, and point `site.portrait` and each project's `image` at them —
until then they render as labelled dashed placeholders by design.

Adding a room is three steps: append it to `ROOMS`, write the component in
`components/rooms/`, render it in `app/page.tsx`. The rail, plaque, ghost
numeral and progress bar all read from `ROOMS`.

## How it works

`TourProvider` runs one rAF-throttled scroll pass that answers two questions:
which room you're standing in (drives the rail and the plaque) and whether a
dark wall is behind the fixed header band (flips the wordmark to chalk). The
timestamp guard in that loop is carried over from the prototype — a frame
dropped in a hidden tab can never wedge it.

Everything else is declarative. `Room` reveals its contents once on entry and
drifts the oversized ghost numeral against the scroll; `WordReveal` blurs a
heading in word by word; `Rise` fans a group of cards in, each starting a little
lower than the last. All three collapse to a no-op under
`prefers-reduced-motion`, which is what the prototype's `motionIntensity: 0`
switch was standing in for.

**Navigation.** On desktop the rail down the left edge is the menu: hover or
tab into it and every section's label slides out. On phones and touch screens a
pill in the bottom corner names the current section and opens a sheet listing
them all ([`RoomMenu`](components/RoomMenu.tsx), a native `<dialog>`). Both
call `navigate()` on the tour, which glides to the section with an ease-in-out
scroll scaled to the distance, pins the indicator to the destination on the
way, stops the moment the visitor scrolls or taps, updates the URL fragment
(keeping any `?ref=`), and moves keyboard focus into the section on arrival.

Section names live in [`lib/rooms.ts`](lib/rooms.ts) and are deliberately
plain — About, Projects, Skills, Experience, Writing, Open Source, Contact —
because they're what a recruiter reads in the menu, the header and the URL.
The personality is in each section's headline instead.

Colours are oklch throughout, carried over from the prototype without a trip
through hex, and registered as Tailwind v4 theme tokens — so `bg-paper-alt`,
`text-accent-lit` and `border-ink/14` are the real palette, not approximations.

## Analytics

Off by default. Add a PostHog key to `.env.local` (see `.env.example`) and it
switches on; with no key the SDK is never even downloaded.

```bash
cp .env.example .env.local   # then paste your project key
```

[`lib/analytics.ts`](lib/analytics.ts) is the only file that knows the vendor.
Everything else calls `track(name, props)` with a name from `EventName`, so
replacing PostHog later means rewriting that one file.

**Events**

| Event | Fires when |
| --- | --- |
| `$pageview` / `$pageleave` | Visit and time on page |
| `room_viewed` | A room's top passes 42% of the viewport — first time only |
| `project_opened` | A project card is clicked |
| `resume_opened` | The résumé is opened |
| `post_opened` / `archive_opened` | An article link is clicked |
| `contact_clicked` | Email, GitHub or LinkedIn |

`room_viewed` is the useful one. Because a room only counts once the visitor
actually scrolls into it, the drop-off between rooms is real:

```
About 100% → Projects 64% → Experience 41% → Contact 22% → résumé 9%
```

Build that as a funnel in PostHog and you can see where people lose interest.

**Per-application attribution.** Give each application its own link:

```
portfolio.arkexperiment.xyz/?ref=acme-backend
portfolio.arkexperiment.xyz/?ref=linkedin-dm-oct
```

`ref` is registered as a super property, so every event in that session carries
it — "someone from the Acme application read the résumé and left" becomes a
filter. Standard `utm_*` parameters are picked up automatically too.

This tells you which *application* a visit came from, not who the person was.
Anonymous visitors stay anonymous; that's deliberate.

**Privacy.** Cookieless (`persistence: "memory"`), so no consent banner is
needed — the trade-off is that a returning visitor counts as a new one. Switch
to `"localStorage+cookie"` in `lib/analytics.ts` if you want cross-visit
identity and are willing to add a banner. Autocapture is off, so every event is
one this codebase fires deliberately.

Requests are proxied through `/ingest` (rewrites in
[`next.config.ts`](next.config.ts)) so ad blockers — common in a developer
audience — don't silently drop most of the data.

Set `NEXT_PUBLIC_ANALYTICS_DEBUG=1` to log events to the console instead of
needing a PostHog project to check the wiring.

## Deploying

Every route is static. Push to GitHub and import the repo at
[vercel.com/new](https://vercel.com/new) — no configuration needed; set
`site.url` to your domain first so OG tags and metadata resolve.

For a static host instead (GitHub Pages, S3, Netlify drop), add
`output: "export"` and `images: { unoptimized: true }` to `next.config.ts` and
serve `out/`.

## `design/`

The original Claude Design handoff bundle, kept for reference. It is excluded
from linting and is not part of the build — nothing imports from it.

import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { TrackedLink } from "../TrackedLink";
import { WordReveal } from "../WordReveal";
import { ROOMS } from "@/lib/rooms";
import { site } from "@/lib/site";

const PRIMARY =
  "bg-ink text-paper hover:bg-accent rounded-[4px] px-[30px] py-[15px] font-mono text-[14px] no-underline transition-[transform,background,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] hover:-translate-y-1 hover:shadow-[0_14px_26px_oklch(22%_0.02_260_/_0.25)]";

const OUTLINE =
  "border-ink/70 hover:border-accent hover:text-accent text-ink rounded-[4px] border-[1.5px] px-[30px] py-[15px] font-mono text-[14px] no-underline transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] hover:-translate-y-1";

export function Doorway() {
  // Until the résumé exists, email carries the primary button rather than
  // leaving a prominent link that 404s.
  const hasResume = Boolean(site.resumeUrl);

  return (
    <Room
      id="doorway"
      className="bg-paper flex min-h-[88vh] items-center justify-center pt-[120px] pb-[90px]"
    >
      <div className="mx-auto max-w-[620px] text-center">
        <RoomLabel id="doorway" center />
        <h2 className="font-display m-0 mt-[18px] mb-[18px] flex flex-wrap justify-center gap-x-[0.24em] text-[clamp(38px,5vw,62px)] font-bold">
          <WordReveal text="Found something you need built?" />
        </h2>
        <p className="text-ink/72 m-0 mb-9 text-[17px] leading-[1.6]">
          {hasResume
            ? "Take the resume on your way out. Or knock — I answer."
            : "Knock — I answer."}
        </p>

        <div className="flex flex-wrap justify-center gap-3.5">
          {site.resumeUrl && (
            <TrackedLink
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              event="resume_opened"
              className={`${PRIMARY} hover:-rotate-[0.6deg]`}
            >
              resume &#8599;
            </TrackedLink>
          )}
          <TrackedLink
            href={`mailto:${site.email}`}
            event="contact_clicked"
            eventProps={{ channel: "email" }}
            className={`${hasResume ? OUTLINE : PRIMARY} hover:rotate-[0.6deg]`}
          >
            email
          </TrackedLink>
          {site.socials.github && (
            <TrackedLink
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              event="contact_clicked"
              eventProps={{ channel: "github" }}
              className={`${OUTLINE} hover:-rotate-[0.4deg]`}
            >
              github
            </TrackedLink>
          )}
          {site.socials.linkedin && (
            <TrackedLink
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              event="contact_clicked"
              eventProps={{ channel: "linkedin" }}
              className={`${OUTLINE} hover:rotate-[0.4deg]`}
            >
              linkedin
            </TrackedLink>
          )}
        </div>

        <p className="font-display text-ink/48 mt-[66px] text-[20px]">
          {ROOMS.length - 1} rooms, one notebook &mdash; {site.name}, {new Date().getFullYear()}
        </p>
      </div>
    </Room>
  );
}

import { Rise } from "../Rise";
import { TrackedLink } from "../TrackedLink";
import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { WordReveal } from "../WordReveal";
import { archiveUrl, posts } from "@/content/posts";

export function Writing() {
  return (
    <Room id="writing" className="bg-paper border-ink/10 border-t-[1.5px] py-[120px]">
      <div className="mx-auto max-w-[880px]">
        <RoomLabel id="writing" />
        <h2 className="font-display m-0 mb-3 flex flex-wrap gap-x-[0.24em] text-[clamp(36px,4.4vw,54px)] font-bold">
          <WordReveal text="Thinking, out loud, in public." />
        </h2>
        <p className="text-ink/68 m-0 mb-[44px] max-w-[520px] text-[16.5px] leading-[1.6]">
          Notes I published instead of losing in a drafts folder.
        </p>

        {posts.length === 0 && (
          <p className="border-ink/14 text-ink/50 m-0 border-t-[1.5px] px-4 py-[26px] font-mono text-[13.5px]">
            The shelf is empty for now &mdash; anything I publish lands here.
          </p>
        )}

        <div className="flex flex-col gap-0.5">
          {posts.map((post, i) => (
            <Rise key={post.href} index={i} delay={0.1}>
              <TrackedLink
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                event="post_opened"
                eventProps={{ title: post.title, source: post.source }}
                className="border-ink/14 grid grid-cols-[1fr_auto] items-baseline gap-x-[22px] gap-y-2 border-t-[1.5px] px-4 py-[22px] text-inherit no-underline transition-[background,padding-left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/60 hover:pl-[26px] sm:grid-cols-[92px_1fr_auto]"
              >
                <span className="text-ink/45 order-1 font-mono text-[11.5px] sm:order-none">
                  {post.date}
                </span>
                <span className="order-3 col-span-2 sm:order-none sm:col-span-1">
                  <span className="mb-1.5 block text-[19px] font-semibold">
                    {post.title}
                    <span className="border-ink/20 text-ink/50 ml-2.5 inline-block translate-y-[-2px] rounded-[2px] border px-1.5 py-px align-middle font-mono text-[10px] tracking-[0.06em] uppercase">
                      {post.source}
                    </span>
                  </span>
                  <span className="text-ink/66 block text-[14.5px] leading-[1.55] text-pretty">
                    {post.hook}
                  </span>
                </span>
                <span className="text-accent order-2 font-mono text-[11.5px] whitespace-nowrap sm:order-none">
                  {post.read} &#8599;
                </span>
              </TrackedLink>
            </Rise>
          ))}
        </div>

        {archiveUrl && (
          <TrackedLink
            href={archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            event="archive_opened"
            className="text-ink/55 hover:text-accent border-ink/14 mt-8 inline-flex items-center gap-2 border-t-[1.5px] pt-6 font-mono text-[12.5px] no-underline transition-colors"
          >
            <span className="bg-ink/40 inline-block h-[1.5px] w-[26px]" />
            everything else I&#39;ve written &#8599;
          </TrackedLink>
        )}
      </div>
    </Room>
  );
}

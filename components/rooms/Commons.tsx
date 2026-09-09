import { Rise } from "../Rise";
import { Room } from "../Room";
import { RoomLabel } from "../RoomLabel";
import { TrackedLink } from "../TrackedLink";
import { WordReveal } from "../WordReveal";
import { contributions } from "@/content/contributions";

export function Commons() {
  const [lead, ...rest] = contributions;

  return (
    <Room id="commons" className="bg-wall-dark text-chalk py-[120px]">
      <div className="mx-auto max-w-[1000px]">
        <RoomLabel id="commons" />
        <h2 className="font-display m-0 mb-3 flex flex-wrap gap-x-[0.24em] text-[clamp(36px,4.4vw,54px)] font-bold">
          <WordReveal text="Other people&#8217;s repositories." />
        </h2>
        <p className="text-chalk/66 m-0 mb-[46px] max-w-[520px] text-[16.5px] leading-[1.6]">
          Code I don&#8217;t own, kept in better shape than I found it.
        </p>

        {lead && (
          <Rise index={0} delay={0.1}>
            <TrackedLink
              href={lead.href}
              target="_blank"
              rel="noopener noreferrer"
              event="contact_clicked"
              eventProps={{ channel: "oss", repo: lead.repo }}
              className="border-chalk/18 bg-chalk/3 hover:border-accent-lit/70 hover:bg-chalk/7 group block rounded-[5px] border-[1.5px] p-7 text-inherit no-underline transition-[transform,border-color,background] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1.5 md:p-9"
            >
              <div className="mb-5 flex flex-wrap items-center gap-x-3.5 gap-y-2">
                <span className="text-accent-lit font-mono text-[14px]">{lead.repo}</span>
                {lead.stars && (
                  <span className="text-chalk/45 font-mono text-[12px]">{lead.stars}</span>
                )}
                <span className="border-chalk/30 text-chalk/70 ml-auto rounded-[2px] border px-2 py-[3px] font-mono text-[10.5px] tracking-[0.08em] uppercase">
                  {lead.status}
                </span>
              </div>

              <h3 className="text-chalk m-0 mb-4 font-mono text-[15px] leading-[1.5] font-normal md:text-[17px]">
                {lead.title}
              </h3>

              {lead.summary && (
                <p className="text-chalk/70 m-0 mb-7 max-w-[64ch] text-[15.5px] leading-[1.65] text-pretty">
                  {lead.summary}
                </p>
              )}

              <div className="border-chalk/15 text-chalk/50 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-5 font-mono text-[11.5px]">
                <span>{lead.diff}</span>
                <span>{lead.kind}</span>
                {lead.date && <span>{lead.date}</span>}
                <span className="text-accent-lit ml-auto transition-transform duration-300 group-hover:translate-x-0.5">
                  view pull request &#8599;
                </span>
              </div>
            </TrackedLink>
          </Rise>
        )}

        {rest.length > 0 && (
          <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
            {rest.map((c, i) => (
              <Rise key={`${c.repo}-${c.title}`} index={i + 1} delay={0.1}>
                <TrackedLink
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="contact_clicked"
                  eventProps={{ channel: "oss", repo: c.repo }}
                  className="border-chalk/18 bg-chalk/3 hover:border-accent-lit/70 hover:bg-chalk/7 block h-full rounded-[5px] border-[1.5px] p-[22px] text-inherit no-underline transition-[transform,border-color,background] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1.5 hover:rotate-[0.4deg]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-accent-lit font-mono text-[13px]">{c.repo}</span>
                    <span className="border-chalk/30 text-chalk/70 rounded-[2px] border px-2 py-[3px] font-mono text-[10.5px] tracking-[0.08em] uppercase">
                      {c.status}
                    </span>
                  </div>
                  <div className="mb-3 text-[16.5px] leading-[1.45] font-medium text-pretty">
                    {c.title}
                  </div>
                  <div className="text-chalk/50 flex gap-3.5 font-mono text-[11.5px]">
                    <span>{c.diff}</span>
                    <span>{c.kind}</span>
                  </div>
                </TrackedLink>
              </Rise>
            ))}
          </div>
        )}
      </div>
    </Room>
  );
}

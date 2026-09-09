import Image from "next/image";

/**
 * An image well. With no `src` it draws the same dashed placeholder the design
 * prototype used, so the site reads as finished before the photos land.
 */
export function Frame({
  src,
  alt,
  hint,
  dark = false,
}: {
  src?: string | null;
  alt: string;
  hint: string;
  dark?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`flex size-full items-center justify-center border-[1.5px] border-dashed ${
          dark ? "border-chalk/25 bg-chalk/5" : "border-ink/20 bg-ink/[0.03]"
        }`}
      >
        <span
          className={`px-3 text-center font-mono text-[11px] tracking-[0.08em] ${
            dark ? "text-chalk/45" : "text-ink/40"
          }`}
        >
          {hint}
        </span>
      </div>
    );
  }

  return <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />;
}

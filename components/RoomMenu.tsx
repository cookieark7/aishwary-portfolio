"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { ROOMS, roomNumber } from "@/lib/rooms";
import { useTour } from "./TourProvider";

/**
 * Quick navigation for phones and touch screens, where the rail is hidden or
 * its hover labels can't appear. A pill in the corner names the current
 * section; tapping it opens a sheet listing every section.
 *
 * Built on a native <dialog>, which brings the focus trap, Escape to close and
 * an inert page behind it without any code of our own.
 */
export function RoomMenu() {
  const { active, navigate } = useTour();
  const sheet = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [isOpen, setOpen] = useState(false);

  // Hold the page still behind the sheet. A layout effect, so closing releases
  // the page in the same commit — before a glide's first frame.
  useLayoutEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [isOpen]);

  const open = () => {
    const dialog = sheet.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
    dialog.querySelector<HTMLElement>('[aria-current="location"]')?.focus();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Jump to a section, currently ${ROOMS[active].name}`}
        className="bg-ink text-paper ring-chalk/15 fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 hidden min-h-11 items-center gap-2.5 rounded-full px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase shadow-[0_10px_28px_oklch(22%_0.02_260_/_0.28)] ring-1 transition-[scale] duration-150 active:scale-95 max-md:flex pointer-coarse:flex"
      >
        <span className="text-accent-lit">{roomNumber(active)}</span>
        <span>{ROOMS[active].name}</span>
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 3.5h10M2 7h10M2 10.5h10" />
        </svg>
      </button>

      <dialog
        ref={sheet}
        aria-labelledby={titleId}
        // Every way out releases the page in its own handler. The dialog's
        // `close` event is queued as a separate task, which can land late, so
        // it is only the fallback here; Escape arrives as `cancel`, immediately.
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        // A click landing on the dialog itself, not its panel, is the backdrop.
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          e.currentTarget.close();
          setOpen(false);
        }}
        className="sheet"
      >
        <div className="bg-paper text-ink max-h-[inherit] overflow-y-auto overscroll-contain rounded-t-[18px] px-5 pt-2.5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_oklch(22%_0.02_260_/_0.18)]">
          <div aria-hidden className="bg-ink/15 mx-auto mb-2 h-1 w-10 rounded-full" />

          <div className="mb-1 flex items-center justify-between">
            <h2 id={titleId} className="font-display m-0 text-[28px] font-bold">
              Jump to
            </h2>
            <button
              type="button"
              onClick={() => {
                sheet.current?.close();
                setOpen(false);
              }}
              aria-label="Close menu"
              className="text-ink/55 hover:text-ink -mr-2 flex size-11 items-center justify-center rounded-full"
            >
              <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </button>
          </div>

          <ol className="m-0 list-none p-0">
            {ROOMS.map((room, i) => {
              const here = i === active;
              return (
                <li key={room.id} className="border-ink/10 border-t first:border-t-0">
                  <a
                    href={`#${room.id}`}
                    onClick={(e) => {
                      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      sheet.current?.close();
                      setOpen(false);
                      navigate(i);
                    }}
                    aria-current={here ? "location" : undefined}
                    className="focus-visible:bg-ink/5 flex min-h-12 items-center gap-4 rounded-md px-1 py-3 outline-none"
                  >
                    <span className={`w-6 font-mono text-[12px] ${here ? "text-accent" : "text-ink/40"}`}>
                      {roomNumber(i)}
                    </span>
                    <span className={`text-[17px] ${here ? "font-semibold" : "font-medium"}`}>
                      {room.name}
                    </span>
                    {here && (
                      <span className="text-accent ml-auto font-mono text-[10.5px] tracking-[0.12em] uppercase">
                        You&rsquo;re here
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </dialog>
    </>
  );
}

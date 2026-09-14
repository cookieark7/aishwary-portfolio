/**
 * The tour. Order here drives the nav rail, the plaque, the ghost numbers,
 * and the wall colours — add or reorder rooms in this one list.
 */
export type Room = {
  id: string;
  name: string;
  /** Dark wall: flips the header, rail and accent to their lit variants. */
  dark?: boolean;
};

// Names say plainly what each section holds: they're what a recruiter scans in
// the menu, the header and the URL. The ids double as those URL fragments.
export const ROOMS: Room[] = [
  { id: "about", name: "About" },
  { id: "projects", name: "Projects" },
  { id: "skills", name: "Skills" },
  { id: "experience", name: "Experience" },
  { id: "writing", name: "Writing" },
  { id: "open-source", name: "Open Source", dark: true },
  { id: "contact", name: "Contact" },
];

export const roomIndex = (id: string) => ROOMS.findIndex((r) => r.id === id);

/** "03" — the ghost numeral and the eyebrow both want this. */
export const roomNumber = (i: number) => String(i).padStart(2, "0");

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

export const ROOMS: Room[] = [
  { id: "threshold", name: "Threshold" },
  { id: "workshop", name: "The Workshop" },
  { id: "instruments", name: "The Instrument Wall" },
  { id: "corridor", name: "The Corridor" },
  { id: "reading", name: "The Reading Room" },
  { id: "commons", name: "The Commons", dark: true },
  { id: "doorway", name: "Doorway" },
];

export const roomIndex = (id: string) => ROOMS.findIndex((r) => r.id === id);

/** "03" — the ghost numeral and the eyebrow both want this. */
export const roomNumber = (i: number) => String(i).padStart(2, "0");

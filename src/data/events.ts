import type { EventDoc } from "../types/index";

// The three events db.json held, word for word.
// They are reference data: nobody creates an event through the API, so
// they live here and go into the database once, from src/seed.ts.
//
// itelect4-project had a file in exactly this place -- src/data/ --
// and deleted it when json-server took over. This is that same list,
// on the side of the wire that now owns it.
export const EVENTS: EventDoc[] = [
  {
    id: "e1",
    title: "Tech Summit 2026",
    date: "2026-11-15",
    location: "Manila, Philippines",
  },
  {
    id: "e2",
    title: "Dev Conference 2026",
    date: "2026-12-01",
    location: "Cebu, Philippines",
  },
  {
    id: "e3",
    title: "Startup Expo 2027",
    date: "2027-01-20",
    location: "Davao, Philippines",
  },
];

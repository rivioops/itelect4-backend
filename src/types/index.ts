import type { Types } from "mongoose";

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: "attendee" | "organizer";
  isActive: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

export interface RSVP {
  id: number;
  userId: number;
  eventId: string;
  guestName: string;
  guestCount: number;
  status: "pending" | "confirmed" | "waitlisted";
  timestamp: Date;
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export type RSVPDoc = Omit<RSVP, "id" | "userId"> & {
  userId: Types.ObjectId;
};

export type NewRSVPBody = Pick<RSVP, "eventId" | "guestName" | "guestCount" | "status">;

// Event is the reference-data interface -- nobody creates one through the
// app, so it has no UserDoc-style owner. Pick produces a mapped type,
// which is what the toJSON transform in Event.ts accepts (not an interface).
export type EventDoc = Pick<Event, "id" | "title" | "date" | "location">;

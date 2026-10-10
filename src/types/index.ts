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

import { Schema, model } from "mongoose";
import type { RSVPDoc } from "../types/index";

const rsvpSchema = new Schema<RSVPDoc>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: String,
    required: [true, "eventId is required"],
    trim: true,
  },
  guestName: {
    type: String,
    required: [true, "guestName is required"],
    trim: true,
  },
  guestCount: {
    type: Number,
    required: [true, "guestCount is required"],
    min: [1, "guestCount must be at least 1"],
    max: [10, "guestCount must be at most 10"],
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "waitlisted"],
    default: "pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

rsvpSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const RSVPModel = model<RSVPDoc>("RSVP", rsvpSchema);

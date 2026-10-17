import { Schema, model } from "mongoose";
import type { EventDoc } from "../types/index";

// The third Session 1 interface, written a second time as a schema.
// Events are reference data -- nobody creates one through the app, so
// these are the only two routes in the project with no token check.
const eventSchema = new Schema<EventDoc>({
  // unique here is the reason GET /api/events/:id can use findOne and
  // be sure there is nothing else it could have matched.
  id: {
    type: String,
    required: [true, "id is required"],
    unique: true,
    trim: true,
  },

  title: { type: String, required: [true, "title is required"], trim: true },

  // An interface can say "a string". Only a schema can enforce that
  // it looks like a date, which is what date really is.
  date: { type: String, required: [true, "date is required"], trim: true },

  location: {
    type: String,
    required: [true, "location is required"],
    trim: true,
  },
});

// Event never had a numeric _id -- the string id field IS its identity
// -- so there is nothing to rename, and the two fields Mongo added are
// the only two that have to come out.
eventSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const EventModel = model<EventDoc>("Event", eventSchema);

import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { EventModel } from "./models/Event";
import { EVENTS } from "./data/events";

// npm run seed. Run it once after the database is created, and again
// after anything that empties it. Nothing else in the project writes
// an event.
async function seed() {
  await connectDB();

  for (const event of EVENTS) {
    // upsert: update the row with this id, or insert it if there is
    // none. Running this a second time leaves three events, not six.
    await EventModel.updateOne({ id: event.id }, event, { upsert: true });
  }

  console.log(`${EVENTS.length} events in ${mongoose.connection.name}`);

  // Without this the script never ends: the connection is an open
  // socket, and Node keeps running while one is still open.
  await mongoose.disconnect();
}

seed().catch((err: unknown) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

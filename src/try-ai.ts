// ===== SESSION 11: a NEW file =======================================
import "dotenv/config";
import { reviewProject } from "./ai/gemini";

// npm run try-ai. One real request to Gemini from your terminal --
// the same function POST /api/ai calls, with no Express, no token
// and no database. Run it once the key is in .env: if this prints a
// review, the key, the model name and the schema all work.
async function tryAi() {
  const review = await reviewProject(
    "A potluck dinner for our class on Nov 20 at the student lounge. " +
      "Attendees RSVP in the app with up to 3 guests. I still need to " +
      "confirm the room and decide who brings what.",
  );
  console.log(JSON.stringify(review, null, 2));
}

tryAi().catch((err: unknown) => {
  console.error("Gemini call failed:", err);
  process.exit(1);
});

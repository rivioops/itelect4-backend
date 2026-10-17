import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { authRouter } from "./routes/auth";
import { rsvpRouter } from "./routes/rsvps";
import { eventRouter } from "./routes/events";

export const app = express();

// ===== SESSION 9: one line, and every website on the internet was
//                  allowed to call this API =========================
// app.use(cors());
//
// NOTE: That was right for a laptop. Deployed, it means any page
//       anywhere can send a request with your user's token in it.
// ===== SESSION 10: only the origins this app is actually served from =

// One environment variable, comma-separated, so the list is different
// on your laptop and on Vercel without the code knowing which it is.
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter((origin) => origin !== "");

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json());

// ===== SESSION 10: the line that makes this work on Vercel ===========
// On your laptop, server.ts connects to MongoDB and only then starts
// listening, so a request cannot arrive before the connection exists.
// Deployed there is no server.ts step -- the app IS the function, and
// a request is the first thing that happens. So the waiting moves
// here, in front of every route.
app.use((_req: Request, _res: Response, next: NextFunction) => {
  connectDB().then(() => next()).catch(next);
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 });
});

app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.use("/api/rsvps", rsvpRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `No route for ${req.method} ${req.originalUrl}`,
  });
});

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
      return;
    }

    if (err instanceof mongoose.Error.CastError) {
      res.status(400).json({
        message: `"${err.value}" is not a valid id`,
      });
      return;
    }

    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  },
);

// Vercel looks for an Express app in six places, and src/app.ts is one
// of them. What it needs there is a default export -- that is the
// whole of the deployment configuration for this project, and it is
// why there is no vercel.json in this repo.
export default app;

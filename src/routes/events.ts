import { Router, type Request, type Response } from "express";
import { EventModel } from "../models/Event";

export const eventRouter = Router();

// There is no requireAuth line in this file, and that is the point.
// rsvps.ts puts one at the top so every route below it is private;
// the event list is what the app shows before anybody has logged in,
// so these two are public on purpose.

interface IdParam {
  id: string;
}

// GET /api/events
eventRouter.get("/", async (_req: Request, res: Response) => {
  const events = await EventModel.find().sort({ date: 1 });
  res.json(events);
});

// GET /api/events/:id
eventRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    // Session 7 asked json-server for /events?id=e1 and read matches[0],
    // because json-server has no route for a single row.
    // A real API can have one, so the frontend stops unwrapping an
    // array that only ever had one thing in it.
    const event = await EventModel.findOne({ id: req.params.id });

    if (!event) {
      res.status(404).json({
        message: `No event with id "${req.params.id}"`,
      });
      return;
    }

    res.json(event);
  },
);

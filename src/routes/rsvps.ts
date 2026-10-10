import { Router, type Request, type Response } from "express";
import { RSVPModel } from "../models/RSVP";
import { requireAuth } from "../middleware/auth";
import type { NewRSVPBody } from "../types/index";

export const rsvpRouter = Router();

rsvpRouter.use(requireAuth);

interface IdParam {
  id: string;
}

rsvpRouter.get("/", async (req: Request, res: Response) => {
  const rsvps = await RSVPModel.find({
    userId: req.userId,
  }).sort({ timestamp: -1 });
  res.json(rsvps);
});

rsvpRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const rsvp = await RSVPModel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!rsvp) {
      res.status(404).json({ message: "No RSVP with that id" });
      return;
    }

    res.json(rsvp);
  },
);

rsvpRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewRSVPBody>,
    res: Response,
  ) => {
    const rsvp = await RSVPModel.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(rsvp);
  },
);

rsvpRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewRSVPBody>>,
    res: Response,
  ) => {
    const rsvp = await RSVPModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!rsvp) {
      res.status(404).json({ message: "No RSVP with that id" });
      return;
    }

    res.json(rsvp);
  },
);

rsvpRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const rsvp = await RSVPModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!rsvp) {
      res.status(404).json({ message: "No RSVP with that id" });
      return;
    }

    res.status(204).send();
  },
);

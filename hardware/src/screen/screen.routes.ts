import { Express } from "express";
import { getScreenStatus } from "./screen.controller";

export function screenRoutes(app: Express) {
  app.get("/screen", getScreenStatus);
  return app;
}

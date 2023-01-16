import { Express } from "express";
import { screenRoutes } from "./screen/screen.routes";

export function applyRoutes(app: Express) {
  screenRoutes(app);
}

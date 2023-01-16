import { Request, Response } from "express";
import { setScreenBrightness } from "./screen.service";

export function getScreenStatus(req: Request, res: Response) {
    setScreenBrightness(0.5);
    console.log(0.5);
  res.send("Express + TypeScript Server");
}

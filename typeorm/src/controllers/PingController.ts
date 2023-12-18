import { Request, Response } from "express";

export class PingController {
  public static async pong(req: Request, res: Response) {
    console.log("pong");
    return res.json({
      status: true,
      message: "pong",
    });
  }
}

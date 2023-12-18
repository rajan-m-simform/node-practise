import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db";
import { User } from "../entity/User";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers["authorization"];
  let token = null;
  if (bearerToken) {
    token = bearerToken.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send({
      status: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    if (typeof decoded !== "string") {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: {
          id: decoded.user.id,
        },
      });
      if (!user) {
        throw "user not found";
      }
      req.body.auth = {
        bearerToken: token,
        user: user,
      };
    } else {
      throw "user not found";
    }
  } catch (err) {
    return res.status(401).send({
      status: false,
      message: "Invalid Token",
    });
  }
  return next();
};

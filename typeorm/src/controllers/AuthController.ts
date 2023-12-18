import { Request, Response } from "express";
import { User } from "../entity/User";
import { compare } from "bcryptjs";
import { AppDataSource } from "../db";
import jwt from "jsonwebtoken";

export class AuthController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOne({
      where: {
        email,
      },
      relations: {
        posts: true,
      },
    });

    if (findUser) {
      const passwordIsCorrect = await compare(password, findUser.password);
      if (passwordIsCorrect) {
        const token = await jwt.sign(
          { userId: findUser.id, user: findUser },
          "secret",
          {
            expiresIn: "10h",
          }
        );

        if (typeof token === "undefined") {
          throw "Could not create token";
        }

        return res.send({
          status: true,
          data: findUser,
          token,
        });
      }
    }
    return res.send({
      status: true,
    });
  }
}

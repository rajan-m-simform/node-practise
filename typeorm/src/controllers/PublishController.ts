import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Post } from "../entity/Post";
import { PublishRequest } from "../requests/PublishRequest";

export class PublishController {
  public static async publish(req: Request, res: Response) {
    const { status }: PublishRequest = req.body.validatedData;
    const { id } = req.body.validatedParamData;
    const { user } = req.body.auth;

    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (!post) {
      return res.send({
        status: false,
        message: "invalid post",
      });
    }

    post.published = status;
    postRepo.save(post);

    return res.send({
      status: true,
      data: post,
    });
  }

  public static async unpublish() {}
}

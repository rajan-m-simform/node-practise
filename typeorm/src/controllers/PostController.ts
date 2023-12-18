import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Post } from "../entity/Post";
import { CreatePostSchema } from "../requests/CreatePostSchema";

export class PostController {
  public static async index(req: Request, res: Response) {
    const { user } = req.body.auth;
    const postsRepo = await AppDataSource.getRepository(Post);

    const posts = await postsRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
      //   take: 10,
    });

    return res.send({
      status: true,
      data: posts,
    });
  }

  public static async store(req: Request, res: Response) {
    const { title, description }: CreatePostSchema = req.body.validatedData;

    const user = req.body.auth;
    const postsRepo = await AppDataSource.getRepository(Post);
    const post = new Post();
    post.title = title;
    post.description = description;
    post.user = user;
    await postsRepo.save(post);

    return res.send({
      status: true,
      data: post,
    });
  }

  public static async update(req: Request, res: Response) {
    const { title, description }: CreatePostSchema = req.body.validatedData;
    const { id }: any = req.params;
    const { user } = req.body.auth;

    const postsRepo = await AppDataSource.getRepository(Post);
    const post = await postsRepo.findOne({
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

    post.title = title;
    post.description = description;

    await postsRepo.save(post);

    return res.send({
      status: true,
      data: post,
    });
  }

  public static async delete(req: Request, res: Response) {
    const { id }: any = req.params;
    const { user } = req.body.auth;

    const postRepo = await AppDataSource.getRepository(Post);
    const count = await postRepo.softDelete({
      id: id,
      user: {
        id: user.id,
      },
    });

    if (!count.affected) {
      return res.send({
        status: false,
        message: "invalid post",
      });
    }

    return res.send({
      status: true,
      message: "post deleted successfully",
    });
  }
}

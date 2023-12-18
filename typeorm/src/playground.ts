import { AppDataSource } from "./db";
import { Post } from "./entity/Post";

(async () => {
  console.log("exc");

  const repository = await AppDataSource.getRepository(Post);
  //   await repository.createQueryBuilder("post").where({
  //     ""
  //   });
})();

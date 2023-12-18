import { DataSource } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { userCreateMigration1680083026253 } from "./migrations/1680083026253-user-create-migration";
import { postCreateMigration1680085153931 } from "./migrations/1680085153931-post-create-migration";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "blog-to",
  entities: [User, Post],
  migrations: [
    userCreateMigration1680083026253,
    postCreateMigration1680085153931,
  ],
  synchronize: false,
  logging: true,
  cache: true,
});

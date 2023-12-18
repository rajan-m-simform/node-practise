import "reflect-metadata";
import { Express } from "./providers/express";
import { Server } from "./providers/server";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const express = new Express();
Promise.all([express.initializeApp(), express.configureViews()]).then(() => {
  const app = express.app;
  const httpServer = new Server(app);
  httpServer.start();
  console.log("starting server");
});

process.on("uncaughtException", (err) => {
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.debug("SIGTERM signal received: closing HTTP server");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

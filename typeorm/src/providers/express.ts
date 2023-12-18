import express, { Application } from "express";
import "express-async-errors";
import helmet from "helmet";
import compression from "compression";
import apiRouter from "../routes";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "../db";

export class Express {
  app: Application;

  constructor() {
    this.app = express();
  }

  initializeApp = async () => {
    const port = 9002;
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
      })
    );
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.disable("x-powered-by");
    await AppDataSource.initialize();

    // error handler
    this.app.set("port", port);
  };

  configureViews = () => {
    this.app.set("view engine", "hbs");
    this.app.use("/", apiRouter);
  };

  configureLocale = (middleware: any, i18next: any) => {
    this.app.use(middleware.handle(i18next));
  };
}

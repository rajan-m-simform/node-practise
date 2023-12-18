import { Router } from "express";
import { PingController } from "../controllers/PingController";
import { verifyToken } from "../middlewares/auth";
import auth from "./auth";
import posts from "./posts";
//ROUTES IMPORT

const router = Router();

router.get("/", PingController.pong);

router.use("/auth", auth);

router.use("/posts", verifyToken, posts);
//ROUTERS USE ADD HERE
export default router;

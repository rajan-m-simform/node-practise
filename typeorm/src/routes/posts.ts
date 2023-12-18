import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { PublishController } from "../controllers/PublishController";
import {
  RequestParamValidator,
  RequestQueryValidator,
  RequestValidator,
} from "../middlewares/RequestValidator";
import { CreatePostSchema } from "../requests/CreatePostSchema";
import { IdSchema } from "../requests/IdSchema";
import { PublishRequest } from "../requests/PublishRequest";
//ROUTES IMPORT

const router = Router();

router.get("/", PostController.index);

router.post("/", RequestValidator(CreatePostSchema), PostController.store);

router.put(
  "/:id",
  RequestParamValidator(IdSchema),
  RequestValidator(CreatePostSchema),
  PostController.update
);

router.delete("/:id", RequestParamValidator(IdSchema), PostController.delete);

router.put(
  "/:id/publish",
  RequestParamValidator(IdSchema),
  RequestValidator(PublishRequest),
  PublishController.publish
);
//ROUTERS USE ADD HERE
export default router;

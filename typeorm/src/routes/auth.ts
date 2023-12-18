import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
//ROUTES IMPORT

const router = Router();

router.post("/login", AuthController.login);

//ROUTERS USE ADD HERE
export default router;

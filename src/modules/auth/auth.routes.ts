import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/signup", authController.signup.bind(authController));
router.post("/login", authController.login.bind(authController));

export default router;

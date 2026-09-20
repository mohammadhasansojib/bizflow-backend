import express from "express";
import { auth } from "../../middleware/auth.js";
import { validateRequest } from "../../middleware/zodValidation.js";
import authController from "./auth.controller.js";
import { UserLoginSchema, UserRegistrationSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/register", validateRequest(UserRegistrationSchema), authController.register);
router.post("/login", validateRequest(UserLoginSchema), authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);

router.get("/me", auth(), authController.getMe);

const authRoutes = router;
export default authRoutes;
import AuthController from "../controllers/authController.js";
import express from "express"

const router = express.Router();

router.post("/register", AuthController.userRegister)
router.post("/login", AuthController.login)
// router.post("/forgot-password", undefined)
// router.post("/reset-password", undefined)

export default router;
import express from "express";
import { register , login, logout, googleLogin} from "../controller/authController.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/google-login", googleLogin);
export default router;
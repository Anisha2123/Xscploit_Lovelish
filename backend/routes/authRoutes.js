
import { Router } from "express";

// const { signup, login } = require("../controllers/authController.js");
import authController from "../controllers.js/authController.js";

const { signup, login } = authController ;
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;

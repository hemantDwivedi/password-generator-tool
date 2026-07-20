import { Router } from "express";
import {
  generatePasswordApi,
  suggestPasswordApi,
  passwordStrengthApi,
} from "../controllers/passwordController.js";

const router = Router();

router.post("/", generatePasswordApi);
router.post("/suggest", suggestPasswordApi);
router.post("/verifier", passwordStrengthApi);

export default router;
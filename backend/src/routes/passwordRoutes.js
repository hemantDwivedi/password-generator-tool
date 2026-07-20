import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  generatePasswordApi,
  suggestPasswordApi,
  passwordStrengthApi,
} from "../controllers/passwordController.js";

const router = Router();

const passwordRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(passwordRateLimiter);

router.post("/", generatePasswordApi);
router.post("/suggest", suggestPasswordApi);
router.post("/verifier", passwordStrengthApi);

export default router;
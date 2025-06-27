// src/routes/ai.routes.js
import { aiLimiter } from "../middlewares/rateLimit.middlewares.js";
import { validateAIProcessing } from "../middlewares/validation.middlewares.js";

import express from "express";
import {
  generateTranscript,
  generateSummary,
  generateQuiz,
  generateChapters,
} from "../controllers/ai.controllers.js";

const router = express.Router();

router.post("/transcript/:videoId", aiLimiter, validateAIProcessing, generateTranscript);
router.post("/summary/:videoId", aiLimiter, validateAIProcessing, generateSummary);
router.post("/quiz/:videoId", aiLimiter, validateAIProcessing, generateQuiz);
router.post("/chapters/:videoId", aiLimiter, validateAIProcessing, generateChapters);


export default router;

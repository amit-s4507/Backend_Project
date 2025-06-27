import { Router } from 'express'

import {
  validateVideoUpload,
  validateVideoFile,
  validateThumbnail
} from "../middlewares/validation.middlewares.js";

import { uploadLimiter } from "../middlewares/rateLimit.middlewares.js";


import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    updateView
} from "../controllers/video.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"

const router = Router();

// ✅ Public: allow frontend to fetch videos without login
router.get("/", getAllVideos);

// 🔐 Protect the rest
router.use(verifyJWT);
router
   .route("/")
  .get(getAllVideos)
  .post(
    uploadLimiter,
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    validateVideoFile,
    validateThumbnail,
    validateVideoUpload,
    publishAVideo
  );

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);
router.route("/view/:videoId").patch(updateView);

export default router
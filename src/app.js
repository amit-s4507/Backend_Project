import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ✅ CORS config (for frontend connection + cookies)
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
};
app.use(cors(corsOptions));

// ✅ Body parser
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ✅ Static folder for public assets
app.use(express.static("public"));

// ✅ Parse cookies
app.use(cookieParser());

console.log("CORS Origin:", process.env.CORS_ORIGIN);

// ✅ Routes imports
import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import aboutRouter from "./routes/about.routes.js";
import aiRoutes from "./routes/ai.routes.js"; // ✅ Move here

// ✅ All route declarations after middleware
app.use("/api/v1/user", userRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/ai", aiRoutes); // ✅ AI features

export { app };

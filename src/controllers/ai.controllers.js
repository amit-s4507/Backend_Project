// src/controllers/ai.controllers.js
import { Video } from "../models/video.models.js";
import {
  getTranscript,
  getSummary,
  getQuiz,
  getChapters,
} from "../services/openai.service.js";

export const generateTranscript = async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json({ error: "Video not found" });

  const transcript = await getTranscript(video.title);
  video.transcript = transcript;
  await video.save();
  res.json({ transcript });
};

export const generateSummary = async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video || !video.transcript)
    return res.status(400).json({ error: "Transcript required" });

  const summary = await getSummary(video.transcript);
  video.summary = summary;
  await video.save();
  res.json({ summary });
};

export const generateQuiz = async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video || !video.transcript)
    return res.status(400).json({ error: "Transcript required" });

  const quiz = await getQuiz(video.transcript);
  video.quizzes = quiz;
  await video.save();
  res.json({ quizzes: quiz });
};

export const generateChapters = async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video || !video.transcript)
    return res.status(400).json({ error: "Transcript required" });

  const chapters = await getChapters(video.transcript);
  video.chapters = chapters;
  await video.save();
  res.json({ chapters });
};

// src/services/openai.service.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getTranscript = async (videoTitle) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Generate an educational transcript for the video titled "${videoTitle}".`,
      },
    ],
    max_tokens: 1000,
  });
  return response.choices[0].message.content;
};

export const getSummary = async (transcript) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Summarize this transcript into key points." },
      { role: "user", content: transcript },
    ],
    max_tokens: 300,
  });
  return response.choices[0].message.content;
};

export const getQuiz = async (transcript) => {
  const prompt = `
Generate 5 MCQs based on this content:
${transcript}
Format as JSON:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "string"
  }
]`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 800,
  });

  return JSON.parse(response.choices[0].message.content);
};

export const getChapters = async (transcript) => {
  const prompt = `
Split this transcript into 4–6 chapters with timestamps:
${transcript}
Format:
[
  {
    "title": "string",
    "timestamp": 0,
    "duration": 120
  }
]`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
  });

  return JSON.parse(response.choices[0].message.content);
};

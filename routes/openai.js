import express from "express";
import db from "../middlewares/db_conn.js";
import { AzureOpenAI } from "openai";
import env from "dotenv";
env.config();

const router = express.Router();

const client = new AzureOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  apiVersion: process.env.OPENAI_API_VERSION,
  endpoint: process.env.OPENAI_ENDPOINT,
  deployment: process.env.OPENAI_DEPLOYMENT,
});
const systemMessage = {
  role: "system",
  content: `You are a study assistant who processes text content related to any academic or study-related material. 
  You will extract key points from the given paragraphs and generate flashcard questions and answers. Try to make questions with single line answers, preferably 3-4 words
  The response should be in a JSON array format; it should strictly follow the format below:
  {
    "flashcards": [
      {
        "question": "What force acts on a projectile after launch?",
        "answer": "Gravity"
      },
      {
        "question": "What is air resistance's effect on projectile motion?",
        "answer": "Slows motion, alters trajectory"
      },
      {
        "question": "When is air resistance ignored in physics?",
        "answer": "Introductory physics"
      }
    ]
  }
  , containing the number of flashcards as specified by the user or a default number (5) 
  if not specified. Do not go outside the scope of the study-related material. 
  If ask anything else respond with a light apology message stating to provide a text. Use the following format for error message:
  {
    "error": "I'm sorry. Please provide a text for generating flashcards."
  }`,
};

router.post("/prompt", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [systemMessage, { role: "user", content: prompt }],
      response_format: {type: "json_object"}
    });

    const result = JSON.parse(chatCompletion.choices[0].message.content);

    if(result.error) {
        return res.json(result);
    }

    await insert_into_db(result.flashcards);
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

function insert_into_db(flashcards) {
    return new Promise((resolve, reject) => {
      const values = flashcards.map(card => [card.question, card.answer]);
      db.query('INSERT INTO flashcards (question, answer) VALUES ?', [values], (err, results) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }


export default router;
import axios from "axios";
import dotenv from "dotenv";
import pool from "../db/database.js";
import { SYSTEM_MESSAGE } from "../constants/prompt.js";

dotenv.config();

const insertIntoDB = async (question, answer) => {
    try {
        const result = await pool.query(
            "INSERT INTO flashcards (question, answer) VALUES ($1, $2) RETURNING *",
            [question, answer]
        );
        const newFlashcard = result.rows[0];
        return newFlashcard;
    } catch (error) {
        console.error("Error inserting into database:", error);
    }
};

export const generateFlashcards = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    try {
        const result = await axios.post("http://localhost:11434/api/chat", {
            model: process.env.LLM_MODEL,
            messages: [
                SYSTEM_MESSAGE,
                {
                    role: "user",
                    content: `Generate flashcards for the following text: ${prompt}`,
                },
            ],
            stream: false,
        });

        const flashcards = JSON.parse(result.data.message.content);

        if (flashcards.error || !Array.isArray(flashcards))
            res.status(400).json({
                error: "I'm sorry. Please provide a text for generating flashcards.",
            });

        const newFlashcards = [];
        for (const flashcard of flashcards) {
            const { question, answer } = flashcard;
            const newCard = await insertIntoDB(question, answer);
            newFlashcards.push(newCard);
        }

        res.status(200).json(newFlashcards);
    } catch (error) {
        console.error("Error generating flashcards:", error);
        res.status(404).send({ message: error.message });
    }
}
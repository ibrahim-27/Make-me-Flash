import pool from '../db/database.js';

export const getAllFlashcards = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM flashcards ORDER BY id DESC');
        const flashcards = result.rows;
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addFlashcard = async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ message: 'Question and answer are required' });
    }

    try {
        const result = await pool.query('INSERT INTO flashcards (question, answer) VALUES ($1, $2) RETURNING *', [question, answer])
        const newFlashcard = result.rows[0];
        res.status(201).json(newFlashcard);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteFlashcard = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query('DELETE FROM flashcards WHERE id = $1 RETURNING *', [id]);
        const deletedFlashcard = result.rows[0];
        res.status(200).json(deletedFlashcard);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
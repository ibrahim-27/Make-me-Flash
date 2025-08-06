import express from 'express';
import { getAllFlashcards, addFlashcard, deleteFlashcard } from '../controllers/flashcard.js';


const router = express.Router();

router.get('/', getAllFlashcards);
router.post('/', addFlashcard);
router.delete('/:id', deleteFlashcard);

export default router;
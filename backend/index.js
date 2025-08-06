import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import flashcardRoutes from './routes/flashcard.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/flashcards', flashcardRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

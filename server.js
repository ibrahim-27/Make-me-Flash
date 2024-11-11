import express from 'express';
import { engine } from 'express-handlebars';
import flashcard_router from './routes/flashcards.js';
import openai_router from './routes/openai.js';

const app = express();
const port = 3000;

app.engine('handlebars', engine());

app.use(express.static('./public'));

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cards", flashcard_router);
app.use("/ai", openai_router);


app.listen(port, ()=>{
    console.log("Server Started");
});
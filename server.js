import express from 'express';
import { engine } from 'express-handlebars';
import flashcard_router from './routes/flashcards.js';
import openai_router from './routes/openai.js';

const app = express();
const port = 3001;

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cards", flashcard_router);
app.use("/ai", openai_router);

app.get("/", (req, res) => {
    return res.send("try /cards");
})

app.listen(port, ()=>{
    console.log("Server Started");
});
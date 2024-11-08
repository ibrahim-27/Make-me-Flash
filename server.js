import express from 'express';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import flashcard_router from './routes/flashcards.js';
import db from './middlewares/db_conn.js';

const app = express();
const port = 3000;

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use("/cards", flashcard_router);


app.listen(port, ()=>{
    console.log("Server Started");
});
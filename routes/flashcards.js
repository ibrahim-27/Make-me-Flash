import express from 'express';
import db from '../middlewares/db_conn.js';

const router = express.Router();

router.get("/", (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if(!err)
            return res.render('home', { flashcards: results });

        console.error(err);
        res.status(500).send('Error connecting to MySQL database');
      });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    db.query(`SELECT * FROM flashcards WHERE id = ?`, [id], (err, results) => {
        if(!err)
            return res.json(results);
        console.error(err);
        res.status(500).send('Error connecting to MySQL database');
    });
})

router.post("/", (req, res) => {
    const {ques, ans} = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [ques, ans], (err, results) => {
        if(!err)
            return res.redirect('/cards');

        console.error(err);
        res.status(500).send(err);
    });
})

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {ques, ans} = req.body;
    db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [ques, ans, id], (err, results) => {
        if(!err)
            return res.redirect('/cards');

        console.error(err);
        res.status(500).send(err);
    });
})

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
        if(!err)
            return res.redirect('/cards');

        console.error(err);
        res.status(500).send('Error deleting flashcards');
      });
})

export default router;
const express = require('express');
const { getTopics, getArticles, getArticleById } = require('../controllers/controllers.ncnews');
const app = express();

app.use(express.json());

//Endpoints
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);

//Patchpoints

//Error handling middleware
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ message: 'Bad request' });
    }  else {
        next(err);
    }
});
app.use((err, req, res, next) => {
    if (err.message !== undefined) {
        res.status(err.status).send({ message: err.message });
    }   else {
        next(err);
    }
});
app.use((err, req, res, next) => { 
console.log(err);
res.sendStatus(500);
});


module.exports = app;
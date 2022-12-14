const express = require('express');
const { getTopics, getArticles } = require('../controllers/controllers.ncnews');
const app = express();

//Endpoints
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);

//Error handling middleware
app.use((err, req, res, next) => {
    
})
app.use((err, req, res, next) => { 
console.log(err);
res.sendStatus(500);
});


module.exports = app;
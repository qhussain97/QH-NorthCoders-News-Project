const express = require('express');
const { getTopics, getArticles, getArticleById, getCommentsForArticleId, addComment, patchVotesInArticle  } = require('../controllers/controllers.ncnews');
const { insertComment } = require('../models/models');
const app = express();
const { handleCustomErrors, handleSqlErrors, handle404Errors, handle500s } = require('../errorHandlers');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Endpoints
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getCommentsForArticleId)

//POST Points 
app.post('/api/articles/:article_id/comments', addComment)
//Patchpoints
app.patch('/api/articles/:article_id', patchVotesInArticle)

//Error handling middleware
app.use(handleSqlErrors);
app.use(handleCustomErrors);
app.use('*', handle404Errors);
app.use(handle500s);

module.exports = app;
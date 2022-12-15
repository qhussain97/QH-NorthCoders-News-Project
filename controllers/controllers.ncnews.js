const comments = require('../db/data/test-data/comments');
const { selectTopics, selectArticles, selectArticleById, selectCommentsForArticleId } = require('../models/models');

//GET requests
exports.getTopics= (req, res) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics });
    });
}

exports.getArticles = (req, res) => {
    selectArticles().then((articles) => {
        res.status(200).send({ articles });
    })
}

exports.getArticleById = (req, res, next) => {
    const article_id = req.params.article_id;
    selectArticleById(article_id)
        .then((article) => {
            res.status(200).send({ article })
        })
        .catch((err) => {
            next(err);
        });
}

exports.getCommentsForArticleId = (req, res, next) => {
    const article_id = req.params.article_id;
    selectCommentsForArticleId(article_id)
        .then((comments) => {
            res.status(200).send({ comments })
        })
        .catch((err) => {
            next(err);
        })
}
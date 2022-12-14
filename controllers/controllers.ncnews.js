const { selectTopics, selectArticles, selectArticleById } = require('../models/models');

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
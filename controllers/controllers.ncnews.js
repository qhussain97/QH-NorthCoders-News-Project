const comments = require('../db/data/test-data/comments');
const { selectTopics, selectArticles, selectArticleById, selectCommentsForArticleId, insertComment, updateVotesInArticles } = require('../models/models');

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
    const promises = [selectArticleById(article_id), selectCommentsForArticleId(article_id)]
    Promise.all(promises)
        .then((results) => {
            res.status(200).send({ comments: results[1] })
        })
        .catch((err) => {
            next(err);
        })
}

//POST 
exports.addComment = (req, res, next) => {
    const article_id = req.params.article_id;
    const body = req.body.body;
    const username = req.body.username;
    insertComment(article_id, body, username)
        .then((comment) => 
            res.status(201).send({ comment }))
        .catch((err) => {
            next(err)
        })
};

//Patch

exports.patchVotesInArticle = (req, res, next) => {
    const article_id = req.params.article_id
    const inc_votes = req.body.inc_votes
    Promise.all([selectArticleById(article_id), updateVotesInArticles(inc_votes, article_id)]).then((resolvedPromises) => {
        res.status(200).send( {updatesVotes: resolvedPromises[1][0]});
    })
    .catch((err) => {
        next(err)
    })
}
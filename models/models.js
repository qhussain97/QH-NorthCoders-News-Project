const db = require('../db/connection');

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics;")
        .then((result) => {
            return result.rows;
        });
}

exports.selectArticles = () => {
    return db.query(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count FROM articles
        LEFT OUTER JOIN comments 
        ON comments.article_id = articles.article_id
        GROUP BY  articles.article_id
        ORDER BY created_at DESC;`)
        .then((result) => {
            return result.rows;
        })
}
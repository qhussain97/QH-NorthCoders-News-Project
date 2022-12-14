const db = require('../db/connection');

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics;")
        .then((result) => {
            return result.rows;
        });
};

exports.selectArticles = () => {
    return db.query(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count FROM articles
        LEFT OUTER JOIN comments 
        ON comments.article_id = articles.article_id
        GROUP BY  articles.article_id
        ORDER BY created_at DESC;`)
        .then((result) => {
            return result.rows;
        });
};

exports.selectArticleById = (article_id) => {
    const queryString = `
        SELECT * FROM articles
        WHERE article_id = $1`;
    return db.query(queryString, [article_id])
        .then((results) => {
            if (results.rowCount === 0) {
                return Promise.reject({ status: 404, message: 'Article not found' });
        }
    return results.rows[0];
});
}
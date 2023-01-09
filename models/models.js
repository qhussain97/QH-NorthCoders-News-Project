const db = require('../db/connection');
const comments = require('../db/data/test-data/comments');

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
};

exports.selectCommentsForArticleId = (article_id) => {
    let queryString = `
        SELECT comments.comment_id, comments.body, comments.votes, comments.created_at, comments.author
        FROM comments
        WHERE article_id = $1
        ORDER BY comments.created_at DESC`;
    return db.query(queryString, [article_id])
        .then((results) => {
            if (results.rowCount === 0) {
                return Promise.reject({ status: 404, message: 'Comments not found' });
            }
    return results.rows;
});
};

exports.insertComment = (article_id, body, username) => {
    if (typeof(username) !== "string" || typeof(body) !== "string") {
        return Promise.reject({ status: 400, message: 'Bad Request' })
    }
    return db
        .query(
            `INSERT INTO comments (article_id, author, body) 
            VALUES ($1, $2, $3) 
            RETURNING *;`, [article_id, username, body ])
        .then(({ rows }) =>  
       { return rows[0] })
}

exports.updateVotesInArticles = (inc_votes, article_id) => {

    return db
        .query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`, [inc_votes, article_id])
        .then((result) => {
            return result.rows
        })
}
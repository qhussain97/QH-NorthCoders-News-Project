const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

const request = require('supertest');
const app = require('../db/app');
const topics = require('../db/data/test-data/topics');

beforeEach(()=> {
    return seed(testData)
});
afterAll(()=> {
    return db.end()
});

describe('GET /api/topics', () =>{
    test('status:200, responds with an array of topics', () =>{
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
            expect(topics).toHaveLength(3);
            topics.forEach((topic) => {
                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String),
                });
            });
        });
    });
});

describe('GET /api/articles', () =>{
    test('status:200, responds with an array of articles and relevant properties', () =>{
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles } }) => {
            expect(articles).toHaveLength(12);
            articles.forEach((article) => {
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String),
                });
            });
        });
    });

describe('GET /api/articles/:article_id', () => {
    test('status: 200, responds with correct article', () => {
        return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then((response) => {
            const article =  response.body.article;
            expect(article).toEqual({
                article_id: 3,
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                author: "icellusedkars",
                body: "some gifs",
                created_at: "2020-11-03T09:12:00.000Z",
                votes: 0,
            })
        })
    });
    test('status 400: responds with invalid article id', () => {
        return request(app)
        .get('/api/articles/bananas')
        .expect(400)
        .then((response) => {
            const message = response.body.message;
            expect(message).toBe("Bad request")
        })
    });
    test('status 404: responds with valid, but non existent article_id', () => {
        return request(app)
        .get('/api/articles/24')
        .expect(404)
        .then((response) => {
            const message = response.body.message;
            expect(message).toBe('Article not found');
        });
    })
})
});

















// describe('GET /api/articles/:article_id/comments', () => {
//     test('status: 200, responds with an array of comments for the given article_id', () => {
//         return request(app)
//         .get('/api/articles/3/comments')
//         .expect(200)
//         .then((response) => {
//             const comments = response.body.article.comments
//             const commentsArray = [[comment_id = 10,
//                                     body = "git push origin master", 
//                                     article_id = 3,
//                                     author = icellusedkars,
//                                     votes = 0,
//                                     created_at = "2020-06-20 08:24:00 +0000"],
//                                     [comment_id = 11,
//                                     body = "Ambidextrous marsupial", 
//                                     article_id = 3,
//                                     author = icellusedkars,
//                                     votes = 0,
//                                     created_at = "2020-09-20 00:10:00 +0000"]];
//             expect(comments).toEqual(commentsArray)
//   })
// })
// })



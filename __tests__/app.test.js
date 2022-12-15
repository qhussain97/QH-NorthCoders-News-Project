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

describe('GET /api.articles/:article_id/comments', () => {
    test('status 200: responds with an array of comments for given article_id', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
        .then((response) => {
            const comments = response.body.comments;
            expect(comments).toHaveLength(2)
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                })
            })
        })
    })
    test('status 400: responds with invalid article_id', () => {
        return request(app)
        .get('/api/articles/bananas/comments')
        .expect(400)
        .then((response) => {
            const message = response.body.message;
            expect(message).toBe("Bad request")
        })
    })
    test('status 404: article does not exist, so no comments', () => {
        return request(app)
        .get('/api/articles/5737/comments')
        .expect(404)
        .then((response) => {
            const message = response.body.message;
            expect(message).toBe('Article not found')
        })
    })
    test('status 200: article does exist, but has no comments', () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then((response) => {
            const comments = response.body.comments;
            expect(comments).toHaveLength(0)
            comments.forEach((comment) => {
                expect(comment).toEqual([])
        })
    })
})
})
})
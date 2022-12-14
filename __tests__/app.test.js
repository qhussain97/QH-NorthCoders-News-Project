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
});



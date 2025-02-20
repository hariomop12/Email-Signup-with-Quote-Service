const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {
  test('POST /api/v1/users/signup - success', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@example.com'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });
});
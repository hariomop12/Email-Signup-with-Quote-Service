const request = require('supertest');
const app = require('../app');
const pool = require('../config/db');

describe('User API Endpoints', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(0); // Use port 0 to get a random available port
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
    await pool.end(); // Close database connections
  });

  describe('POST /api/v1/users/signup', () => {
    test('should create a new user', async () => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      const res = await request(app)
        .post('/api/v1/users/signup')
        .send({
          email: uniqueEmail
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
    });

    test('should not create a user with invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'invalid-email'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
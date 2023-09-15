const request = require('supertest');
const app = require('../../src/routes');

let token = '';

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/sign-in')
    .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
    .send({
      identity: 'test-user@example.com',
      password: '!@MyStrongPassword',
    });

  token = response.body.token;
});

describe('Authenticated user allowed access to resources', () => {
  test('Get the list of users: /users', () =>
    request(app)
      .get('/users')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .set('Authorization', `Bearer ${token}`)
      .expect(200));

  test('Get user profile: /users/profile', () =>
    request(app)
      .get('/users/profile')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .set('Authorization', `Bearer ${token}`)
      .expect(200));
});

describe('Unauthenticated user denied access to resources', () => {
  test('Attempt without bearer token', () =>
    request(app)
      .get('/users')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .expect(401));

  test('Attempt with an empty bearer token', () =>
    request(app)
      .get('/users')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .set('Authorization', '')
      .expect(401));

  test('Attempt with an invalid bearer token', () =>
    request(app)
      .get('/users')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .set('Authorization', 'Bearer INVALID')
      .expect(401));
});

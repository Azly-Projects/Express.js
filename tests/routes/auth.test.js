const request = require('supertest');
const app = require('../../src/routes');
const models = require('../../src/models');

let database;

beforeAll(async () => {
  database = await models.sequelize.sync({ force: true });
});

afterAll(() => {
  database.close();
});

describe('Sign up route: /auth/sign-up', () => {
  it('should get validation error (400: Bad Request)', () =>
    request(app)
      .post('/auth/sign-up')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .expect(400));

  it('should get validation passed (200:OK)', () =>
    request(app)
      .post('/auth/sign-up')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .send({
        email: 'test-user@example.com',
        password: '!@MyStrongPassword#',
        full_name: 'Agung Dirgantara',
      })
      .expect(200));
});

describe('Sign in route: /auth/sign-in', () => {
  it('should get validation error (400: Bad Request)', () =>
    request(app)
      .post('/auth/sign-in')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .expect(400));

  it('should get validation passed (200:OK)', () =>
    request(app)
      .post('/auth/sign-in')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .send({
        identity: 'test-user@example.com',
        password: '!@MyStrongPassword#',
      })
      .expect(200));
});

describe('Allow invalid or empty auth bearer inside the auth route', () => {
  test('Using an empty auth bearer will still result in a 200 response', () =>
    request(app)
      .post('/auth/sign-in')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .set('Authorization', '')
      .send({
        identity: 'test-user@example.com',
        password: '!@MyStrongPassword',
      })
      .expect(200));

  test('Using an invalid auth bearer will still result in a 200 response', () =>
    request(app)
      .post('/auth/sign-in')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .set('Authorization', 'x')
      .send({
        identity: 'test-user@example.com',
        password: '!@MyStrongPassword',
      })
      .expect(200));
});

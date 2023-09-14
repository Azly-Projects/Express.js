const request = require('supertest');
const app = require('../../src/routes');

describe('Sign up route: /auth/sign-up', () => {
  it('Signing up with incomplete data will result in a 400 validation error', () => request(app)
    .post('/auth/sign-up')
    .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
    .expect(400));

  it('Signing up with complete and valid data will result in a 200 validation passed', () => request(app)
    .post('/auth/sign-up')
    .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
    .send({ email: 'test-user@example.com', password: '!@MyStrongPassword', full_name: 'Agung Dirgantara' })
    .expect(200));
});

describe('Sign in route: /auth/sign-in', () => {
  it('Signing in with incomplete data will result in a 400 validation error', () => request(app)
    .post('/auth/sign-in')
    .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
    .expect(400));

  it('Signing in with complete and valid data will result in a 200 validation passed', () => request(app)
    .post('/auth/sign-in')
    .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
    .send({
      identity: 'test-user@example.com',
      password: '!@MyStrongPassword',
    })
    .expect(200));
});

describe('Allow invalid or empty auth bearer inside the auth route', () => {
  test('Using an empty auth bearer will still result in a 200 response', () => request(app)
    .post('/auth/sign-in')
    .set('Content-Type', 'application/json')
    .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
    .set('Authorization', '')
    .send({
      identity: 'test-user@example.com',
      password: '!@MyStrongPassword',
    })
    .expect(200));

  test('Using an invalid auth bearer will still result in a 200 response', () => request(app)
    .post('/auth/sign-in')
    .set('Content-Type', 'application/json')
    .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
    .set('Authorization', 'x')
    .send({
      identity: 'test-user@example.com',
      password: '!@MyStrongPassword',
    })
    .expect(200));
});

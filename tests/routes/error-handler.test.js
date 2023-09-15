const request = require('supertest');
const { v4 } = require('uuid');
const app = require('../../src/routes');

describe('Error Handler Tests', () => {
  describe('APIKey authentication enabled', () => {
    test('Getting a resource without an APIKey will result in a 401 response', () =>
      request(app).get('/').expect(401));

    test('Getting a resource with an invalid APIKey will result in a 401 response', () =>
      request(app).get('/').set(process.env.API_KEY_NAME, v4()).expect(401));

    test('Getting a resource with a valid APIKey will result in a 200 response', () =>
      request(app)
        .get('/')
        .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
        .expect(200));
  });

  describe('APIKey authentication disabled', () => {
    beforeEach(() => {
      process.env.API_KEY_AUTH = false;
    });

    afterEach(() => {
      process.env.API_KEY_AUTH = true;
    });

    test('Getting a resource without an APIKey will result in a 200 response', () =>
      request(app).get('/').expect(200));
  });

  test('Sending any valid JSON', () =>
    request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .send('{"any": "valid"}')
      .expect(200));

  test('Sending invalid JSON will result in a 400 response', () =>
    request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .send('{"x": "x" HERE INVALID JSON}')
      .expect(400));

  test('Accessing an unknown route will result in a 404 response', () =>
    request(app)
      .get('/undefined-route')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .expect(404));

  test('Unknown instanceof Error will result in a 500 response', () =>
    request(app)
      .put('/')
      .set(process.env.API_KEY_NAME, process.env.API_KEY_PASS)
      .expect(500));
});

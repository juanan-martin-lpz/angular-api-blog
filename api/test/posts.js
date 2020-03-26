let mongoose = require('mongoose');

let Users = require('../models/user');
let Posts = require('../models/post');
let Comments = require('../models/comment');

let chai = require('chai');
let chaiHttp = require('chai-http');

let request = require('supertest');
let server = require('../app.js');

let host = 'http://localhost:3000/api/v1/post';
let users = 'http://localhost:3000/api/v1/users';
let should = chai.should();

chai.use(chaiHttp);

async function createUser() {
  await request('http://localhost:3000')
    .post('/signup')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ name: 'postuser', password: 'postuser', firstName: 'Default', lastName: 'Default' });
}

async function login() {
  var result = await request('http://localhost:3000')
    .post('/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ name: 'postuser', password: 'postuser' });

  var data = result.text;
  return JSON.parse(data);
}

describe('Posts', () => {
  before(createUser);

  after(async () => {
    var data = {};
    data = await login();
    token = data.token;

    await chai
      .request(host)
      .post('/deleteall')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ token: token });

    await chai
      .request(users)
      .post('/deleteall')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ token: token });
  });

  /*
   * Test /POST /api/v1/post
   */
  describe('/POST /newpost', () => {
    it('Deberia crear un nuevo post', async () => {
      var data = {};
      data = await login();

      token = data.token;
      user = data.user;

      chai
        .request(host)
        .post('/newpost')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ token: token, user: user, content: 'Test Post' })
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });

  /*
   * Test /GET /api/v1/post/
   */
  describe('/GET /', () => {
    it('Deberia crear un nuevo post', async () => {
      var data = {};
      data = await login();

      token = data.token;
      user = data.user;

      chai
        .request(host)
        .post('/newpost')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ token: token, user: user, content: 'Test Post' })
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });
});

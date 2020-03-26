let mongoose = require('mongoose');
let Users = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

let host = 'http://localhost:3000';
let should = chai.should();

chai.use(chaiHttp);

describe('Usuarios', () => {
  /*
   * Test /POST signup
   */
  describe('/POST signup', () => {
    it('Deberia registrar un nuevo usuario', done => {
      chai
        .request(host)
        .post('/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name: 'default', password: 'default' })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test /POST login
   */

  describe('/POST login', () => {
    it('Deberia loguearse y retornar un token', done => {
      chai
        .request(host)
        .post('/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name: 'default', password: 'default' })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

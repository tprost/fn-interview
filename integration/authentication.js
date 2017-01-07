'use strict';

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var models = require('../app/models/index.js');
var sequelize = models.sequelize;
var User = sequelize.User;

//Require the dev-dependencies
var chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

var authenticationController = require('../app/controllers/authentication.controller.js');

//Our parent block
describe('Authentication', function() {
  beforeEach((done) => { //Before each test we empty the database
    User.destroy({
      where: {
        // criteria
      }
    }).then(function() {
      return User.create({
        username: "bob",
        password: "password"
      });
    }).then(function (user) {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe('signing in', () => {

    it('it should GET /', function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          res.should.have.status(200);
          // res.body.should.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should work with the right credentials', function(done) {
      var agent = chai.request.agent(app);
      agent
        .post('/api/login')
        .send({
          username: "bob",
          password: "password"
        })
        .then(function(res) {
          res.should.have.status(200);
          // expect(res).to.have.cookie('connect.sid');
          return agent
            .get('/api/me')
            .then(function(res) {
              res.should.have.status(200);
              expect(res.body.username).to.equal("bob");
              done();
            })
            .catch(function (err) {
              done(err);
            });
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('logging out', function(done) {
      var agent = chai.request.agent(app);
      agent
        .post('/api/login')
        .send({
          username: "bob",
          password: "password"
        })
        .then(function(res) {
          res.should.have.status(200);
          return agent
            .get('/api/logout')
            .then(function(res) {
              res.should.have.status(200);

              done();
            })
            .catch(function (err) {
              done(err);
            });
        })
        .catch(function (err) {
          done(err);
        });
    });

  });


  after(function() {
    app.server.close();
  });
});

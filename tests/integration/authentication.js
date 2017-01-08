'use strict';

var models = require('../../app/models/index.js');
var sequelize = models.sequelize;
var User = models.User;

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;

var app = require('../../app');

//Our parent block
describe('Authentication', function() {

  describe('signing in', function() {

    it('it should GET /', function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          res.should.have.status(200);
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



});

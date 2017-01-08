'use strict';


var models = require('../../app/models/index.js');
var User = models.User;
var Photo = models.Photo;

var app = require('../../app');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

//Our parent block
describe('Authentication', function() {

  var agent;

  beforeEach(function(done) {
    agent = chai.request.agent(app);
    agent
      .post('/api/login')
      .send({
        username: "bob",
        password: "password"
      })
      .then(function() {
        done();
      })
      .catch(function(error) {
        done(error);
      });
  });

  describe('/api/me/photos', function() {
    it("should get photos", function() {
      // agent.get('/api/me/photos')
      //   .then(function(res) {
      //     console.log(res);
      //     done();
      //   })
      //   .catch(function(error) {
      //     done(error);
      //   });
    });
  });

});

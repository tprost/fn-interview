'use strict';

var path = require('path');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var models = global.models;
var User = models.User;
var Photo = models.Photo;
var app = global.app;
chai.use(chaiHttp);


describe('/api/me/photos', function() {

  describe('CREATE', function() {

    describe('when logged in', function() {

      var agent = chai.request.agent(app);

      beforeEach(function(done) {
        agent.post('/api/login')
          .send({
            username: "bob",
            password: "password"
          })
          .then(function() {
            done();
          });
      });

      it("should create a photo", function(done) {
        agent.post('/api/me/photos')
          .send({
            url: "http://placehold.it/100x100",
            title: "Test Image",
            public: false
          })
          .then(function(res) {
            res.should.have.status(200);
            done();
          })
          .catch(function(error) {
            done(error);
          });
      });

    });

    describe('when logged out', function() {

      var agent = chai.request.agent(app);

      it("should produce 401", function(done) {
        agent.post('/api/me/photos')
          .send({
            url: "http://placehold.it/100x100",
            title: "Test Image",
            public: false
          })
          .end(function(error, res) {
            res.should.have.status(401);
            done();
          });
      });
    });


  });

});

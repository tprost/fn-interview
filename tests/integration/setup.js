'use strict';

var models = require('../../app/models/index.js');
var User = models.User;
var Photo = models.Photo;
var chai = require('chai');
var chaiHttp = require('chai-http');

var app;

before(function(done) {
  //During the test the env variable is set to test
  process.env.NODE_ENV = 'test';
  app = require('../../app');
  chai.use(chaiHttp);
  models.sequelize.sync().then(function() {
    done();
  });
});

beforeEach(function(done) {
  User.destroy({
    where: {
      // all
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

after(function() {
  app.server.close();
});

'use strict';

var models = global.models;
var app = global.app;
var User = models.User;
var Photo = models.Photo;

var chai = require('chai');
var chaiHttp = require('chai-http');

before(function(done) {
  chai.use(chaiHttp);
  models.sequelize.sync().then(function() {
    done();
  });
});

beforeEach(function(done) {
  Photo.drop().then(function() {
    return User.drop();
  }).then(function() {
    return models.sequelize.sync();
  }).then(function() {
    done();
  });
});

beforeEach(function(done) {
  User.create({
    username: "bob",
    password: "password"
  }).then(function() {
    done();
  });
});

after(function() {
  app.server.close();
});

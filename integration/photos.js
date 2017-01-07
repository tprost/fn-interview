'use strict';

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var User = require('../app/models/index.js').User;
var Photo = require('../app/models/index.js').Photo;

//Require the dev-dependencies
var chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let expect = chai.expect;

chai.use(chaiHttp);

//Our parent block
describe('Authentication', function() {
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


  after(function() {
    app.server.close();
  });
});

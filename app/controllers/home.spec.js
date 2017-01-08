'use strict';

// var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var chai = require('chai');
var expect = chai.expect;

var models = require('../models/index.js');
var User = models.User;

describe('home controller', function() {

  beforeEach(function(done) {
    User.drop()
      .then(function() {
        return models.sequelize.sync();
      })
      .then(function() {
        done();
      });
  });

  beforeEach(function() {
    this.controller = require('./home.js');
  });

  it('all', function(done) {
    var response = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    var request  = httpMocks.createRequest({
      method: 'GET',
      url: '/'
    });

    response.on('render', function() {
      expect(response._getRenderView()).to.equal("public-home");
      done();
    });

    this.controller.home(request, response);
  });

});

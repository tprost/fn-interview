'use strict';

var models = require('./index.js');
var User = models.User;

describe("User", function() {
  beforeEach(function(done) {
    User.drop()
      .then(function() {
        return models.sequelize.sync();
      })
      .then(function() {
        done();
      });
  });

  it("does things", function(done) {

    User.create({
      first_name: "Bob",
      last_name: "Ross"
    }).then(function() {
      done();
    });

  });

});

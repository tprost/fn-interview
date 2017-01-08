var app;

module.exports = {
  waitForConditionTimeout: 10000,

  // External before hook is ran at the beginning of the tests run, before creating the Selenium session
  before: function(done) {
    app = require('../../../app.js');
    done();
  },

  // External after hook is ran at the very end of the tests run, after closing the Selenium session
  after: function(done) {
    app.server.close();
    done();
  },

  // This will be run before each test suite is started
  beforeEach: function(browser, done) {
    // getting the session info
    browser.status(function(result) {
      done();
    });
  },

  // This will be run after each test suite is finished
  afterEach: function(browser, done) {
    done();
  }
};

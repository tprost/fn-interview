'use strict';

var nightwatch = require('nightwatch');

module.exports = {

  'logging in': function (client) {
    client.url(client.launch_url)
      .waitForElementVisible('body')
      .setValue('input[type=text]#username', 'bob')
      .setValue('input[type=password]#password', 'password')
      .click('#login-button')
      .pause(1000)
      .waitForElementVisible('main')
      .assert.containsText('main', "You're logged in!")
      .end();
  },

  'logging out': function (client) {
    client.url(client.launch_url)
      .waitForElementVisible('body')
      .setValue('input[type=text]#username', 'bob')
      .setValue('input[type=password]#password', 'password')
      .click('#login-button')
      .pause(1000)
      .waitForElementVisible('main')
      .assert.containsText('main', "You're logged in!")
      .click('#logout-button')
      .pause(1000)
      .assert.elementPresent('#login-button')
      .end();
  }



};

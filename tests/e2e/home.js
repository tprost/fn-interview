'use strict';

var nightwatch = require('nightwatch');

module.exports = {

  'page title': function (client) {
    client
      .url(client.launch_url)
      .waitForElementVisible('body')
      .assert.title('Photo App')
      .end();
  }



};

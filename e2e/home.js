'use strict';

module.exports = {

  'Contents test' : function (client) {
    client
      .url(client.launch_url)
      .waitForElementVisible('body', 1000)
      .assert.title('sean-boilerplate')
      .end();
  }

};

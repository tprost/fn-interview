var home = require('../controllers/home.js');

module.exports = function(app) {
  app.route('/').get(home.home);
  app.route('/index.html').get(home.home);
};


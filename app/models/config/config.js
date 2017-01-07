'use strict';

var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    console.warn('using `development` NODE_ENV');
    return 'development';
  }
  return process.env[name];
}

var all = {
  env: requiredProcessEnv("NODE_ENV")
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + all.env + '.js') || {});

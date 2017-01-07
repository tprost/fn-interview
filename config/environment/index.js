var _ = require('lodash');

var environment = require('./default.js');

environment = _.merge(environment,
  require('./' + process.env.NODE_ENV + '.js'));

module.exports = environment;

'use strict';

var _ = require('lodash');

if (!process.env.NODE_ENV) {
  console.warn("NODE_ENV not set... using NODE_ENV=development");
  process.env.NODE_ENV = 'development';
}

var config = {};
_.merge(config, require('./environment'));
config.db = require('./db');

module.exports = config;

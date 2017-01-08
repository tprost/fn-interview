'use strict';

if (!process.env.NODE_ENV) {
  console.warn("NODE_ENV not set... using NODE_ENV=development");
  process.env.NODE_ENV = 'development';
}

module.exports = require('./' + process.env.NODE_ENV + '.js');

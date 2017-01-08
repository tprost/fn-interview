'use strict';

module.exports = {
  database: process.env.DBNAME || 'fn-interview-test',
  storage: "./db.test.sqlite",
  username : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  host : process.env.DBHOST || 'localhost',
  logging: false,
  dialect: "sqlite",
  port : 5433
};

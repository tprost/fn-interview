'use strict';

var db = require('./index.js');

db.User.create({
  username: "taylor",
  password: "qweqwe"
});

db.User.create({
  username: "simon",
  password: "qweqwe"
});

db.User.create({
  username: "ali",
  password: "qweqwe"
});

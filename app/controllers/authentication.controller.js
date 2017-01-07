'use strict';

var passport = require('passport');
var db = require('../models/index.js');

exports.login = passport.authenticate('local', {session: true, successRedirect: '/'});

exports.signupWithUsernameAndPassword = function(req, res) {
  db.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(existingUser) {
    if (existingUser) {
      return res.status(409).send({
        message: 'Username is already taken'
      });
    }
    return db.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(function (user) {
      res.send({
        token: "yay"
      });
    }).catch(function (err) {
      return res.status(400).send({
        message: err
      });
    });
  }).catch(function(err) {
    return res.status(401).send({
      message: err
    });
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.ensureAuthenticated =
  passport.authenticate('local');

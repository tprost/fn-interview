'use strict';

var _ = require('lodash');
var path = require('path');
var request = require('request');
var db = require('../models');

exports.currentUser = function(req, res) {
  var user = req.user;
  if (user) {
    db.User.findOne({
      where: {
        id: user.dataValues.id
      }
    }).then(function(user, error) {
      res.json(user.dataValues);
    }).catch(function(err) {
      return res.status(401).send({
        message: err
      });
    });
  } else {
    res.status(401).json({
      message: "You have not been authorized."
    });
  }
};

exports.updateUser = function(req, res) {
  return db.User.findById(req.user).then(function(user) {
    if (!user) {
      return res.status(400).send({
        message: 'User Not Found'
      });
    }
    user.email = req.body.email || user.email;
    return user.save().then(function () {
      res.status(200).end();
    }).catch(function(err) {
      return res.status(401).send({
        message: err
      });
    });
  }).catch(function(err) {
    return res.status(401).send({
      message: err
    });
  });
};

exports.updatePassword = function(req, res) {
  db.User.findById(req.user).then(function (user) {
    user.comparePassword(req.body.oldPassword, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({
          message: 'Password Invalid'
        });
      }
      user.password = req.body.newPassword;
      return user.save().then(function () {
        res.status(200).end();
      }).catch(function (err) {
        return res.status(401).send({
          message: err
        });
      });
    });
  }).catch(function (err) {
    return res.status(401).send({
      message: err
    });
  });
};

exports.deleteAccount = function(req, res) {
  db.User.findById(req.user).then(function (user) {
    user.destroy().then(function () {
      res.status(200).end();
    }).catch(function (err) {
      return res.status(401).send({
        message: err
      });
    });
  }).catch(function (err) {
    return res.status(401).send({
      message: err
    });
  });
};

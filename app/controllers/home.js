var models  = require('../models');
var express = require('express');

module.exports = {
  home: function (req, res) {
    models.User.findAll().then(function(users) {
      res.render('index', {
        title: "blah",
        users: users
      });
    });
  }
};

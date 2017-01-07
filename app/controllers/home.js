var models = require('../models/index.js');
var express = require('express');

module.exports = {
  home: function (req, res) {

    res.render('index', {
      title: "blah",
      user: req.user,
      bam: req.user ? "hello" : "goodbye"
    });
  }
};

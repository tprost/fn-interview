var models = require('../models/index.js');
var express = require('express');
var Photo = models.Photo;

module.exports = {
  home: function (req, res) {

    Photo.findAll({
      where: {
        public: true
      }
    }).then(function(photos) {
      res.render('index', {
        title: "blah",
        user: req.user,
        bam: req.user ? "hello" : "goodbye",
        photos: photos
      });
    });

  }
};

var models = require('../models/index.js');
var express = require('express');
var Photo = models.Photo;

module.exports = {
  home: function (req, res) {
    if (req.user) {
      Photo.findAll().then(function(photos) {
        res.render('logged-in-home', {
          user: req.user,
          photos: photos
        });
      });
    } else {
      Photo.findAll({
        where: {
          public: true
        }
      }).then(function(photos) {
        res.render("public-home", {
          photos: photos
        });
      });
    }
  }
};

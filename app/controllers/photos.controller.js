'use strict';

var db = require('../models/index.js');
var Photo = db.Photo;

exports.publicPhotos = function(req, res) {

};

exports.userPhotos = function(req, res) {
  Photo.findAll({
    where: {
      userId: req.user.dataValues.id
    }
  }).then(function(photos) {
    res.json({
      photos: photos
    });
  });
};

exports.createPhoto = function(req, res) {
  Photo.create({
    userId: req.user.dataValues.id,
    title: req.body.title,
    url: req.body.url,
    public: req.body.public
  }).then(function() {
    res.send('ok');
  });
};

exports.updatePhoto = function(req, res) {
  Photo.find({
    where: {
      id: req.params.id
    }
  }).then(function(photo) {
    photo.update(req.body);
    res.send('ok');
  });
};

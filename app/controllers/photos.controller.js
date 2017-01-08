'use strict';

var db = require('../models/index.js');
var Photo = db.Photo;

exports.publicPhotos = function(req, res) {
  Photo.findAll({
    where: {
      public: true
    },
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(function(photos) {
    res.json({
      photos: photos
    });
  });
};

exports.userPhotos = function(req, res) {
  if (req.user) {
    Photo.findAll({
      where: {
        userId: req.user.dataValues.id
      }
    }).then(function(photos) {
      res.json({
        photos: photos
      });
    });
  } else {
    res.status(401).send('you are not authorized');
  }
};

exports.createPhoto = function(req, res) {
  if (req.user) {
    Photo.create({
      userId: req.user.dataValues.id,
      title: req.body.title,
      url: req.body.url,
      public: req.body.public
    }).then(function() {
      res.send('ok');
    });
  } else {
    res.status(401).send('you are not authorized');
  }
};

exports.updatePhoto = function(req, res) {
  if (req.user) {
    Photo.find({
      where: {
        id: req.params.id
      }
    }).then(function(photo) {
      if (photo.dataValues.userId === req.user.dataValues.id) {
        photo.update(req.body);
        res.send('ok');
      } else {
        res.status(403).send('you do not own this photo');
      }
    });
  } else {
    res.status(401).send('you are not authorized');
  }
};

exports.deletePhoto = function(req, res) {
  if (req.user) {
    Photo.find({
      where: {
        id: req.params.id
      }
    }).then(function(photo) {
      return photo.destroy();
    }).then(function(error) {
      res.send("deleted");
    });
  } else {
    res.status(401).send('you are not authorized');
  }
};

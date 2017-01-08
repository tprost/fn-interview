'use strict';


process.env.NODE_ENV = 'test';

var models = require('../../app/models/index.js');
var User = models.User;
var Photo = models.Photo;

var app = require('../../app.js');

global.models = models;
global.app = app;

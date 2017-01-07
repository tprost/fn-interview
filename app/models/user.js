'use strict';

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    instanceMethods: {
      authenticate: function(password) {
        return this.password === this.hashPassword(password);
      },
      comparePassword: function(password, done) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
          done(err, isMatch);
        });
      }
    },
    hooks: {
      beforeCreate: function(user, options, next) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
          });
        });
      },
      beforeUpdate: function(user, options, next) {
        if (!user.changed('password')) {
          return next();
        }
        return bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
          });
        });
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};

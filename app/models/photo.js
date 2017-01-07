'use strict';

module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Photo.hasOne(models.User);
      }
    }
  });
  return Photo;
};

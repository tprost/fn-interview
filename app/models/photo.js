'use strict';

module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Photo.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Photo;
};

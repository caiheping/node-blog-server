'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ip = sequelize.define('Ip', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ip: {
    	allowNull: false,
      type: DataTypes.STRING
    },
    is_love: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    a_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Article",
        key: 'id'
      }
    },
  }, {});
  Ip.associate = function(models) {
    // associations can be defined here
    Ip.belongsTo(models.Article, {
      foreignKey: 'a_id'
    });
  };
  return Ip;
};
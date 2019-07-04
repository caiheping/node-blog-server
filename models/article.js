'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    u_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: 'id'
      }
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.STRING
    },
    browse: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    love_number: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
    Article.belongsTo(models.User, {
      foreignKey: 'u_id'
    });
  };
  return Article;
};
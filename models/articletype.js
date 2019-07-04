'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleType = sequelize.define('ArticleType', {
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
    }
  }, {});
  ArticleType.associate = function(models) {
    // associations can be defined here
    ArticleType.belongsTo(models.User, {
      foreignKey: 'u_id'
    })
  };
  return ArticleType;
};
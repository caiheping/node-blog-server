'use strict';
module.exports = (sequelize, DataTypes) => {
  const FriendshipLink = sequelize.define('FriendshipLink', {
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
    url: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  FriendshipLink.associate = function(models) {
    // associations can be defined here
    FriendshipLink.belongsTo(models.User, {
      foreignKey: 'u_id'
    })
  };
  return FriendshipLink;
};
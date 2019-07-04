'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
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
    index: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
    Banner.belongsTo(models.User, {
      foreignKey: 'u_id'
    })
  };
  return Banner;
};
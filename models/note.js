'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
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
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, {
      foreignKey: 'u_id'
    })
  };
  return Note;
};
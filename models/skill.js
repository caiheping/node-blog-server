'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
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
    skill: {
      allowNull: false,
      type: DataTypes.STRING
    },
    proficiency: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Skill.associate = function(models) {
    // associations can be defined here
    Skill.belongsTo(models.User, {
      foreignKey: 'u_id'
    });
  };
  return Skill;
};
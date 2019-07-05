'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    nickname: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    motto: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    hobby: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    github: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    qq: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    wechat: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    weibo: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    RSS: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING
    },
    is_delete: {
      type: DataTypes.STRING,
      defaultValue: '0'
    },
    // 0 代表超级管理员， 1 代表普通用户
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
  	defaultScope: {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Skill, {
      foreignKey: 'u_id'
    });
    User.hasMany(models.Article, {
      foreignKey: 'u_id'
    });
    User.hasMany(models.Banner, {
      foreignKey: 'u_id'
    });
    User.hasMany(models.ArticleType, {
      foreignKey: 'u_id'
    });
    User.hasMany(models.Note, {
      foreignKey: 'u_id'
    });
    User.hasMany(models.FriendshipLink, {
      foreignKey: 'u_id'
    });
  };
  return User;
};
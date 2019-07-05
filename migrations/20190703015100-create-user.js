'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null
      },
      motto: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      hobby: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      github: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      qq: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      wechat: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      weibo: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      RSS: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING
      },
      is_delete: {
        type: Sequelize.STRING,
        defaultValue: '0'
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      u_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      // 封面图片
      cover_photo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      browse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      love_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    return queryInterface.dropTable('Articles');
  }
};
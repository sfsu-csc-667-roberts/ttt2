'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      winner_id: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: (queryInterface, _) => {
    return queryInterface.dropTable('games');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leaderboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      totalPoints: {
        allowNull: false,
        defaultValue: 0,
        field: 'total_points',
        type: Sequelize.INTEGER,
      },
      totalGames: {
        allowNull: false,
        defaultValue: 0,
        field: 'total_games',
        type: Sequelize.INTEGER,
      },
      totalVictories: {
        // allowNull: true,
        defaultValue: 0,
        field: 'total_victories',
        type: Sequelize.INTEGER,
      },
      totalDraws: {
        // allowNull: true,
        defaultValue: 0,
        field: 'total_draws',
        type: Sequelize.INTEGER,
      },
      totalLosses: {
        // allowNull: true,
        defaultValue: 0,
        field: 'total_losses',
        type: Sequelize.INTEGER,
      },
      goalsFavor: {
        // allowNull: true,
        defaultValue: 0,
        field: 'goals_favor',
        type: Sequelize.INTEGER,
      },
      goalsOwn: {
        // allowNull: true,
        defaultValue: 0,
        field: 'goals_own',
        type: Sequelize.INTEGER,
      },
      goalsBalance: {
        // allowNull: true,
        defaultValue: 0,
        field: 'goals_balance',
        type: Sequelize.INTEGER,
      },
      efficiency: {
        // allowNull: true,
        defaultValue: 0,
        type: Sequelize.DECIMAL,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('leaderboards');
  }
};

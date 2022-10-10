import { Model, INTEGER, DECIMAL, STRING } from 'sequelize';
import db from '.';

class Leaderboard extends Model {
  id?: number;
  name: string;
  totalPoints?: number;
  totalGames: number;
  totalVictories?: number;
  totalDraws?: number;
  totalLosses?: number;
  goalsFavor?: number;
  goalsOwn?: number;
  goalsBalance: number;
  efficiency: number;
}

Leaderboard.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  name: {
    allowNull: false,
    type: STRING,
  },
  totalPoints: {
    allowNull: false,
    type: INTEGER,
  },
  totalGames: {
    allowNull: false,
    type: INTEGER,
  },
  totalVictories: {
    // allowNull: true,
    type: INTEGER,
  },
  totalDraws: {
    // allowNull: true,
    type: INTEGER,
  },
  totalLosses: {
    // allowNull: true,
    type: INTEGER,
  },
  goalsFavor: {
    // allowNull: true,
    type: INTEGER,
  },
  goalsOwn: {
    // allowNull: true,
    type: INTEGER,
  },
  goalsBalance: {
    // allowNull: true,
    type: INTEGER,
  },
  efficiency: {
    // allowNull: true,
    type: DECIMAL,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'leaderboards',
  timestamps: false,
});

export default Leaderboard;

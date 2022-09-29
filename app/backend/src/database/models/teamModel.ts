import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(100),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

export default Team;

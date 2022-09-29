import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  id!: number;
  username!: string;
  role?: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(30),
  },
  role: {
    // allowNull: false,
    type: STRING(50),
  },
  email: {
    allowNull: false,
    type: STRING(50),
  },
  password: {
    allowNull: false,
    type: STRING(100),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;

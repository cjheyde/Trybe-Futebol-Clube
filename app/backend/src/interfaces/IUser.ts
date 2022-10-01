import ILogin from './ILogin';

interface IUser extends ILogin {
  // id?: number;
  username: string;
  role?: string;
  // email: string;
  // password: string;
}

export default IUser;

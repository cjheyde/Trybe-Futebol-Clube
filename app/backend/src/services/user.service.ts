// import ILogin from '../interfaces/ILogin';
import User from '../database/models/UserModel';
// import { createToken, verifyToken } from '../helpers/token';
import IUser from '../interfaces/IUser';

class UserService {
  constructor(private userModel: typeof User) { }

  // login(email: string, password: string) {
  //   const token = createToken({ email, password });
  //   console.log(this.userModel);
  //   return token;
  // }

  async getByEmail(email: string): Promise<IUser | null> {
    const result = await this.userModel.findOne({ where: { email } });
    return result;
  }
}

export default UserService;

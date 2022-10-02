import User from '../database/models/UserModel';
import { createToken } from '../helpers/token';
import IUser from '../interfaces/IUser';

class UserService {
  constructor(private userModel: typeof User) { }

  login(email: string, password: string): string {
    const token = createToken({ email, password });
    return token;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    const result = await this.userModel.findOne({ where: { email } });
    return result as IUser | null; 
  }
}

export default UserService;
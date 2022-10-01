import User from '../database/models/UserModel';
import { createToken } from '../helpers/token';
import IUser from '../interfaces/IUser';

class UserService {
  constructor(private model = User) { }

  async login(email: string, password: string): Promise<string> {
    const token = createToken({ email, password });
    return token;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    const result = await this.model.findOne({ where: { email } });
    return result; 
  }
}

export default UserService;
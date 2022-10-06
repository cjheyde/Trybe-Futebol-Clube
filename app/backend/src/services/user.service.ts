import ILogin from '../interfaces/ILogin';
import User from '../database/models/UserModel';

class UserService {
  constructor(private userModel: typeof User) { }

  async getByEmail(email: string): Promise<ILogin | null> {
    const result = await this.userModel.findOne({ where: { email } });
    return result as ILogin;
  }
}

export default UserService;

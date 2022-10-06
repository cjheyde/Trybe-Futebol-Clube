import User from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

class UserService {
  constructor(private userModel: typeof User) { }

  async getByEmail(email: string): Promise<IUser | null> {
    const result = await this.userModel.findOne({ where: { email } });
    return result as IUser;
  }
}

export default UserService;

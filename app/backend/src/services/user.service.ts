import User from '../database/models/UserModel';

class UserService {
  constructor(private userModel: typeof User) { }

  async getByEmail(email: string) {
    const result = await this.userModel.findOne({ where: { email } });
    return result;
  }
}

export default UserService;

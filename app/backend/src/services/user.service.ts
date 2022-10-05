import ILogin from '../interfaces/ILogin';
import ILoginUserModel from '../interfaces/ILoginUserModel';

class UserService {
  constructor(private userModel: ILoginUserModel) { }

  async getByEmail(email: string): Promise<ILogin | null> {
    const result = await this.userModel.findOne({ where: { email } });
    return result;
  }
}

export default UserService;

import ILogin from './ILogin';

interface ILoginUserModel {
  findOne(options: { where: { email: string } }): Promise<ILogin | null>
}

export default ILoginUserModel;

import { compareSync, hashSync } from 'bcryptjs';

// ref. code from menthorship - https://github.com/tryber/sd-020-a-live-lectures/blob/lectures-solid-poo-tdd-typescript-sequelize/src/services/utils/BcriptService.ts
class BcryptService {
  private static salt = 10;

  public static encrypt(text: string): string {
    return hashSync(text, this.salt);
  }

  public static compare(encryptText: string, planText: string): boolean {
    return compareSync(planText, encryptText);
  }
}

export default BcryptService;
import { IAuthDocument } from '@features/auth/interfaces/auth.interface';
import { AuthModel } from '@features/auth/models/auth.schema';
import { Helpers } from '@shared/globals/helpers/helpers';

class AuthService {
  public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument | null> {
    const query = {
      $or: [{ username: Helpers.firstLetterUppercase(username) }, { email: Helpers.lowerCase(email) }]
    };

    const user: IAuthDocument | null = await AuthModel.findOne(query).exec();

    return user;
  }
}

export const authService: AuthService = new AuthService();

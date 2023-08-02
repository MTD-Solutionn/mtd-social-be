import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { joiValidation } from '@shared/globals/decorators/joi-validation.decorators';
import { signupSchema } from '@features/auth/schemes/signup';
import { IAuthDocument, AuthDocument, ISignUpData } from '../interfaces/auth.interface';
import { authService } from '@shared/services/db/auth.service';
import { BadRequestError } from '@shared/globals/helpers/error-handler';
import { Helpers } from '@shared/globals/helpers/helpers';
import { uploadImage } from '@shared/globals/helpers/cloudinary-upload';

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor, avatarImage } = req.body;

    const user: IAuthDocument | null = await authService.getUserByUsernameOrEmail(username, email);

    const isUserExist = Boolean(user);

    if (isUserExist) {
      throw new BadRequestError('Invalid credentials');
    }

    const authObjectId = new ObjectId();

    const userObjectId = new ObjectId();

    const uId = `${Helpers.generateRandomIntegers(12)}`;

    const authData: AuthDocument = this.signupData({ _id: authObjectId, uId, username, email, password, avatarColor });

    const avatarLink = await uploadImage({ file: avatarImage, public_id: avatarImage, overwrite: true, invalidate: true });

    if (!avatarLink?.public_id) throw new BadRequestError('File upload: Error occurred. Try again');

  }

  private signupData(data: ISignUpData): AuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;

    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      password,
      avatarColor,
      createdAt: new Date()
    };
  }
}

export const signUpController: SignUp = new SignUp();

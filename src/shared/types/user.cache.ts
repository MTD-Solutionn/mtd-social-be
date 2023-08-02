import { IUserDocument } from '@features/user/interfaces/user.interface';

export type SaveUserToCacheParams = { key: string; userId: string; createdUser: IUserDocument };

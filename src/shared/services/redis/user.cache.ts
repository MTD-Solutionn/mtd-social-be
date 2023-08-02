import { BaseCache } from '@shared/services/redis/base.cache';
import { SaveUserToCacheParams } from '@shared/types/user.cache';

export class UserCache extends BaseCache {
  constructor() {
    super('userCache');
  }

  public async saveUserToCache({}: SaveUserToCacheParams): Promise<void> {}
}

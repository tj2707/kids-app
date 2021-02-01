import { User } from '../models';
import { Repository, IRepository } from './repository';
import { injectable, inject } from 'inversify';
import { MODEL_NAME_TAG } from '../ioc/service-identifiers';

interface IUserRepository extends IRepository<User> {
}

@injectable()
class UserRepository extends Repository<User> implements IUserRepository {
  constructor(@inject(MODEL_NAME_TAG) modelName: string) {
    super('User');
  }
}

export { IUserRepository, UserRepository };

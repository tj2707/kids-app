import { inject, injectable } from 'inversify';
import { User } from '@/domain/entities';
import { IHttpService } from '@/app-modules/http';
import { SERVICE_IDENTIFIERS, CONSTRUCTOR_ARG_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { IJsonService } from '@/app-modules/json/json-service';
import { IDataService, DataService } from '@/domain/services/data-service';

interface IUserService extends IDataService<User> {
}

@injectable()
class UserService extends DataService<User> implements IUserService {
  constructor(
    @inject(SERVICE_IDENTIFIERS.IHttpService) httpService: IHttpService,
    @inject(SERVICE_IDENTIFIERS.IJsonService) jsonService: IJsonService,
    @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ResourceName) resourceName: string,
    @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ClassRef) classRef: { new(...args: any[]): User; },
  ) {
    super(httpService,
      jsonService,
      'user',
      User);
  }
}

export { IUserService, UserService };

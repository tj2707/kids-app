import { inject, injectable } from 'inversify';
import { IHttpService } from '@/app-modules/http';
import { SERVICE_IDENTIFIERS, CONSTRUCTOR_ARG_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { IJsonService } from '@/app-modules/json/json-service';
import { IDataService, DataService } from '@/domain/services/data-service';
import { UserTaskLog } from '@/domain/entities/user-task-log';

interface IUserTaskLogService extends IDataService<UserTaskLog> {
  getForUserTaskId(userTaskId: number): Promise<UserTaskLog[]>;
}

@injectable()
class UserTaskLogService extends DataService<UserTaskLog> implements IUserTaskLogService {
  constructor(
    @inject(SERVICE_IDENTIFIERS.IHttpService) httpService: IHttpService,
    @inject(SERVICE_IDENTIFIERS.IJsonService) jsonService: IJsonService,
    @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ResourceName) resourceName: string,
    @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ClassRef) classRef: { new(...args: any[]): UserTaskLog; },
  ) {
    super(httpService,
      jsonService,
      'user-task-log',
      UserTaskLog);
  }

  public async getForUserTaskId(userTaskId: number): Promise<UserTaskLog[]> {
    return this.httpService.get({ url: `/${this.resourceName}/task/${userTaskId}` })
      .then((response) => {
        const data = this.deserializeArray(response.data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }
}

export { IUserTaskLogService, UserTaskLogService };

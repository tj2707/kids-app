import { inject, injectable } from 'inversify';
import { UserTask } from '@/domain//entities';
import { IHttpService } from '@/app-modules/http';
import { SERVICE_IDENTIFIERS, CONSTRUCTOR_ARG_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { IJsonService } from '@/app-modules/json/json-service';
import { IDataService, DataService } from '@/domain/services/data-service';

interface IUserTaskService extends IDataService<UserTask> {
  getByUserId(userId: number): Promise<UserTask[]>;
  getByWeekday(weekday: number): Promise<UserTask[]>;
}

@injectable()
class UserTaskService extends DataService<UserTask> implements IUserTaskService {
  constructor(
    @inject(SERVICE_IDENTIFIERS.IHttpService) httpService: IHttpService,
    @inject(SERVICE_IDENTIFIERS.IJsonService) jsonService: IJsonService,
    @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ResourceName) resourceName: string,
    @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ClassRef) classRef: { new(...args: any[]): UserTask; },
  ) {
    super(httpService,
      jsonService,
      'user-task',
      UserTask);
  }

  public async getByUserId(userId: number): Promise<UserTask[]> {
    return this.httpService.get({ url: `/user-task/user/${userId}` })
      .then((response) => {
        const data = this.deserializeArray(response.data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }

  public async getByWeekday(weekday: number): Promise<UserTask[]> {
    return this.httpService.get({ url: `/user-task/weekday/${weekday}` })
      .then((response) => {
        const data = this.deserializeArray(response.data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }
}

export { IUserTaskService, UserTaskService };

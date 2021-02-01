import { injectable, inject } from 'inversify';
import { Task } from '../entities/task';
import { IHttpService } from '@/app-modules/http';
import { IJsonService } from '@/app-modules/json/json-service';
import { SERVICE_IDENTIFIERS, CONSTRUCTOR_ARG_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { IDataService, DataService } from '@/domain/services/data-service';

interface ITaskService extends IDataService<Task> {
}

@injectable()
class TaskService extends DataService<Task> implements ITaskService {
  constructor(
      @inject(SERVICE_IDENTIFIERS.IHttpService) httpService: IHttpService,
      @inject(SERVICE_IDENTIFIERS.IJsonService) jsonService: IJsonService,
      @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ResourceName) resourceName: string,
      @inject(CONSTRUCTOR_ARG_IDENTIFIERS.ClassRef) classRef: { new(...args: any[]): Task; },
  ) {
    super(httpService,
      jsonService,
      'task',
      Task);
  }
}

export { ITaskService, TaskService };

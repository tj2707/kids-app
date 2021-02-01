import 'reflect-metadata';
import { Container } from 'inversify';
import { IHttpService, HttpService } from '@/app-modules/http';
import { SERVICE_IDENTIFIERS, CONSTRUCTOR_ARG_IDENTIFIERS } from './service-identifiers';
import { IJsonService, JsonService } from '../json/json-service';
import { IUserService, UserService } from '@/domain/services/user-service';
import { ITaskService, TaskService } from '@/domain/services/task-service';
import { IUserTaskService, UserTaskService } from '@/domain/services/user-task-service';
import { IUserTaskLogService, UserTaskLogService } from '@/domain/services/user-task-log-service';

const container = new Container();
container.bind<string>(CONSTRUCTOR_ARG_IDENTIFIERS.ResourceName).toConstantValue('');
container.bind<string>(CONSTRUCTOR_ARG_IDENTIFIERS.ClassRef).toConstantValue('');

container.bind<IHttpService>(SERVICE_IDENTIFIERS.IHttpService).to(HttpService).inSingletonScope();
container.bind<IJsonService>(SERVICE_IDENTIFIERS.IJsonService).to(JsonService).inSingletonScope();
container.bind<IUserService>(SERVICE_IDENTIFIERS.IUserService).to(UserService).inSingletonScope();
container.bind<ITaskService>(SERVICE_IDENTIFIERS.ITaskService).to(TaskService).inSingletonScope();
container.bind<IUserTaskService>(SERVICE_IDENTIFIERS.IUserTaskService).to(UserTaskService).inSingletonScope();
container.bind<IUserTaskLogService>(SERVICE_IDENTIFIERS.IUserTaskLogService).to(UserTaskLogService).inSingletonScope();

export { container };

import 'reflect-metadata';
import { Container } from 'inversify';
import { ITaskRepository, TaskRepository, IUserRepository, UserRepository, IUserTaskRepository, UserTaskRepository, IUserTaskLogRepository, UserTaskLogRepository } from '../repositories';
import { SERVICE_IDENTIFIERS, MODEL_NAME_TAG } from './service-identifiers';
import { ISsmService, SsmService } from '../services/ssm-service';

const container = new Container();
container.bind<string>(MODEL_NAME_TAG).toConstantValue('');

container.bind<ISsmService>(SERVICE_IDENTIFIERS.ISsmService).to(SsmService).inSingletonScope();
container.bind<ITaskRepository>(SERVICE_IDENTIFIERS.ITaskRepository).to(TaskRepository).inSingletonScope();
container.bind<IUserRepository>(SERVICE_IDENTIFIERS.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IUserTaskRepository>(SERVICE_IDENTIFIERS.IUserTaskRepository).to(UserTaskRepository).inSingletonScope();
container.bind<IUserTaskLogRepository>(SERVICE_IDENTIFIERS.IUserTaskLogRepository).to(UserTaskLogRepository).inSingletonScope();

export { container };

import { TaskItem } from '../models';
import { Repository, IRepository } from './repository';
import { injectable, inject } from 'inversify';
import { MODEL_NAME_TAG } from './../ioc/service-identifiers';

interface ITaskRepository extends IRepository<TaskItem> {
}

@injectable()
class TaskRepository extends Repository<TaskItem> implements ITaskRepository {
  constructor(@inject(MODEL_NAME_TAG) modelName: string) {
    super('TaskItem');
  }
}

export { ITaskRepository, TaskRepository };

import { UserTask } from '../models/user-task';
import { Repository, IRepository } from './repository';
import { injectable, inject } from 'inversify';
import { MODEL_NAME_TAG } from './../ioc/service-identifiers';
import { User, TaskItem, UserTaskLog } from './../models';
import { Sequelize } from 'sequelize/types';

interface IUserTaskRepository extends IRepository<UserTask> {
  getByUserId(userId: number): Promise<UserTask[]>;
  getByTaskId(taskId: number): Promise<UserTask[]>;
  getByWeekday(weekday: number): Promise<UserTask[]>;
}

@injectable()
class UserTaskRepository extends Repository<UserTask> implements IUserTaskRepository {
  constructor(@inject(MODEL_NAME_TAG) modelName: string) {
    super('UserTask');
  }

  public async getByUserId(userId: number): Promise<UserTask[]> {
    return this.getDataContext()
    .then((db) => {
      return UserTask.findAll({
        include: [{
          model: User
        }, {
          model: TaskItem
        }, {
          model: UserTaskLog
        }],
        where: { userId }
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }
  
  public async getByTaskId(taskId: number): Promise<UserTask[]> {
    return this.getDataContext()
    .then((db) => {
      return UserTask.findAll({
        include: [{
          model: User
        }, {
          model: TaskItem
        }, {
          model: UserTaskLog
        }],
        where: { taskId }
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }

  public async getByWeekday(weekday: number): Promise<UserTask[]> {
    return this.getDataContext()
    .then((db) => {
      return UserTask.findAll({
        include: [{
          model: User
        }, {
          model: TaskItem
        }, {
          model: UserTaskLog
        }],
        where: {
          weekday
        }
      })
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
  }
}

export { IUserTaskRepository, UserTaskRepository };

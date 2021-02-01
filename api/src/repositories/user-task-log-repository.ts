import { UserTaskLog } from '../models';
import { Repository, IRepository } from './repository';
import { injectable, inject } from 'inversify';
import { MODEL_NAME_TAG } from './../ioc/service-identifiers';

interface IUserTaskLogRepository extends IRepository<UserTaskLog> {
  getByUserTaskId(userTaskId: number): Promise<UserTaskLog[]>;
  getByUserTaskIdAndDate(userTaskId: number, date: string): Promise<UserTaskLog[]>;
}

@injectable()
class UserTaskLogRepository extends Repository<UserTaskLog> implements IUserTaskLogRepository {
  constructor(@inject(MODEL_NAME_TAG) modelName: string) {
    super('UserTaskLog');
  }

  public async getByUserTaskId(userTaskId: number): Promise<UserTaskLog[]> {
    return this.getDataContext()
    .then(async (db) => {
      const userTaskLogs: UserTaskLog[] = await UserTaskLog.findAll({
        where: {
          userTaskId: userTaskId
        }
      });
      return userTaskLogs;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }

  public async getByUserTaskIdAndDate(userTaskId: number, date: string): Promise<UserTaskLog[]> {
    return this.getDataContext()
    .then(async (db) => {
      const userTaskLogs: UserTaskLog[] = await db.query(
        'SELECT * FROM user_task_log WHERE userTaskId = ? AND date(completedAt) = ?', {
        replacements: [userTaskId, date],
        model: UserTaskLog
      });
      return userTaskLogs;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }
}

export { IUserTaskLogRepository, UserTaskLogRepository };

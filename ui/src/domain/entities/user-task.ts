import { JsonObject, JsonProperty } from 'json2typescript';
import { User } from '@/domain/entities/user';
import { UserTaskLog } from '@/domain/entities/user-task-log';
import { Task } from '@/domain/entities/task';
import { NullableConverter } from '@/app-modules/json/nullable-converter';

@JsonObject('UserTask')
class UserTask {
  @JsonProperty('id', Number)
  public id: number;

  @JsonProperty('userId', Number)
  public userId: number;

  @JsonProperty('taskId', Number)
  public taskId: number;

  @JsonProperty('weekday', Number)
  public weekday: number;

  @JsonProperty('createdAt', String)
  public createdAt: string;

  @JsonProperty('updatedAt', String)
  public updatedAt: string;

  @JsonProperty('user', NullableConverter)
  public user?: User;

  @JsonProperty('task', NullableConverter)
  public task?: Task;

  @JsonProperty('userTaskLogs', [UserTaskLog])
  public userTaskLogs?: UserTaskLog[];

  constructor(id?: number, userId?: number, taskId?: number,
    weekday?: number, createdAt?: string, updatedAt?: string,
    user?: User, task?: Task, userTaskLogs?: UserTaskLog[]) {
    this.id = id || 0;
    this.userId = userId || 0;
    this.taskId = taskId || 0;
    this.weekday = weekday || 0;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
    this.user = user || null;
    this.task = task || null;
    this.userTaskLogs = userTaskLogs || [];
  }
}

export { UserTask };

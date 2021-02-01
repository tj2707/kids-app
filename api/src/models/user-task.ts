import {Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { User } from './user';
import { TaskItem } from './task-item';
import { UserTaskLog } from '.';

@Table({
  tableName: 'user_task'
})
class UserTask extends Model<UserTask> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId: number

  @ForeignKey(() => TaskItem)
  @Column(DataType.INTEGER)
  public taskId: number

  @Column(DataType.INTEGER)
  public weekday: string;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => TaskItem)
  public task: TaskItem;

  @HasMany(() => UserTaskLog)
  public userTaskLogs: UserTaskLog[];
}

export { UserTask };

import { Table, Column, Model, DataType, ForeignKey, CreatedAt, BelongsTo } from 'sequelize-typescript';
import { UserTask } from './user-task';

@Table({
  tableName: 'user_task_log',
  timestamps: false
})
class UserTaskLog extends Model<UserTaskLog> {
  @ForeignKey(() => UserTask)
  @Column(DataType.INTEGER)
  public userTaskId: number

  @Column(DataType.STRING)
  public completedAt: string;

  @BelongsTo(() => UserTask)
  public userTask: UserTask;
}

export { UserTaskLog };

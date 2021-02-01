import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import { UserTask } from '.';

@Table({
  tableName: 'task'
})
class TaskItem extends Model<TaskItem> {
  @Column(DataType.STRING)
  public title: string;
  
  @Column(DataType.STRING)
  public description: string;

  @HasMany(() => UserTask)
  public userTasks: UserTask[];
}

export { TaskItem };

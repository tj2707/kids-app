import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import { UserTask } from './user-task';

@Table({
  tableName: 'user'
})
class User extends Model<User> {
  @Column(DataType.STRING)
  public name: string;

  @HasMany(() => UserTask)
  public userTasks: UserTask[];
}

export { User };

import { TaskStoreAccessors } from '@/app-modules/store/modules/task';
import { UserStoreAccessors } from '@/app-modules/store/modules/user';
import { UserTaskStoreAccessors } from '@/app-modules/store/modules/user-task';

const StoreKeys = {
  Task: new TaskStoreAccessors(),
  User: new UserStoreAccessors(),
  UserTask: new UserTaskStoreAccessors(),
};

export { StoreKeys };

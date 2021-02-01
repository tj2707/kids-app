import {
  MutationTree, ActionTree, GetterTree, Module,
} from 'vuex';
import { RootState } from '@/domain/models';
import { container } from '@/app-modules/ioc';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { UserTask } from '@/domain/entities';
import { IUserTaskService } from '@/domain/services';

export class UserTaskActions {
  public readonly SyncUserTasks: string = 'userTask/syncUserTasks';
}

export class UserTaskGetters {
  public readonly UserTasks: string = 'userTask/userTasks';
}

export class UserTaskMutations {
    public static readonly SetUserTasks: string = 'setUserTasks';
}

const userTaskService: IUserTaskService = container.get(SERVICE_IDENTIFIERS.IUserTaskService);

export interface UserTaskState {
  userTasks?: UserTask[];
}

export const state = (): UserTaskState => ({
  userTasks: [],
});

export const getters: GetterTree<UserTaskState, RootState> = {
  userTasks: state => state.userTasks,
};

export const actions: ActionTree<UserTaskState, RootState> = {
  async syncUserTasks({ commit }, weekday: number) {
    await userTaskService.getByWeekday(weekday)
      .then((userTasks) => {
        commit(UserTaskMutations.SetUserTasks, userTasks);
      });
  },
};

export const mutations: MutationTree<UserTaskState> = {
  [UserTaskMutations.SetUserTasks](state: UserTaskState, userTasks: UserTask[]): void {
    state.userTasks = userTasks;
  },
};

const namespaced: boolean = true;

const userTask: Module<UserTaskState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export class UserTaskStoreAccessors {
    public readonly Getters: UserTaskGetters = new UserTaskGetters();

    public readonly Actions: UserTaskActions = new UserTaskActions();
}

export { userTask };

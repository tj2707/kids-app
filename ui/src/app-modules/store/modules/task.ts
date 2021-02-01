import {
  MutationTree, ActionTree, GetterTree, Module,
} from 'vuex';
import { RootState } from '@/domain/models';
import { container } from '@/app-modules/ioc';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { ITaskService } from '@/domain/services';
import { Task } from '@/domain/entities/task';

export class TaskActions {
  public readonly SyncTasks: string = 'task/syncTasks';
}

export class TaskGetters {
  public readonly Tasks: string = 'task/tasks';
}

export class TaskMutations {
    public static readonly SetTasks: string = 'setTasks';
}

const taskService: ITaskService = container.get(SERVICE_IDENTIFIERS.ITaskService);

export interface TaskState {
  tasks?: Task[];
}

export const state = (): TaskState => ({
  tasks: [],
});

export const getters: GetterTree<TaskState, RootState> = {
  tasks: state => state.tasks,
};

export const actions: ActionTree<TaskState, RootState> = {
  async syncTasks({ commit }) {
    await taskService.getAll()
      .then((tasks) => {
        commit(TaskMutations.SetTasks, tasks);
      });
  },
};

export const mutations: MutationTree<TaskState> = {
  [TaskMutations.SetTasks](state: TaskState, tasks: Task[]): void {
    state.tasks = tasks;
  },
};

const namespaced: boolean = true;

const task: Module<TaskState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export class TaskStoreAccessors {
    public readonly Getters: TaskGetters = new TaskGetters();

    public readonly Actions: TaskActions = new TaskActions();
}

export { task };

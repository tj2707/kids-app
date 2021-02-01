import {
  MutationTree, ActionTree, GetterTree, Module,
} from 'vuex';
import { RootState } from '@/domain/models';
import { container } from '@/app-modules/ioc';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { IUserService } from '@/domain/services/user-service';
import { User } from '@/domain/entities';

export class UserActions {
  public readonly SyncUsers: string = 'user/syncUsers';

  public readonly SetSelectedUser: string = 'user/setSelectedUser';
}

export class UserGetters {
  public readonly Users: string = 'user/users';

  public readonly SelectedUser: string = 'user/selectedUser';
}

export class UserMutations {
    public static readonly SetUsers: string = 'setUsers';

    public static readonly SetSelectedUser: string = 'setSelectedUser';
}

const userService: IUserService = container.get(SERVICE_IDENTIFIERS.IUserService);

export interface UserState {
  users?: User[];
  selectedUser?: User;
}

export const state = (): UserState => ({
  users: [],
  selectedUser: undefined,
});

export const getters: GetterTree<UserState, RootState> = {
  users: state => state.users,

  selectedUser: state => state.selectedUser,
};

export const actions: ActionTree<UserState, RootState> = {
  async syncUsers({ commit }) {
    await userService.getAll()
      .then((users) => {
        commit(UserMutations.SetUsers, users);
      });
  },

  setSelectedUser({ commit }, user: User) {
    commit(UserMutations.SetSelectedUser, user);
  },
};

export const mutations: MutationTree<UserState> = {
  [UserMutations.SetUsers](state: UserState, users: User[]): void {
    state.users = users;
  },

  [UserMutations.SetSelectedUser](state: UserState, user: User): void {
    state.selectedUser = user;
  },
};

const namespaced: boolean = true;

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export class UserStoreAccessors {
    public readonly Getters: UserGetters = new UserGetters();

    public readonly Actions: UserActions = new UserActions();
}

export { user };

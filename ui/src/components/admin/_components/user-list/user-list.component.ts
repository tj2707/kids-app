import { Component, Vue } from 'vue-property-decorator';
import { UserModel } from '@/domain/models';
import { StoreKeys } from '@/app-modules/store/accessors';
import { User } from '@/domain/entities';
import { IUserService } from '@/domain/services';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import AdminListComponent from '@/components/admin/_components/_admin-list';

@Component({
  name: 'UserListComponent',
  components: {
    adminList: AdminListComponent
  }
})
export default class UserListComponent extends Vue {
  private loading: boolean = false;

  private users: UserModel[] = [];

  private get selectedUser(): User {
    return this.$store.getters[StoreKeys.User.Getters.SelectedUser];
  }

  private get userService(): IUserService {
    return this.$container.get(SERVICE_IDENTIFIERS.IUserService);
  }

  private async addNewUser(): Promise<void> {
    await this.$alert.prompt('Enter a name')
      .then((name: string) => {
        if (!!name) {
          const newUser: User = new User();
          newUser.name = name;
          this.userService.save(newUser)
          .then(() => {
            this.fetchData();
          });
        }
      })
      .catch((err: Error) => {
        throw err;
      });
  }

  private async setSelectedUser(user: UserModel) {
    const toSet = !!this.selectedUser && this.selectedUser.id === user.id;
    await this.$store.dispatch(StoreKeys.User.Actions.SetSelectedUser, toSet ? null : user);
  }

  private async fetchData() {
    this.loading = true;
    this.$store.dispatch(StoreKeys.User.Actions.SyncUsers)
      .then(() => {
        this.users = this.$store.getters[StoreKeys.User.Getters.Users];
        this.loading = false;
      });
  }

  private created() {
    this.fetchData();
  }
}

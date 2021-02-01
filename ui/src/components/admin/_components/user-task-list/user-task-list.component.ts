import { Component, Vue, Watch } from 'vue-property-decorator';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { UserTask, User, Task } from '@/domain/entities';
import { IUserTaskService } from '@/domain/services';
import { StoreKeys } from '@/app-modules/store/accessors';
import AdminListComponent from '../_admin-list';

@Component({
  name: 'UserTaskListComponent',
  components: {
    adminList: AdminListComponent
  }
})
export default class UserTaskListComponent extends Vue {
  private loading: boolean = false;
  private userTasks: UserTask[] = [];
  private weekdays: number[] = [];
  private taskId: number = 0;
  private showDialog: boolean = false;

  private get selectedUser(): User {
    return this.$store.getters[StoreKeys.User.Getters.SelectedUser];
  }

  private get userTaskService(): IUserTaskService {
    return this.$container.get(SERVICE_IDENTIFIERS.IUserTaskService);
  }

  private get title(): string {
    return `User Tasks (${this.selectedUser.name})`;
  }

  private get sortedUserTasks(): UserTask[] {
    return this.userTasks.sort((a, b) => {
      if (a.weekday < b.weekday) {
        return -1;
      }
      if (a.weekday > b.weekday) {
        return 1;
      }
      return 0;
    });
  }

  private get daysOfTheWeek(): string[] {
    return [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
  }

  private get tasks(): Task[] {
    return this.$store.getters[StoreKeys.Task.Getters.Tasks];
  }

  @Watch('selectedUser', { immediate: true })
  private async fetchData() {
    this.loading = true;
    await this.userTaskService.getByUserId(this.selectedUser.id)
    .then((userTasks) => {
      this.userTasks = userTasks;
      this.loading = false;
    })
    .catch((err) => {
      throw err;
    });
  }

  private getItemText(item: UserTask): string {
    return item.task.title;
  }

  private getItemSubText(item: UserTask): string {
    return this.daysOfTheWeek[item.weekday];
  }

  private async addNewTask(): Promise<void> {
    if (!this.taskId || !this.weekdays.length) {
      return;
    }

    const promises: Promise<boolean>[] = [];
    this.weekdays.forEach((weekday) => {
      promises.push(this.saveNewUserTask(weekday));
    });

    Promise.all(promises)
    .then(() => {
      this.taskId = 0;
      this.weekdays = [];
      this.showDialog = false;
    })
    .then(this.fetchData);
  }

  private saveNewUserTask(weekday: number): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.userTaskService.save(new UserTask(0, this.selectedUser.id, this.taskId, weekday)));
    });
  }

  private created() {
    this.fetchData();
  }
}

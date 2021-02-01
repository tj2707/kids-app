import { Component, Vue } from 'vue-property-decorator';
import { ITaskService } from '@/domain/services/task-service';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { Task } from '@/domain/entities';
import { StoreKeys } from '@/app-modules/store/accessors';
import AdminListComponent from '@/components/admin/_components/_admin-list';

@Component({
  name: 'TaskListComponent',
  components: {
    adminList: AdminListComponent
  }
})
export default class TaskListComponent extends Vue {
  private showDialog: boolean = false;
  private newTask: Task = new Task();
  private loading: boolean = false;
  private tasks: Task[] = [];

  private get taskService(): ITaskService {
    return this.$container.get(SERVICE_IDENTIFIERS.ITaskService);
  }

  private async addNewTask(): Promise<void> {
    this.taskService.save(this.newTask)
      .then(() => {
        this.fetchData()
        .then(() => {
          this.showDialog = false;
          this.newTask = new Task();
        });
      });
  }

  private async fetchData() {
    this.loading = true;
    this.$store.dispatch(StoreKeys.Task.Actions.SyncTasks)
      .then(() => {
        this.tasks = this.$store.getters[StoreKeys.Task.Getters.Tasks];
        this.loading = false;
      });
  }

  private created() {
    this.fetchData();
  }
}

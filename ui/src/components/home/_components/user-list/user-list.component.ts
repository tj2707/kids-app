import { Component, Vue, Prop } from "vue-property-decorator"
import { UserListChildComponents } from './_components';
import { UserTask } from '@/domain/entities';

@Component({
  name: 'UserListComponent',
  components: UserListChildComponents
})
export default class UserListComponent extends Vue {
  @Prop() public userTasks: UserTask[];

  private groupBy(array: any[], key: string) {
    return array.reduce((prev, val) => {
      (prev[val[key]] = prev[val[key]] || []).push(val);
      return prev;
    }, {});
  }

  private get userTasksGroupedByUserId(): { [key: number]: UserTask[]} {
    return this.userTasks ? this.groupBy(this.userTasks, 'userId') : [];
  }
}

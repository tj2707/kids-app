import { Component, Vue, Prop } from "vue-property-decorator"
import { UserTask, User } from '@/domain/entities';
import { UserChildComponents } from './_components';

@Component({
  name: 'UserComponent',
  components: UserChildComponents
})
export default class UserComponent extends Vue {
  @Prop() public userTasks: UserTask[];

  private get user(): User {
    return this.userTasks[0].user;
  }
}

import { Component, Vue } from 'vue-property-decorator';
import { HomeChildComponents } from './_components';
import { UserTask } from '@/domain/entities';
import { format } from 'date-fns';
import { StoreKeys } from '@/app-modules/store/accessors';

@Component({
  name: 'HomeComponent',
  components: HomeChildComponents
})
export default class HomeComponent extends Vue {
  public get userTasks(): UserTask[] {
    return this.$store.getters[StoreKeys.UserTask.Getters.UserTasks];
  }

  private get dayOfWeek(): number {
    return this.today.getDay() - 1;
  }

  private get today(): Date {
    return new Date();
  }

  private get todayAsString(): string {
    return format(this.today, 'dd-MM-yyyy');
  }

  private created() {
    this.$store.dispatch(StoreKeys.UserTask.Actions.SyncUserTasks, this.dayOfWeek);
  }
}

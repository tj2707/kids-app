import { Component, Vue, Prop, Emit } from "vue-property-decorator"
import { UserTask } from '@/domain/entities';
import { format } from 'date-fns';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';
import { IUserTaskLogService } from '@/domain/services/user-task-log-service';
import { UserTaskLog } from '@/domain/entities/user-task-log';
import animate from 'animateplus';
import { StoreKeys } from '@/app-modules/store/accessors';

@Component({
  name: 'UserTaskListItemComponent'
})
export default class UserTaskListItemComponent extends Vue {
  @Prop() public userTask: UserTask;

  private tick: boolean = false;
  private spread: number = 150;
  private palette: string[] = [
    '#616AFF',
    '#2DBAE7',
    '#48DC6B',
    '#DBDEEA',
    '#FC6E3F',
    '#FFBF00'
  ];

  private get userTaskLogService(): IUserTaskLogService {
    return this.$container.get(SERVICE_IDENTIFIERS.IUserTaskLogService);
  }

  private get title(): string {
    return this.userTask.task.title;
  }

  private get description(): string {
    return this.userTask.task.description;
  }

  private get todayAsString(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  private get existingUserTaskLogForToday(): UserTaskLog {
    return this.userTask.userTaskLogs.find((log) => log.completedAt === this.todayAsString);
  }

  private get newUserTaskLogForToday(): UserTaskLog {
    return new UserTaskLog (0, this.userTask.id, this.todayAsString);
  }

  private get active(): boolean {
    return !!this.existingUserTaskLogForToday;
  }

  private set active(value: boolean)  {
    this.toggle(value);
  }

  private get dayOfWeek(): number {
    return new Date().getDay() - 1;
  }

  private async toggle(value: boolean) {
    if (value) {
      await this.createLog()
      .then(() => {
        this.$store.dispatch(StoreKeys.UserTask.Actions.SyncUserTasks, this.dayOfWeek);
      });
    } else {
      await this.deleteLog()
      .then(() => {
        this.$store.dispatch(StoreKeys.UserTask.Actions.SyncUserTasks, this.dayOfWeek);
      });
    }
  }

  private async createLog() {
    this.userTaskLogService.save(this.newUserTaskLogForToday)
    .catch((err) => {
      console.log(err);
      throw err;
    });
    
    const cb = this.checkbox.$el;
    this.burst(cb.offsetLeft, cb.offsetTop);
  }

  private async deleteLog() {
    if (this.active) {
      return this.userTaskLogService.delete(this.existingUserTaskLogForToday.id)
      .catch((err) => {
        console.log(err);
        throw err;
      })
    }
  }

  private burst(x: number, y: number) {
    if (this.tick) {
      return;
    }
    this.tick = true;

    requestAnimationFrame(() => {
      this.tick = false;

      this.palette.forEach(async (colour) => {
        const svg = (this.content.cloneNode(true) as any).firstElementChild;
        const {style} = svg;

        style.left = `${x}px`;
        style.top = `${y}px`;
        style.fill = colour;

        await animate({
          elements: this.container.appendChild(svg),
          easing: 'out-cubic',
          transform: [
            'translate(0px, 0px) scale(1)',
            `${this.random(-this.spread, this.spread)} ${this.random(-this.spread, this.spread)} 0`
          ]
        });

        this.container.removeChild(svg);
      });
    });
  }
  
  private get content(): Element {
    return (this.$refs.content as Element);
  }

  private get container(): Element {
    return this.$refs.container as Element;
  }

  private get checkbox(): any {
    return this.$refs.cb as Element;
  }

  private random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}

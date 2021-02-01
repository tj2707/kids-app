import { Component, Vue, Prop } from 'vue-property-decorator';
import { AdminListChildComponents } from './_components';

@Component({
  name: 'AdminListComponent',
  components: AdminListChildComponents,
})
export default class AdminListComponent extends Vue {
  @Prop() public title: string;
  @Prop() public loading: boolean;
  @Prop() public items: [{id: number}];
  @Prop() public itemKey: string;
  @Prop() public itemSubKey: string;
  @Prop() public onItemClick: (item: any) => void;
  @Prop() public addNewItem: () => void;
  @Prop() public itemKeyFunc: (item: any) => string;
  @Prop() public itemSubKeyFunc: (item: any) => string;

  private addNewItemClick() {
    if (!!this.addNewItem) {
      this.addNewItem();
    }
  }
}

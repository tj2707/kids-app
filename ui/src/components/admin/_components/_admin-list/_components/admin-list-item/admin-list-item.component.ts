import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'AdminListItemComponent',
})
export default class AdminListItemComponent extends Vue {
  @Prop() public item: any;
  @Prop() public itemKey: string;
  @Prop() public itemSubKey: string;
  @Prop() public onClick: (item: any) => void;
  @Prop() public itemKeyFunc: (item: any) => string;
  @Prop() public itemSubKeyFunc: (item: any) => string;
  
  private get itemText(): string {
    if (!!this.itemKeyFunc) {
      return this.itemKeyFunc(this.item);
    }
    return this.item[this.itemKey];
  }
  
  private get itemSubText(): string {
    if (!!this.itemSubKeyFunc) {
      return this.itemSubKeyFunc(this.item);
    }
    return this.item[this.itemSubKey];
  }

  private onItemClick() {
    if (!!this.onClick) {
      this.onClick(this.item);
    }
  }
}

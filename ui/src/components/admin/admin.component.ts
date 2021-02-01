import { Component, Vue } from 'vue-property-decorator';
import { AdminChildComponents } from '@/components/admin/_components';
import { User } from '@/domain/entities';
import { StoreKeys } from '@/app-modules/store/accessors';

@Component({
  name: 'AdminComponent',
  components: AdminChildComponents,
})
export default class AdminComponent extends Vue {
  private get selectedUser(): User {
    return this.$store.getters[StoreKeys.User.Getters.SelectedUser];
  }
}

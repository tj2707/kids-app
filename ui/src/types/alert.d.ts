import { AlertService } from '@/app-modules/alert';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $alert: AlertService;
  }
}

import Vue, { PluginObject } from 'vue';
import { VueConstructor } from 'vue/types/vue';
import { alertService } from '@/app-modules/alert/alert-service';

class AlertPlugin implements PluginObject<any> {
  [key: string]: any;

  public install(vue: VueConstructor<Vue>, options?: any): void {
    Object.defineProperty(vue.prototype, '$alert', {
      get() { return alertService; },
    });
  }
}

export default {
  init() {
    Vue.use(new AlertPlugin());
  },
};

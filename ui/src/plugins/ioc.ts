import Vue, { PluginObject } from 'vue';
import { VueConstructor } from 'vue/types/vue';
import { container } from '@/app-modules/ioc';

class IocPlugin implements PluginObject<any> {
  [key: string]: any;

  public install(vue: VueConstructor<Vue>, options?: any): void {
    Object.defineProperty(vue.prototype, '$container', {
      get() { return container; },
    });
  }
}

export default {
  init() {
    Vue.use(new IocPlugin());
  },
};

import { Container } from 'inversify';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $container: Container;
  }
}

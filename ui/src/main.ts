import Vue from 'vue';
import '@babel/polyfill';
import App from '@/components/_app';
import router from './app-modules/router';
import store from './app-modules/store';
import vuetify from './plugins/vuetify';
import Alert from './plugins/alert';
import IoC from './plugins/ioc';

Alert.init();
IoC.init();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

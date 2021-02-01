import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FF0080',
        secondary: '#400080',
        accent: '#4DCCBD',
        error: '#FF0080',
        info: '#1C77C3',
        success: '#4DCCBD',
        warning: '#042A2B',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});

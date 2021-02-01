import Vue from 'vue';
import Vuex from 'vuex';
import { user } from '@/app-modules/store/modules/user';
import { task } from '@/app-modules/store/modules/task';
import { userTask } from '@/app-modules/store/modules/user-task';
import { RootState } from '@/domain/models';

Vue.use(Vuex);

// https://vuex.vuejs.org/guide/strict.html
const isStrict = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store<RootState>({
  modules: {
    user,
    task,
    userTask,
  },
  strict: isStrict,
});

export default store;

import Vue from 'vue';
import Router from 'vue-router';
import { Routes } from './routes';
import HomeComponent from '@/components/home';

Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: Routes.Home,
      name: 'home',
      component: HomeComponent,
    },
    {
      path: Routes.HomeAlt,
      name: 'homeAlt',
      component: HomeComponent,
    },
    {
      path: Routes.Admin,
      name: 'admin',
      component: () => import('@/components/admin'),
    },
  ],
});

export default router;

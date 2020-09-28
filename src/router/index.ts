import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const loadView = (view: string) => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)

// return (resolve: any) => require([/* webpackChunkName: "view-[request]" */ `../views/${view}`], resolve)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home')
  },
  {
    path: '/about',
    name: 'About',
    component: loadView('About')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const loadView = (view: string) => defineAsyncComponent(() => import(/* webpackChunkName: "" */ `@/views/${view}.vue`))

const routes: Array<RouteRecordRaw> = [
  {
    path: '/images/:id',
    name: 'tags',
    component: loadView('Tags')
  },
  {
    path: '/:catchAll(.*)',
    name: 'home',
    component: loadView('Home')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

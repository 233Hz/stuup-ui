import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

/**
 * 路由
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.MODE === 'production' ? '/stuup' : '/'),
  routes,
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;

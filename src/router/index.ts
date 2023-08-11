import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

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
  {
    path: '/screen',
    name: 'Test',
    component: () => import('@/views/screen/index.vue'),
  },
  {
    path: '/portrait',
    name: 'Portrait',
    component: () => import('@/views/portrait/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.MODE === 'production' ? '/stuup' : '/',
  ),
  routes,
})

export const resetRouter = () => {
  const resetWhiteNameList = ['Redirect', 'Login', '404']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router

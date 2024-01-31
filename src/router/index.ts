import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
import setting from '@/setting'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoute,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !setting?.whiteRouterName.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router

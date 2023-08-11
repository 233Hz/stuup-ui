import router from '@/router'
import NProgress from '@/utils/progress'
import { existToken } from '@/utils/auth'
import pinia from './store'
import { reqQueryUserAuthority } from '@/api/system/user/index'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/premission'
import useFlowersStore from './store/modules/flowers'
import pageRouter from '@/router/pageRouter'
import _ from 'lodash'

const userStore = useUserStore(pinia)
const flowersStore = useFlowersStore(pinia)
const premissionStore = usePermissionStore(pinia)

const whiteList: string[] = ['/login', '/404', '/screen', '/portrait']

// ↓全局后置钩子
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!flowersStore.isExist) {
        await flowersStore.getFlowers()
      }
      if (_.isEmpty(premissionStore.routers)) {
        try {
          const { data: res } = await reqQueryUserAuthority()
          premissionStore.generateRoutes(res)
          const asyncRouters = premissionStore.routers
          const mergeRouters = [
            ...asyncRouters,
            ...pageRouter,
            {
              path: '/:pathMatch(.*)',
              redirect: '/404',
            },
          ]
          mergeRouters.forEach((route) => router.addRoute(route))
          next({ ...to, replace: true })
          console.log(router.getRoutes())
        } catch (error) {
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

// ↓全局后置钩子
router.afterEach(() => {
  NProgress.done()
})

import router from '@/router'
import pinia from './store'
import NProgress from '@/utils/progress'
import { existToken } from '@/utils/auth'
import usePermissionStore from '@/store/modules/permission'
import useFlowersStore from './store/modules/flowers'
import _ from 'lodash'
import setting from '@/setting'

const flowersStore = useFlowersStore(pinia)
const premissionStore = usePermissionStore(pinia)

// ↓全局后置钩子
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else if (to.path === '/404') {
      next({ path: '/home' })
    } else {
      if (!flowersStore.isExist) {
        await flowersStore.getFlowers()
      }
      if (_.isEmpty(premissionStore.routes)) {
        await premissionStore.generateRoutes()
        premissionStore.routes.forEach((route) => {
          if (!router.hasRoute(route.name!)) {
            router.addRoute(route)
          }
        })
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (setting?.whiteRouter.includes(to.path)) {
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

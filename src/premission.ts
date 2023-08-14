import router from '@/router'
import pinia from './store'
import NProgress from '@/utils/progress'
import { existToken } from '@/utils/auth'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/premission'
import useFlowersStore from './store/modules/flowers'
import _ from 'lodash'
import setting from '@/setting'

const userStore = useUserStore(pinia)
const flowersStore = useFlowersStore(pinia)
const premissionStore = usePermissionStore(pinia)

// ↓全局后置钩子
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else if (to.path === '/404') {
      next({ path: '/' })
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

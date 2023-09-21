import router from '@/router'
import pinia from './store'
import NProgress from '@/utils/progress'
import useUserStore from './store/modules/user'
import usePermissionStore from '@/store/modules/permission'
import useFlowersStore from './store/modules/flowers'
import setting from '@/setting'
import { existToken } from '@/utils/auth'
import { reqUserInfoPermission } from '@/api/login'

const userStore = useUserStore(pinia)
const flowersStore = useFlowersStore(pinia)
const permissionStore = usePermissionStore(pinia)

// ↓全局后置钩子
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else if (to.path === '/404') {
      next({ path: '/home' })
    } else {
      if (!userStore.isSet) {
        const {
          data: {
            userInfo,
            roles,
            permissions,
            flowerConfig,
            menus,
            growthInfo,
            otherInfo,
          },
        } = await reqUserInfoPermission()
        userStore.setUserInfo(userInfo)
        userStore.setRoles(roles)
        userStore.setPermissions(permissions)
        userStore.setGrowthInfo(growthInfo)
        userStore.setOtherInfo(otherInfo)
        userStore.updateIsSet()
        flowersStore.setFlowerModel(flowerConfig)
        permissionStore.generateRoutes(menus).forEach((route) => {
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

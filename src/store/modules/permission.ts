import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'
import type { PermissionState } from './types/type'
import type { RouteRecordRaw } from 'vue-router'
import type { UserMenu } from '@/api/system/user/type'
import { reqUserAuthority } from '@/api/system/user/index'
import { MENU_TYPE, WHETHER } from '@/utils/dict'

const Layout = () => import('@/layout/index.vue')
const compModels = import.meta.glob('../../views/**/index.vue')

interface MenuTree extends UserMenu {
  children?: MenuTree[]
}

const usePermissionStore = defineStore('Permission', {
  state: (): PermissionState => {
    return {
      hasBackEntrance: false, // 是否有后台权限
      routes: [],
      cachedView: new Set(),
    }
  },
  getters: {
    getCachedView(): string[] {
      return Array.from(this.cachedView)
    },
  },
  actions: {
    /**
     * 生成路由
     */
    async generateRoutes(): Promise<void> {
      return new Promise((resolve) => {
        reqUserAuthority().then(({ data }) => {
          this.hasBackEntrance = data.some((menu) => menu.path === '/dashboard')
          // 过滤出缓存路由名
          this.cachedView = new Set(
            data
              .filter((menu) => menu.keepAlive === WHETHER.YES)
              .map((menu) => menu.code),
          )
          // 生成路由
          const asyncRouter = formatRouter(data)
          this.routes = constantRoute.concat(asyncRouter)
          resolve()
        })
      })
    },
  },
})

// 排序
const sortTree = (routerTree: MenuTree[]) => {
  routerTree.sort((a, b) => a.sort - b.sort)
  routerTree.forEach((item) => {
    if (item.children && item.children.length > 0) {
      sortTree(item.children)
    }
  })
}

const findRedirect = (menu: MenuTree): string => {
  if (menu.children && menu.children.length) {
    return menu.path + menu.children[0].path
  }
  return menu.redirect || ''
}

const findComp = (menu: MenuTree, path: string = ''): any => {
  if (!menu.children) {
    const compPath = `../../views${path}/index.vue`
    return compModels[compPath]
  }
  return undefined
}

const onlyFirstLevelMenu = (menu: MenuTree): boolean => {
  return (menu.pid === 0 && !menu.children) || menu.children?.length === 0
}

const isFirstLevelMenu = (menu: MenuTree): boolean => {
  return (
    menu.pid === 0 && menu.children !== undefined && menu.children.length > 0
  )
}

const formatRouter = (menus: UserMenu[]): RouteRecordRaw[] => {
  const menuObj: Record<number, UserMenu> = {}
  menus.forEach((menu) => (menuObj[menu.oid!] = menu))
  const routerTree: MenuTree[] = []
  menus.forEach((menu) => {
    const parentRouter: MenuTree = menuObj[menu.pid!]
    if (parentRouter) {
      // * 当前项有父节点
      const children = parentRouter.children || []
      children.push(menu)
      parentRouter.children = children
    } else {
      // * 当前项没有父节点 -> 顶层
      routerTree.push(menu)
    }
  })

  const findPath = (menu: UserMenu): string => {
    const menuPath = menu.path
    const parent = menuObj[menu.pid!]
    if (parent) {
      return findPath(parent) + menuPath
    }
    return menuPath
  }

  const format = (menus: MenuTree[]): RouteRecordRaw[] => {
    return menus.map((menu) => {
      const path = findPath(menu)
      let children: RouteRecordRaw[] = []
      if (menu.children && menu.children.length) {
        children = format(menu.children)
      }
      const meta = {
        title: menu.name,
        flag: menu.flag,
        icon: menu.icon || '',
        hidden: false,
        useLayout: menu.useLayout,
        keepAlive: menu.keepAlive,
      }
      if (onlyFirstLevelMenu(menu) && menu.useLayout === WHETHER.YES) {
        return {
          path: '',
          name: `${menu.code}Parent`,
          component: Layout,
          meta: meta,
          children: [
            {
              path,
              name: menu.code,
              component: findComp(menu, path),
              meta,
            },
          ],
        }
      } else if (
        isFirstLevelMenu(menu) &&
        menu.type === MENU_TYPE.CATALOG &&
        menu.useLayout === WHETHER.YES
      ) {
        return {
          path,
          name: menu.code,
          component: Layout,
          redirect: menu.redirect || findRedirect(menu),
          children: children,
          meta,
        }
      } else {
        return {
          path,
          name: menu.code,
          component: findComp(menu, path),
          redirect: menu.redirect || findRedirect(menu),
          children: children,
          meta,
        }
      }
    })
  }

  // 排序
  sortTree(routerTree)
  // 生成路由
  const router = format(routerTree)

  return router
}

export default usePermissionStore

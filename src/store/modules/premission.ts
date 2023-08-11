import { defineStore } from 'pinia'
import asyncRouters from '@/router/asyncRouters'
import type { PermissionState } from './types/type'
import type { RouteRecordRaw } from 'vue-router'
import type { Menu, MenuList } from '@/api/system/menu/type'
import { MENU_TYPE } from '@/utils/dict'

const Layout = () => import('@/layout/index.vue')
const compModels = import.meta.glob('../../views/**/index.vue')

let usePermissionStore = defineStore('Permission', {
  state: (): PermissionState => {
    return {
      routers: [],
      // 前端菜单
      frontAsideRouters: [],
      // 后端菜单
      backAsideRouters: [],
    }
  },
  getters: {},
  actions: {
    /**
     * 生成路由
     */
    generateRoutes(menus: MenuList) {
      const dynamicRouter = formatRouter(menus)
      const rewriteRoutes = [...asyncRouters, ...dynamicRouter]
      this.routers = rewriteRoutes
      const frontMenus = formatAsideMenu(rewriteRoutes, MENU_TYPE.FRONT)
      this.frontAsideRouters = frontMenus
      const backMenus = formatAsideMenu(rewriteRoutes, MENU_TYPE.BACK)
      this.backAsideRouters = backMenus
    },
  },
})

const formatRouter = (menus: MenuList): RouteRecordRaw[] => {
  const obj: Record<number, Menu> = {}
  menus.forEach((menu) => (obj[menu.oid!] = menu))
  const routerTree: MenuList = []
  menus.forEach((menu) => {
    const parentRouter = obj[menu.pid!]
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

  const findPath = (menu: Menu, path: string = ''): string => {
    const menuPath = menu.path
    const parent = obj[menu.pid!]
    if (parent) {
      return findPath(parent, menuPath) + menuPath
    }
    return menuPath
  }

  const findRedirect = (menu: Menu): string => {
    if (menu.children && menu.children.length) {
      return menu.path + menu.children[0].path
    }
    return menu.redirect || ''
  }

  const findComp = (menu: Menu, path: string = ''): any => {
    if (!menu.children) {
      const compPath = `../../views${path}/index.vue`
      return compModels[compPath]
    }
    return undefined
  }

  const onlyFirstLevelMenu = (menu: Menu): boolean => {
    return (menu.pid === 0 && !menu.children) || menu.children?.length === 0
  }

  const isFirstLevelMenu = (menu: Menu): boolean => {
    return (
      menu.pid === 0 && menu.children !== undefined && menu.children.length > 0
    )
  }

  const format = (menus: MenuList): RouteRecordRaw[] => {
    return menus.map((menu) => {
      const path = findPath(menu)
      const name = path.split('/').filter(Boolean).join('-') || 'index'
      const compPath = findComp(menu, path)
      let children: RouteRecordRaw[] = []
      if (menu.children && menu.children.length) {
        children = format(menu.children)
      }
      const meta = {
        title: menu.name,
        flag: menu.flag,
        hidden: menu.hidden,
      }
      if (onlyFirstLevelMenu(menu)) {
        return {
          path,
          name: `${name}Parent`,
          component: Layout,
          meta: {},
          children: [
            {
              path: '',
              name,
              component: compPath,
              meta,
            },
          ],
        }
      } else if (isFirstLevelMenu(menu)) {
        return {
          path,
          name,
          component: Layout,
          redirect: findRedirect(menu),
          children: children,
          meta,
        }
      } else {
        return {
          path,
          name,
          component: compPath,
          redirect: findRedirect(menu),
          children: children,
          meta,
        }
      }
    })
  }

  const router = format(routerTree)

  return router
}

const formatAsideMenu = (routers: RouteRecordRaw[], flag: number): MenuList => {
  const filterRouter = filterRouterFlag(showOneChild(routers), flag)
  return formatMenu(filterRouter)
}

const filterRouterFlag = (
  routers: RouteRecordRaw[],
  flag: number,
): RouteRecordRaw[] => {
  return routers.filter((router) => {
    if (router.meta?.flag === flag) {
      if (router.children && router.children.length) {
        router.children = filterRouterFlag(router.children, flag)
      }
      return true
    }
  })
}

const formatMenu = (router: RouteRecordRaw[]): MenuList => {
  return router.map((router) => {
    let child: MenuList = []
    if (router.children && router.children.length) {
      child = formatMenu(router.children)
    }
    return {
      name: router.meta?.title || '',
      path: router.path,
      icon: router.meta?.icon || '',
      children: child,
    } as Menu
  })
}

const showOneChild = (routers: RouteRecordRaw[]): RouteRecordRaw[] => {
  // 只处理一级路由
  return routers.map((router) => {
    if (router.children?.length === 1) {
      const child = router.children[0] as RouteRecordRaw
      if (!child.children || child.children.length === 0) {
        child.path = router.path
        return child
      }
    }
    return router
  })
}

export default usePermissionStore

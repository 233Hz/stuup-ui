import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'
import type { PermissionState } from './types/type'
import type { RouteRecordRaw } from 'vue-router'
import type { Menu, MenuTree } from '@/api/system/menu/type'
import { reqUserAuthority } from '@/api/system/user/index'

const Layout = () => import('@/layout/index.vue')
const compModels = import.meta.glob('../../views/**/index.vue')

let usePermissionStore = defineStore('Permission', {
  state: (): PermissionState => {
    return {
      routes: [],
    }
  },
  getters: {},
  actions: {
    /**
     * 生成路由
     */
    async generateRoutes(): Promise<void> {
      return new Promise((resolve) => {
        reqUserAuthority().then(({ data }) => {
          const asyncRouter = formatRouter(data)
          asyncRouter.push({
            path: '/:pathMatch(.*)',
            redirect: '/404',
            name: 'NotFound',
            meta: {
              title: 'NotFound',
              icon: '',
              hidden: true,
              flag: 3,
            },
          })
          this.routes = constantRoute.concat(asyncRouter)
          resolve()
        })
      })
    },
  },
})

const formatRouter = (menus: Menu[]): RouteRecordRaw[] => {
  const menuObj: Record<number, Menu> = {}
  menus.forEach((menu) => (menuObj[menu.oid!] = menu))
  let routerTree: MenuTree[] = []
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

  console.log(routerTree)

  const findPath = (menu: Menu): string => {
    const menuPath = menu.path
    const parent = menuObj[menu.pid!]
    if (parent) {
      return findPath(parent) + menuPath
    }
    return menuPath
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

  const format = (menus: MenuTree[]): RouteRecordRaw[] => {
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
        icon: menu.icon || '',
        hidden: menu.hidden || false,
      }
      if (onlyFirstLevelMenu(menu)) {
        return {
          path: '',
          name: `${name}Parent`,
          component: Layout,
          meta: meta,
          children: [
            {
              path,
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

export default usePermissionStore

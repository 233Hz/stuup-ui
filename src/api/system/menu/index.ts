import { get, post, put, del } from '@/api/api'
import { Tree } from '@/types/global'
import { Menu, MenuTree } from './type'

enum API {
  MENU_TREE_LIST = '/menu',
  MENU_ADD = '/menu',
  MENU_UPDATE = '/menu',
  MENU_DEL = '/menu',
}

export const reqMenuTreeList = async () => get<MenuTree[]>(API.MENU_TREE_LIST)

export const menuTree = async () => {
  return await get<Tree[]>('/menu/tree')
}

export const reqAddMenu = async (menu: Menu) => post<Menu>(API.MENU_ADD, menu)

export const reqUpdateMenu = async (menu: Menu) =>
  put<Menu>(API.MENU_UPDATE, menu)

export const reqDelMenu = async (id: number) =>
  del<number>(API.MENU_DEL, { id })

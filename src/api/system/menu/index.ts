import { get, post } from '@/api/api'
import { Tree } from '@/types/global'
import { Menu } from './type'

export const getMenuTree = async (params: { name?: string; code?: string }) =>
  get<Menu[]>('/user/list', params)

export const saveMenu = async (data: Menu) => {
  return await post<number>('/user/save', data)
}

export const menuTree = async () => {
  return await get<Tree[]>('/menu/tree')
}

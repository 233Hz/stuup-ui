import { get, post } from '@/api/api'
import { Tree } from '@/types/global'
import { MenuList } from './type'

export interface MenuVO {
  oid?: number
  pid?: number
  name: string
  code?: string
  path: string
  flag?: number
  icon?: string
  redirect?: string
  hidden?: boolean
  children?: MenuVO[] | []
}

export const getMenuTree = async (params: { name?: string; code?: string }) =>
  get<MenuList>('/user/list', params)

export const saveMenu = async (data: MenuVO): Promise<ApiResult<number>> => {
  return await post('/user/save', data)
}

export const menuTree = async (): Promise<ApiResult<Tree[]>> => {
  return await get('/menu/tree')
}

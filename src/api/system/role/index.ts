import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RoleVO, RoleDictVO } from './type'

export const getRoleList = async () => {
  return await get<RoleDictVO[]>('/role/all')
}
export const getRolePage = async (params: Page) => {
  return await get<PageResult<RoleVO[]>>('/role/list', params)
}

export const saveRole = async (data: RoleVO) => {
  return await post<number>('/role/save', data)
}

export const delRole = async (roleIds: string | number) => {
  return await post('/role/del/', { ids: roleIds })
}

export const getRoleMenu = async (roleId: string | number) => {
  return await get<number[]>('/role/getRoleMenu/' + roleId)
}

export const setRoleMenu = async (roleId: number, menuIds: number[]) => {
  return await post('/role/setRoleMenu', {
    roleId,
    menuIds,
  })
}

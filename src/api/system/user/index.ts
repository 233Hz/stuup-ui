import { get, post } from '@/api/api'
import type { Page, PageResult } from '@/types/global'
import type { Menu } from '@/api/system/menu/type'
import type { UserVO, SimpleUserVO, UserDictVO, CusUser } from './type'

enum API {
  QUERY_USER_AUTHORITY = '/user/queryUserAuthority',
}

export const getUserList = async () => {
  return await get<UserDictVO[]>('/user/all')
}

export const getSimpleUserPage = async (params: Page) => {
  return await get<SimpleUserVO[]>('/user/getSimpleUserPage', params)
}

export const getUserPage = async (params: Page) => {
  return await get<PageResult<UserVO[]>>('/user/list', params)
}

export const saveOrUpdateUser = async (data: UserVO) => {
  return await post<number>('/user/save', data)
}

export const delUser = async (ids: string) => {
  return await post('/user/del', { ids })
}

/**
 * 查询用户菜单权限
 */
export const reqUserAuthority = () => post<Menu[]>(API.QUERY_USER_AUTHORITY)

export const getUserInfo = async () => {
  return get<CusUser>('/user/info')
}

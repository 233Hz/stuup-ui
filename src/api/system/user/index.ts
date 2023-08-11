import { ApiResult, get, post } from '@/api/api'
import type { Page, PageResult } from '@/types/global'
import type { MenuList } from '@/api/system/menu/type'

enum API {
  QUERY_USER_AUTHORITY = '/user/queryUserAuthority',
}

export interface UserVO {
  oid?: number
  loginName: string
  userName: string
  sex: number | undefined
  mobile: string
  degree: string
  teacherType: number | undefined
  userType: number | undefined
  deptId: number | undefined
  idCard: string
  birthday: Date | undefined
  state: number | undefined
  roles: number[]
  createTime?: Date
}

export interface SimpleUserVO {
  id: number
  username: string
  teacherNo: string
  deptName: string
}

export interface UserDictVO {
  oid: number
  value: string
  disabled: boolean
}

export interface CusUser {
  userId: number
  userName: string
  loginName: string
  sex: number
  idCard: string
  birthday: string
  mobile: string
  deptId: number
  deptName: string
  userType: number
  degree: string
  roleIds: number[]
  yearId: number
}

export const getUserList = async (): Promise<ApiResult<UserDictVO[]>> => {
  return await get('/user/all')
}

export const getSimpleUserPage = async (
  params: Page,
): Promise<ApiResult<PageResult<SimpleUserVO[]>>> => {
  return await get('/user/getSimpleUserPage', params)
}

export const getUserPage = async (
  params: Page,
): Promise<ApiResult<PageResult<UserVO[]>>> => {
  return await get('/user/list', params)
}

export const saveOrUpdateUser = async (
  data: UserVO,
): Promise<ApiResult<number>> => {
  return await post('/user/save', data)
}

export const delUser = async (ids: string) => {
  return await post('/user/del', { ids })
}

/**
 * 查询用户菜单权限
 */
export const reqQueryUserAuthority = () =>
  post<MenuList>(API.QUERY_USER_AUTHORITY)

export const getUserInfo = async (): Promise<ApiResult<CusUser>> => {
  return get('/user/info')
}

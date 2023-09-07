import { get, post } from '@/api/api'
import type { Page, PageResult } from '@/types/global'
import type {
  UserVO,
  UserDictVO,
  CusUser,
  UserMenu,
  UpdatePasswordForm,
} from './type'

enum API {
  QUERY_USER_AUTHORITY = '/user/queryUserAuthority',
  DEL_USER = '/user/del',
  SAVE_OR_UPDATE_USER = '/user/save',
  USER_PAGE = '/user/list',
  ALL_USER = '/user/all',
  USER_INFO = '/user/info',
  UPDATE_PASSWORD = '/user/updatePassword',
  UPDATE_AVATAR = '/user/updateAvatar',
}

export const getUserList = async () => {
  return await get<UserDictVO[]>(API.ALL_USER)
}

export const getUserPage = async (params: Page) => {
  return await get<PageResult<UserVO[]>>(API.USER_PAGE, params)
}

export const saveOrUpdateUser = async (data: UserVO) => {
  return await post<number>(API.SAVE_OR_UPDATE_USER, data)
}

export const delUser = async (ids: string) => {
  return await post(API.DEL_USER, { ids })
}

/**
 * 查询用户菜单权限
 */
export const reqUserAuthority = () => post<UserMenu[]>(API.QUERY_USER_AUTHORITY)

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = async () => {
  return get<CusUser>(API.USER_INFO)
}

/**
 * 修改密码
 * @returns
 */
export const updatePassword = async (data: UpdatePasswordForm) => {
  return post(API.UPDATE_PASSWORD, data)
}

/**
 * 修改头像
 * @param avatarId
 * @returns
 */
export const updateAvatar = async (avatarId: number) => {
  return get<string>(API.UPDATE_AVATAR, { avatarId })
}

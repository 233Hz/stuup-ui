import { get, post } from '@/api/api'
import type { LoginForm, LoginUserVO, UserInfoPermissionVO } from './type'
import type { SaResult } from '@/types/global'

enum API {
  LOGIN = '/login',
  LOGOUT = '/saToken/logout',
  USER_INFO_PERMISSION = '/user/userInfoPermission',
  OPEN_SAFE = '/saToken/openSafe',
}

export const reqLogin = async (data: LoginForm) =>
  post<LoginUserVO>(API.LOGIN, data)

export const reqLogout = async (userId: number) =>
  get<SaResult<any>>(API.LOGOUT, { userId })

export const reqUserInfoPermission = async () =>
  get<UserInfoPermissionVO>(API.USER_INFO_PERMISSION)

export const reqOpenSafe = (code: string, password: string) =>
  get<string>(API.OPEN_SAFE, { code, password })

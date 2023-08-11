import { post } from '@/api/api'
import type { LoginForm, LoginUserVO } from './type'

enum API {
  USER_LOGIN_URL = '/login',
}

export const reqLogin = async (data: LoginForm) =>
  post<LoginUserVO>(API.USER_LOGIN_URL, data)

import type { RouteRecordRaw } from 'vue-router'
import type { FlowerVO } from '@/api/grow/model/type'
import type { LoginUserVO } from '@/api/login/type'

export interface UserInfoState {
  userInfo: LoginUserVO
}

export interface PermissionState {
  routes: RouteRecordRaw[]
}

export interface FlowersState {
  flowers: FlowerVO
  isExist: boolean
}

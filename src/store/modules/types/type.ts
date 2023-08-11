import type { RouteRecordRaw } from 'vue-router'
import type { FlowerVO } from '@/api/grow/model/type'
import type { LoginUserVO } from '@/api/login/type'
import type { MenuList } from '@/api/system/menu/type'

export interface UserInfoState {
  userInfo: LoginUserVO
}

export interface PermissionState {
  routers: RouteRecordRaw[]
  frontAsideRouters: MenuList
  backAsideRouters: MenuList
}

export interface FlowersState {
  flowers: FlowerVO
  isExist: boolean
}

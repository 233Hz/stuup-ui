import type { RouteRecordRaw } from 'vue-router'
import type { FlowerVO } from '@/api/grow/model/type'
import type { LoginUserVO } from '@/api/login/type'
import type { GrowthTreeVO } from '@/api/grow/config/type'
import { FacultyDict } from '@/api/basic/faculty/type'
import { GradeDict } from '@/api/basic/grade/type'
import { MajorDict } from '@/api/basic/major/type'
import { UserDictVO } from '@/api/system/user/type'

export interface UserInfoState {
  userInfo: LoginUserVO
}

export interface PermissionState {
  routes: RouteRecordRaw[]
  cachedView: Set<string>
}

export interface FlowersState {
  flowers: FlowerVO
  isExist: boolean
}

export interface GrowthState {
  level1: GrowthTreeVO[]
  level2: GrowthTreeVO[]
  level3: GrowthTreeVO[]
}

export interface BasicInfoState {
  user: UserDictVO[]
  grade: GradeDict[]
  faculty: FacultyDict[]
  major: MajorDict[]
}

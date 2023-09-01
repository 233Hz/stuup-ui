import type { RouteRecordRaw } from 'vue-router'
import type { FlowerVO } from '@/api/grow/model/type'
import type { LoginUserVO } from '@/api/login/type'
import type { GrowthTreeVO } from '@/api/grow/config/type'
import type { FacultyDict } from '@/api/basic/faculty/type'
import type { GradeDict } from '@/api/basic/grade/type'
import type { MajorDict } from '@/api/basic/major/type'
import type { UserDictVO } from '@/api/system/user/type'
import type { YearDictVO } from '@/api/basic/year/type'
import type { DeptDict } from '@/api/basic/dept/type'
import type { RoleDictVO } from '@/api/system/role/type'

export interface UserInfoState {
  userInfo: LoginUserVO
}

export interface PermissionState {
  hasBackEntrance: boolean
  routes: RouteRecordRaw[]
  cachedView: Set<string>
}

export interface Flower {
  key: string
  name: string
  conversionCount: number
  image: string
}
export interface FlowerGrowStage extends Flower {
  count: number
}
export interface FlowerMaxStage {
  current: Flower
  next: Flower
}

export interface FlowersState {
  flowerConversionOption: FlowerVO
  flowers: Flower[]
  readonly flowerIconOption: Record<string, { src: string; name: string }>
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
  year: YearDictVO[]
  dept: DeptDict[]
  role: RoleDictVO[]
}

export interface PaginationState {
  current: number
  size: number
  total: number
}

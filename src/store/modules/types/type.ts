import type { RouteRecordRaw } from 'vue-router'
import type { FlowerVO } from '@/api/grow/model/type'
import type { GrowthTreeVO } from '@/api/grow/config/type'
import type { FacultyDict } from '@/api/basic/faculty/type'
import type { GradeDict } from '@/api/basic/grade/type'
import type { MajorDict } from '@/api/basic/major/type'
import type { YearDictVO } from '@/api/basic/year/type'
import type { DeptDict } from '@/api/basic/dept/type'
import type { RoleDictVO } from '@/api/system/role/type'
import type { Class } from '@/api/basic/class/type'
import type { SemesterDict } from '@/api/basic/semester/type'
import type { SaTokenInfo } from '@/types/global'
import type { UserInfo, GrowthInfo, OtherInfo } from '@/api/login/type'

export interface UserInfoState {
  userInfo: UserInfo
  tokenInfo: SaTokenInfo
  roles: string[]
  permissions: string[]
  growthInfo: GrowthInfo
  otherInfo: OtherInfo
  isSet: boolean
  updatePasswordTips: boolean
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
}

export interface GrowthState {
  level1: GrowthTreeVO[]
  level2: GrowthTreeVO[]
  level3: GrowthTreeVO[]
  isInit: boolean
}

export interface BasicInfoState {
  year: YearDictVO[]
  semester: SemesterDict[]
  grade: GradeDict[]
  faculty: FacultyDict[]
  major: MajorDict[]
  dept: DeptDict[]
  role: RoleDictVO[]
  class: Class[]
  isInit: boolean
}

export interface PaginationState {
  current: number
  size: number
  total: number
}

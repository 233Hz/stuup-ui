import { WHETHER } from '@/utils/dict'

enum IS_CURRENT {
  YES = WHETHER.YES,
  NO = WHETHER.NO,
}

interface Semester {
  id: number
  name: string
  isCurrent: IS_CURRENT
}

export interface LoginForm {
  loginName: string
  password: string
}

export interface LoginUserVO {
  userId: number
  loginName: string
  userName: string
  mobile: string
  deptId: number
  userType: number
  roleIds: string
  yearId: number
  semesterId: number
  avatar: string
  ranking: number
  totalScore: number
  studentId?: number
  semesters?: Semester[]
}

export interface UserInfo {
  userId: number
  userName: string
  userType: number
  avatarUrl?: string
}

export interface Menu {
  id: number
  pid: number
  name: string
  code: string
  path: string
  icon: string
  type: number
  flag: number
  sort: number
  keepAlive: number
  layout: number
  hidden: number
  redirect: string
}

export interface FlowerConfig {
  bmhSeed: number
  bmhSprout: number
  bmhBloom: number
  bmhFruit: number
  xcjSeed: number
  xcjSprout: number
  xcjBloom: number
  xcjFruit: number
  xhhSeed: number
  xhhSprout: number
  xhhBloom: number
  xhhFruit: number
}

export interface GrowthInfo {
  totalScore: number
  rank?: number
}

export interface OtherInfo {
  studentId?: number
  yearId: number
  semesterId: number
}

export interface UserInfoPermissionVO {
  userInfo: UserInfo
  menus: Menu[]
  roles: string[]
  permissions: string[]
  flowerConfig: FlowerConfig
  growthInfo: GrowthInfo
  otherInfo: OtherInfo
}

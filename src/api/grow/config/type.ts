import { Page } from '@/types/global'

export interface GrowthTreeVO {
  id: number
  pid: number
  name: string
  description: string
  sort: number
  children?: GrowthTreeVO[] | []
}

export interface GrowthVO {
  id: number
  pid: number
  name: string
  description?: string
  sort?: number
}

export interface GrowthItemVO {
  id: number
  name: string
  code: string
  description?: string
  scorePeriod?: number
  scoreUpperLimit: number
  collectLimit: number
  calculateType?: number
  score?: number
  gatherer?: number
  growthItems: number[]
  firstLevelId: number
  secondLevelId?: number
  threeLevelId?: number
}

export interface SetGrowUserForm {
  assignType: number
  growthItemId: number
  userIds: number[]
}

export interface GrowthItemUser {
  id: number
  username: string
  loginName: string
  deptName: string
  className: string
}

export interface GrowthItemUserQuery extends Page {
  userType?: number
  username?: string
  loginName?: string
  deptId?: number
  classId?: number
}

export interface GrowthRuleDesc {
  id: number
  l1Id: number
  l2Id?: number
  l3Id?: number
  l1: string
  l2?: string
  l3?: string
  name: number
  cycle: string
  cycleUpperLimit?: string
  score: string
  calculateType: string
}

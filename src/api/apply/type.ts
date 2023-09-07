import { Page } from '@/types/global'

export interface StudentGrowthItems {
  id: number
  name: string
  firstLevelId: number
  secondLevelId: number
  thirdLevelId: number
  firstLevelName: string
  secondLevelName: string
  thirdLevelName: string
}

export interface GrowthItemApplyForm {
  id?: number
  growId: number
  reason: string
  fileIds?: string
}

export interface GrowApplyRecord {
  id: number
  yearName: string
  semesterName: string
  l1Name: string
  l2Name?: string
  l3Name?: string
  growthItemId: number
  growthItemName: string
  growthItemScore: number
  applicantName: string
  auditorName: string
  submitterName: string
  className: string
  reason: string
  fileIds: string
  state: number
  createTime: Date
}

export interface AuditLog {
  id: number
  username: number
  state: number
  reason: string
  createTime: Date
}

export interface PageRecordQuery extends Page {
  yearId?: number
  semesterId?: number
  l1Id?: number
  l2Id?: number
  l3Id?: number
  growthItemName?: string
  state?: number
}

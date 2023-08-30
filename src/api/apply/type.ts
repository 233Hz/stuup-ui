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

export interface AudGrow {
  id?: number
  growId: number
  reason: string
  fileIds?: string
}

export interface GrowApplyRecord {
  id: number
  growId: number
  firstLevelName: string
  secondLevelName: string
  thirdLevelName: string
  auditor: string
  growName: string
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

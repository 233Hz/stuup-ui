export interface GrowAuditRecord {
  id: number
  growId: number
  firstLevelName: string
  secondLevelName: string
  thirdLevelName: string
  applicant: string
  growName: string
  reason: string
  fileIds: string
  state: number
  createTime: Date
}

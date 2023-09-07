export interface GrowAuditRecord {
  id: number
  yearName: string
  semesterName: string
  l1Name: string
  l2Name: string
  l3Name: string
  growthItemId: number
  growthItemName: string
  growthItemScore: number
  applicantName: string
  submitterName: string
  reason: string
  fileIds: string
  state: number
  createTime: Date
}

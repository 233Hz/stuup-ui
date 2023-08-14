export interface RecLogVO {
  id?: number
  yearName: string
  firstLeveName?: string
  secondLevelName?: string
  threeLevelName?: string
  growName: string
  createTime: string
  createUser: string
  batchCode: number
}

export interface RecDefaultVO {
  id: number
  grawName: string
  className: string
  studentName: string
  studentNo: string
  idCard: string
  growName: string
  createTime: Date
  remark: string
}

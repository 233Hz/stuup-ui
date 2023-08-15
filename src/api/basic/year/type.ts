export interface YearVO {
  oid?: number
  yearName: string
  yearRange: string[]
  yearStart: string
  yearEnd: string
  lastSemester: string
  nextSemester: string
  curr?: number
  createUser?: string
  createTime?: Date
}

export interface YearDictVO {
  oid: number
  value: string
  display: boolean
}

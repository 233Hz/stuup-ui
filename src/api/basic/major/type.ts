export interface Major {
  oid?: number
  majorCode: string
  majorName: string
  facultyId: number | undefined
  system: number | undefined
  state: number | undefined
  facultyName?: string
  createTime?: Date
}

export interface MajorDict {
  oid: number
  majorCode: string
  majorName: string
  facultyId: number
  facultyName: string
  state: number
  system: number
}

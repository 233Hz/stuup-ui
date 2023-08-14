export interface StudentSemesterInfo {
  id: number
  name: string
  isCurrent: 1 | 2
}
export type StudentSemesterInfoList = StudentSemesterInfo[]

export interface SemesterVO {
  id: number
  yearName: string
  name: string
  startTime: Date
  endTime: Date
  createTime: Date
}

export interface SemesterDTO {
  id?: number
  yearId: string
  name: string
  startTime: Date
  endTime: Date
}

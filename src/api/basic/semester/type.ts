export interface SemesterVO {
  id: number
  yearId: number
  year?: number
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

export interface SemesterDict {
  id: number
  name: string
}

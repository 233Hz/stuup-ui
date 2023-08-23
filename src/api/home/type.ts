export interface WholeSchoolTop10 {
  studentName: string
  avatar: string
  className: string
  classTeacher: string
  ranking: number
  score: number
}
export type WholeSchoolTop10List = WholeSchoolTop10[]

export interface WholeClassTop10 {
  className: string
  classTeacher: string
  ranking: number
  score: number
  avatar: string
}
export type WholeClassTop10List = WholeClassTop10[]

export interface ProgressTop10 {
  studentName: string
  className: string
  classTeacher: string
  ranking: number
  score: number
  riseRanking: number
  avatar: string
}
export type ProgressTop10List = ProgressTop10[]

export interface UnCollectScore {
  id: number
  score: number
}

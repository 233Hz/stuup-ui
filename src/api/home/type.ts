export interface WholeSchoolTop10 {
  studentName: string
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
}
export type WholeClassTop10List = WholeClassTop10[]

export interface ProgressTop10 {
  studentName: string
  className: string
  classTeacher: string
  ranking: number
  score: number
  riseRanking: number
}
export type ProgressTop10List = ProgressTop10[]

interface UnearnedPoints {
  id: number
  score: number
}

export interface GrowthInfo {
  studentName: string
  totalScore: number
  ranking: number
  unearnedPoints: UnearnedPoints[]
}

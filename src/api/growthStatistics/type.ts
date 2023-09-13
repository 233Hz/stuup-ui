export interface GrowthStatisticsVO {
  yearName: string
  semesterName: string
  majorName: string
  className: string
  gradeName: string
  classTeacher: string
  studentId: number
  studentName: string
  studentNo: string
  semesterScore: number
  semesterRank: number
  lastSemesterCompare: number
  compareResult: number
  applyCount: number
  totalScore: number
  finalGrades: number
}

export interface GrowthStatisticsParams {
  yearId: number
  semesterId: number
}

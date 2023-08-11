import { ApiResult, get } from '@/api/api'

export interface SchoolRankVO {
  studentId: number
  rank: number
  studentName: string
  studentNo: string
  gradeName: string
  className: string
  classTeacher: string
  facultyName: string
  majorName: string
  score: number
}

export const getSchoolRank = async (): Promise<ApiResult<SchoolRankVO[]>> => {
  return await get('/rank/realTime/school')
}

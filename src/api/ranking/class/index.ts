import { ApiResult, get } from '@/api/api'

export interface ClassRankVO {
  classId: number
  rank: number
  className: string
  classTeacher: string
  gradeName: string
  facultyName: string
  majorName: string
  score: number
}

export const getClassRank = async (): Promise<ApiResult<ClassRankVO[]>> => {
  return await get('/rank/realTime/class')
}

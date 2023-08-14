import { get } from '@/api/api'
import type { SchoolRankVO } from './type'

export const getSchoolRank = async () => {
  return await get<SchoolRankVO[]>('/rank/realTime/school')
}

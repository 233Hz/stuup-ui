import { get } from '@/api/api'
import type { FacultyRankVO } from './type'

export const getFacultyRank = async () => {
  return await get<FacultyRankVO[]>('/rank/realTime/faculty')
}

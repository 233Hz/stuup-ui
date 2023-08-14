import { get } from '@/api/api'
import type { ClassRankVO } from './type'

export const getClassRank = async () => {
  return await get<ClassRankVO[]>('/rank/realTime/class')
}

import { get } from '@/api/api'
import type { MajorRankVO } from './type'

export const getMajorRank = async () => {
  return await get<MajorRankVO[]>('/rank/realTime/major')
}

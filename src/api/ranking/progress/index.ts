import { get } from '@/api/api'
import type { ProgressRankVO } from './type'

export const getProgressRank = async () => {
  return await get<ProgressRankVO[]>('/rank/progress')
}

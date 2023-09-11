import { get } from '@/api/api'
import type { PageResult } from '@/types/global'
import type { RecScoreQuery, RecScoreVO } from '../type'

enum API {
  REC_DEDUCT_SCORE = '/recDeductScore/page',
}

export const reqRecDeductScorePage = async (params: RecScoreQuery) => {
  return await get<PageResult<RecScoreVO[]>>(API.REC_DEDUCT_SCORE, params)
}

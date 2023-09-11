import { get } from '@/api/api'
import type { PageResult } from '@/types/global'
import type { RecScoreQuery, RecScoreVO } from '../type'

enum API {
  REC_ADD_SCORE = '/recScore/page',
}

export const reqRecAddScorePage = async (params: RecScoreQuery) => {
  return await get<PageResult<RecScoreVO[]>>(API.REC_ADD_SCORE, params)
}

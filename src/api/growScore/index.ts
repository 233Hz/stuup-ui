import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecScoreVO } from './type'

export const getRecScorePage = async (params: Page) => {
  return await get<PageResult<RecScoreVO[]>>('/recScore/page', params)
}

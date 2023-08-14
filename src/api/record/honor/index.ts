import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecHonorVO } from './type'

export const getRecHonorPage = async (params: Page) => {
  return await get<PageResult<RecHonorVO[]>>('/recHonor/page', params)
}

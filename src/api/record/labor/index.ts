import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecLaborTimeVO } from './type'

export const getRecLaborTimePage = async (params: Page) => {
  return await get<PageResult<RecLaborTimeVO[]>>('/recLaborTime/page', params)
}

import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecNationVO } from './type'

export const getRecNationPage = async (params: Page) => {
  return await get<PageResult<RecNationVO[]>>('/recNation/page', params)
}

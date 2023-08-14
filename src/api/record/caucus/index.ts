import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecCaucusVO } from './type'

export const getRecCaucusPage = async (params: Page) => {
  return await get<PageResult<RecCaucusVO[]>>('/recCaucus/page', params)
}

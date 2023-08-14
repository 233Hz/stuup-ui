import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecSocietyVO } from './type'

export const getRecSocietyPage = async (params: Page) => {
  return await get<PageResult<RecSocietyVO[]>>('/recSociety/page', params)
}

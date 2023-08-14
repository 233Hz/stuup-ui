import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecMilitaryVO } from './type'

export const getRecMilitaryPage = async (params: Page) => {
  return await get<PageResult<RecMilitaryVO[]>>('/recMilitary/page', params)
}

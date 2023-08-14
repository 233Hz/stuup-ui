import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecVolunteerVO } from './type'

export const getVolunteerPage = async (params: Page) => {
  return await get<PageResult<RecVolunteerVO[]>>('/recVolunteer/page', params)
}

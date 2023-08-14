import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { RecLogVO, RecDefaultVO } from './type'

export const getRecLogPage = async (params: Page) => {
  return await get<PageResult<RecLogVO[]>>('/recLog/page', params)
}

export const growthRecordDetails = async (batchCode: number) => {
  return await get<RecDefaultVO[]>('/recLog/details/' + batchCode)
}

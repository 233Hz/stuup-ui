import { ApiResult, get } from '@/api/api'
import { Page, PageResult } from '@/types/global'

export interface GrowAuditRecordVO {
  id: number
  growId: number
  firstLevelName: string
  secondLevelName: string
  thirdLevelName: string
  applicant: string
  growName: string
  reason: string
  fileIds: string
  state: number
  createTime: Date
}

export const pageGrowAuditRecord = async (
  params: Page,
): Promise<ApiResult<PageResult<GrowAuditRecordVO[]>>> => {
  return get('/audGrow/page/audit', params)
}

export const passGrowItem = async (id: number): Promise<ApiResult<boolean>> => {
  return get('/audGrow/pass/' + id)
}

export const refuseGrowItem = async (
  id: number,
  reason: string,
): Promise<ApiResult<boolean>> => {
  return get('/audGrow/refuse/' + id, { reason })
}

export const returnGrowItem = async (
  id: number,
  reason: string,
): Promise<ApiResult<boolean>> => {
  return get('/audGrow/return/' + id, { reason })
}

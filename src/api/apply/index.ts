import { ApiResult, get, post, del } from '@/api/api'
import { Page, PageResult } from '@/types/global'

export interface GrowthItemSelectVO {
  id: number
  name: string
  firstLevelName: string
  secondLevelName: string
  thirdLevelName: string
}

export interface AudGrow {
  id?: number
  growId: number
  reason: string
  fileIds?: string
}

export interface GrowApplyRecordVO {
  id: number
  growId: number
  firstLevelName: string
  secondLevelName: string
  thirdLevelName: string
  auditor: string
  growName: string
  reason: string
  fileIds: string
  state: number
  createTime: Date
}

export interface AuditLogVO {
  id: number
  username: number
  state: number
  reason: string
  createTime: Date
}

export const getStudentGrowthItems = async (): Promise<
  ApiResult<GrowthItemSelectVO[]>
> => {
  return get('/growthItem/studentGrowthItems')
}
export const pageGrowApplyRecord = async (
  params: Page,
): Promise<ApiResult<PageResult<GrowApplyRecordVO[]>>> => {
  return get('/audGrow/page/apply', params)
}

export const applyGrowItem = async (
  data: AudGrow,
): Promise<ApiResult<boolean>> => {
  return post('/audGrow/apply', data)
}

export const updateAudGrow = async (
  data: AudGrow,
): Promise<ApiResult<boolean>> => {
  return post('/audGrow/update', data)
}

export const deleteAudGrow = async (
  id: number,
): Promise<ApiResult<boolean>> => {
  return del('/audGrow/delete/' + id)
}

export const submitGrowItem = async (
  id: number,
): Promise<ApiResult<boolean>> => {
  return get('/audGrow/submit/' + id)
}

export const getAuditLog = async (
  id: number,
): Promise<ApiResult<AuditLogVO[]>> => {
  return get('/audLog/audit/log/' + id)
}

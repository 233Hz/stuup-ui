import { get } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { GrowAuditRecord } from './type'

export const pageGrowAuditRecord = async (params: Page) => {
  return get<PageResult<GrowAuditRecord[]>>('/audGrow/page/audit', params)
}

export const passGrowItem = async (id: number) => {
  return get<boolean>('/audGrow/pass/' + id)
}

export const refuseGrowItem = async (id: number, reason: string) => {
  return get<boolean>('/audGrow/refuse/' + id, { reason })
}

export const returnGrowItem = async (id: number, reason: string) => {
  return get<boolean>('/audGrow/return/' + id, { reason })
}

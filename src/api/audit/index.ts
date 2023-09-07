import { get, post } from '@/api/api'
import { PageResult } from '@/types/global'
import type { GrowAuditRecord } from './type'
import type { PageRecordQuery } from '@/api/apply/type'

export const reqPageAudit = async (params: PageRecordQuery) => {
  return get<PageResult<GrowAuditRecord[]>>('/audGrow/page', params)
}

export const reqPageStudentAudit = async (params: PageRecordQuery) => {
  return get<PageResult<GrowAuditRecord[]>>(
    '/audGrow/page/student/audit',
    params,
  )
}

export const reqPageStudentUnionAudit = async (params: PageRecordQuery) => {
  return get<PageResult<GrowAuditRecord[]>>(
    '/audGrow/page/studentUnion/audit',
    params,
  )
}

export const reqAuditPass = async (id: number) => {
  return post<boolean>('/audGrow/pass', { id })
}

export const reqAuditNoPass = async (id: number, reason: string) => {
  return post<boolean>('/audGrow/noPass', { id, reason })
}

export const reqAuditBatchPass = async (ids: number[]) => {
  return post<boolean>('/audGrow/batchPass', { ids })
}

export const reqAuditBatchNoPass = async (ids: number[], reason: string) => {
  return post<boolean>('/audGrow/batchNoPass', { ids, reason })
}

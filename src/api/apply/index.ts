import { get, post, del } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type {
  StudentGrowthItems,
  AudGrow,
  GrowApplyRecord,
  AuditLog,
} from './type'

export const reqStudentGrowthItems = async () => {
  return get<StudentGrowthItems[]>('/growthItem/studentGrowthItems')
}
export const pageGrowApplyRecord = async (params: Page) => {
  return get<PageResult<GrowApplyRecord[]>>('/audGrow/page/apply', params)
}

export const applyGrowItem = async (data: AudGrow) => {
  return post<boolean>('/audGrow/apply', data)
}

export const updateAudGrow = async (data: AudGrow) => {
  return post<boolean>('/audGrow/update', data)
}

export const deleteAudGrow = async (id: number) => {
  return del<boolean>('/audGrow/delete/' + id)
}

export const submitGrowItem = async (id: number) => {
  return get<boolean>('/audGrow/submit/' + id)
}

export const getAuditLog = async (id: number) => {
  return get<AuditLog[]>('/audLog/audit/log/' + id)
}

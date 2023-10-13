import { get, post, del } from '@/api/api'
import { PageResult } from '@/types/global'
import {} from '@/utils/dict'
import type {
  StudentGrowthItems,
  GrowthItemApplyForm,
  GrowApplyRecord,
  AuditLog,
  PageRecordQuery,
} from './type'

export const reqStudentGrowthItems = async () => {
  return get<StudentGrowthItems[]>('/growthItem/self/apply', {
    type: 'student',
  })
}
export const reqPageStudentApplyRecord = async (params: PageRecordQuery) => {
  return get<PageResult<GrowApplyRecord[]>>(
    '/audGrow/page/student/apply',
    params,
  )
}

export const reqPageStudentUnionApplyRecord = async (
  params: PageRecordQuery,
) => {
  return get<PageResult<GrowApplyRecord[]>>(
    '/audGrow/page/studentUnion/apply',
    params,
  )
}

export const applyGrowItem = async (data: GrowthItemApplyForm) => {
  return post<boolean>('/audGrow/apply', data)
}

export const updateAudGrow = async (data: GrowthItemApplyForm) => {
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

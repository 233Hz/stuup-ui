import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { Grade, GradeDict } from './type'

export const getGraderList = async () => {
  return await get<GradeDict[]>('/grade/all')
}

export const getGraderPage = async (params: Page) => {
  return await get<PageResult<Grade[]>>('/grade/list', params)
}

export const saveOrUpdateGrade = async (data: Grade) => {
  return await post<number>('/grade/saveOrUpdate', data)
}

export const delGrade = async (ids: string) => {
  return await post('/grade/delMultiGrade', { ids })
}

import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { StudentVO } from './type'

export const getStudentPage = async (params: Page) => {
  return await get<PageResult<StudentVO[]>>('/student/list', params)
}

export const saveStudent = async (data: StudentVO) => {
  return await post<number>('/student/save', data)
}

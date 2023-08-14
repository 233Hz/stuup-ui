import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { TeacherVO } from './type'

export const getTeacherPage = async (params: Page) => {
  return await get<PageResult<TeacherVO[]>>('/teacher/list', params)
}

export const saveTeacher = async (data: TeacherVO) => {
  return await post<number>('/teacher/save', data)
}

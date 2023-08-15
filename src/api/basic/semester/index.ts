import { get, post, del } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { StudentSemesterInfoList, SemesterVO, SemesterDTO } from './type'

enum API {
  STUDENT_SEMESTER_INFO = '/semester/getStudentSemester',
}

export const pageSemester = async (params: Page) => {
  return await get<PageResult<SemesterVO[]>>('/semester/page', params)
}

export const saveOrUpdateSemester = async (data: SemesterDTO) => {
  return await post<boolean>('/semester/save_update', data)
}

export const delSemester = async (id: number) => {
  return await del<boolean>('/semester/' + id)
}

export const setCurrentSemester = async (id: number) => {
  return await get<boolean>('/semester/setCurrent/' + id)
}

/**
 * 获取当前学生的学期信息
 * @returns
 */
export const reqStudentSemester = () =>
  get<StudentSemesterInfoList>(API.STUDENT_SEMESTER_INFO)

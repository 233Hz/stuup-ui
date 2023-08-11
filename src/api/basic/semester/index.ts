import { ApiResult, get, post, del } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import { StudentSemesterInfoList } from './type'

enum API {
  STUDENT_SEMESTER_INFO = '/semester/getStudentSemester',
}

export interface SemesterVO {
  id: number
  yearName: string
  name: string
  startTime: Date
  endTime: Date
  createTime: Date
}

export interface SemesterDTO {
  id?: number
  yearId: string
  name: string
  startTime: Date
  endTime: Date
}

export const pageSemester = async (
  params: Page,
): Promise<ApiResult<PageResult<SemesterVO>>> => {
  return await get('/semester/page', params)
}

export const saveOrUpdateSemester = async (
  data: SemesterDTO,
): Promise<ApiResult<boolean>> => {
  return await post('/semester/save_update', data)
}

export const delSemester = async (id: number): Promise<ApiResult<boolean>> => {
  return await del('/semester/' + id)
}

export const setCurrentSemester = async (
  id: number,
): Promise<ApiResult<boolean>> => {
  return await get('/semester/setCurrent/' + id)
}

/**
 * 获取当前学生的学期信息
 * @returns
 */
export const reqStudentSemester = () =>
  get<StudentSemesterInfoList>(API.STUDENT_SEMESTER_INFO)

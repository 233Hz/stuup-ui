import { get, post, del } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { SemesterVO, SemesterDTO, SemesterDict } from './type'

export const reqSemesterList = async () => {
  return await get<SemesterDict[]>('/semester/list')
}

export const reqSemesterPage = async (params: Page) => {
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

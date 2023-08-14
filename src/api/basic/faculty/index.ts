import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { Faculty, FacultyDict } from './type'

export const getFacultyList = async () => {
  return await get<FacultyDict[]>('/faculty/all')
}

export const getFacultyPage = async (params: Page) => {
  return await get<PageResult<Faculty[]>>('/faculty/list', params)
}

export const saveOrUpdateFaculty = async (data: Faculty) => {
  return await post<number>('/faculty/saveOrUpdate', data)
}

export const delFaculty = async (ids: string) => {
  return await post('/faculty/del', { ids })
}

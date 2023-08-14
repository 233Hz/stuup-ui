import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { Major, MajorDict } from './type'

export const getMajorList = async () => {
  return await get<MajorDict[]>('/major/all')
}

export const getMajorPage = async (params: Page) => {
  return await get<PageResult<Major[]>>('/major/list', params)
}

export const saveOrUpdateMajor = async (data: Major) => {
  return await post<number>('/major/saveOrUpdate', data)
}

export const delMajor = async (ids: string) => {
  return await post('/major/delMultiMajor', { ids })
}

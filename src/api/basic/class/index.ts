import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { Class } from './type'

export const getClassList = async () => {
  return await get<Class[]>('/class/all')
}

export const getClassPage = async (params: Page) => {
  return await get<PageResult<Class[]>>('/class/list', params)
}

export const saveOrUpdateClass = async (data: Class) => {
  return await post<number>('/class/saveOrUpdate', data)
}

export const delClass = async (ids: string) => {
  return await post<boolean>('/class/delMultiClass', { ids })
}

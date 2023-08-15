import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { YearVO, YearDictVO } from './type'

export const getYearList = async () => {
  return await get<YearDictVO[]>('/year/all')
}

export const getYearPage = async (params: Page) => {
  return await get<PageResult<YearVO[]>>('/year/list', params)
}

export const saveOrUpdateYear = async (data: YearVO) => {
  return await post<number>('/year/save', data)
}

export const delYear = async (ids: string) => {
  return await post('/year/del', { ids })
}

export const setCurrentYear = async (id: number) => {
  return await post('/year/setCurr/' + id)
}

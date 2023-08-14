import { get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { Dept, DeptDict } from './type'

export const getDeptList = async () => {
  return await get<DeptDict[]>('/dept/all')
}

export const getDeptPage = async (params: Page) => {
  return await get<PageResult<Dept[]>>('/dept/list', params)
}

export const saveOrUpdateDept = async (data: Dept) => {
  return await post<number>('/dept/save', data)
}

export const delDept = async (ids: string) => {
  return await post('/dept/del', { ids })
}

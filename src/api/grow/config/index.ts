import { get, post, del, download } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { GrowthTreeVO, GrowthVO, GrowthItemVO } from './type'
import type { SimpleUserVO } from '@/api/system/user/type'

export const getGrowthTree = async () => {
  return await get<GrowthTreeVO[]>('/growth/tree')
}

export const saveOrUpdateGrowth = async (data: GrowthVO) => {
  return await post<number>('/growth/saveOrUpdate', data)
}

export const delGrowth = async (id: number) => {
  return await post('/growth/del/' + id)
}

export const getGrowthItemPage = async (params: Page) => {
  return await get<PageResult<GrowthItemVO[]>>('/growthItem/page', params)
}

export const saveOrUpdateGrowthItem = async (data: GrowthItemVO) => {
  return await post<number>('/growthItem/saveOrUpdate', data)
}

export const delGrowthItem = async (id: number) => {
  return await del('/growthItem/del/' + id)
}

export const getUserGrowthItems = async () => {
  return await get<GrowthItemVO[]>('/growthItem/myGrowthItems')
}

export const manualTask = async (num: number) => {
  return await get(`/manualTask/task${num}`)
}

export const downTemp = async (rec_code: string) => {
  await download('/grow/downTemp', { rec_code })
}

export const setGrowthItemUser = async (growId: number, userIds: number[]) => {
  return await post('/growUser/setGrowthItemUser', { growId, userIds })
}

export const getGrowItemUser = async (growId: number) => {
  return await get<SimpleUserVO[]>('/growUser/getGrowItemUser/' + growId)
}

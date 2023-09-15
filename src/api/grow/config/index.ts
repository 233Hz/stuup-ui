import { del, download, get, post } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type {
  GrowthItemUser,
  GrowthItemUserQuery,
  GrowthItemVO,
  GrowthRuleDesc,
  GrowthTreeVO,
  GrowthVO,
  SetGrowUserForm,
} from './type'

export const getGrowthTree = async () => {
  return await get<GrowthTreeVO[]>('/growth/tree')
}

export const saveOrUpdateGrowth = async (data: GrowthVO) => {
  return await post<number>('/growth/saveOrUpdate', data)
}

export const delGrowth = async (id: number) => {
  return await del('/growth/del/' + id)
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

export const reqSelfApplyItem = async (type: 'teacher' | 'studentUnion') => {
  return await get<GrowthItemVO[]>('/growthItem/self/apply', { type })
}

export const manualTask = async (num: number) => {
  return await get(`/manualTask/task${num}`)
}

export const downTemp = async (recCode: string) => {
  await download('/grow/downTemp', { recCode })
}

export const setGrowthItemUser = async (data: SetGrowUserForm) => {
  return await post('/growUser/setGrowthItemUser', data)
}

export const getGrowItemUser = async (growthItemId: number) => {
  return await get<any[]>('/growUser/getGrowItemUser/' + growthItemId)
}

export const reqPaginateGrowthItemUser = async (query: GrowthItemUserQuery) => {
  return await get<PageResult<GrowthItemUser[]>>('/growUser/page/user', query)
}

export const reqGrowthRuleDesc = async () => {
  return await get<GrowthRuleDesc[]>('/growthItem/rule/desc')
}

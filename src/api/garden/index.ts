import { get } from '@/api/api'
import { PageResult, Page } from '@/types/global'
import type { GrowGardenVO } from './type'

export const getGrowGarden = async (params: Page) => {
  return get<PageResult<GrowGardenVO[]>>('/garden/page', params)
}

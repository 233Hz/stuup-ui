import { get } from '@/api/api'
import { Page } from '@/types/global'
import type { StudentScoreDetailsVO } from './type'

export const studentScoreDetails = async (params: Page) => {
  return get<StudentScoreDetailsVO>('/stuScoreLog/page', params)
}

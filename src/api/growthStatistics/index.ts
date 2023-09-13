import { get } from '@/api/api'
import type {
  GrowthStatisticsVO,
  GrowthStatisticsParams,
} from '@/api/growthStatistics/type'

enum API {
  GROWTH_STATISTICS_LIST = '/growthStatistics/list',
}

export const reqGrowthStatisticsList = (params: GrowthStatisticsParams) =>
  get<GrowthStatisticsVO[]>(API.GROWTH_STATISTICS_LIST, params)

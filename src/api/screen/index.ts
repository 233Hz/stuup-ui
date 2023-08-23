import { get } from '@/api/api'
import type {
  MajorPopulationsList,
  ScreenImportantData,
  Near3YearsAtSchoolNumList,
  AwardsByCompetitionList,
  GrowthScoreCountList,
  StudentGrowthMonitorList,
  DailyVisits,
} from './type'

enum API {
  COUNT_MAJOR_POPULATIONS = '/screen/countMajorPopulations',
  IMPORTANT_DATA = '/screen/important/data',
  NEAR_3_YEARS_AT_SCHOOL_NUM = '/screen/countNear3YearsAtSchoolNum',
  AWARDS_BY_COMPETITION = '/screen/countAllKindsOfCompetitionAwardNum',
  GROWTH_SCORE_COMPARE = '/screen/countGrowthScoreCompare',
  STUDENT_GROWTH_MONITOR = '/screen/studentGrowthMonitor',
  COUNT_DAILY_VISITS = '/screen/countDailyVisits',
}

export const reqCountMajorPopulations = () =>
  get<MajorPopulationsList>(API.COUNT_MAJOR_POPULATIONS)

export const reqImportantData = () =>
  get<ScreenImportantData>(API.IMPORTANT_DATA)

export const reqNear3YearsAtSchoolNum = () =>
  get<Near3YearsAtSchoolNumList>(API.NEAR_3_YEARS_AT_SCHOOL_NUM)

export const reqAwardsByCompetition = () =>
  get<AwardsByCompetitionList>(API.AWARDS_BY_COMPETITION)

export const reqGrowthScoreCompare = () =>
  get<GrowthScoreCountList>(API.GROWTH_SCORE_COMPARE)

export const reqStudentGrowthMonitor = () =>
  get<StudentGrowthMonitorList>(API.STUDENT_GROWTH_MONITOR)

export const reqCountDailyVisits = () =>
  get<DailyVisits[]>(API.COUNT_DAILY_VISITS)

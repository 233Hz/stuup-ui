import { get } from '@/api/api'
import {
  PortraitBasicInfo,
  PortraitCapacityEvaluatorList,
  PortraitAwardRecordList,
  PortraitActivityRecordList,
  PortraitRankingCurveList,
  PortraitGrowthAnalysisList,
  PortraitGrowthData,
  PortraitGrowthComparisonList,
  PortraitStudyGradeList,
  PortraitStudyCourseList,
} from './type'

enum API {
  BASIC_INFO_URL = '/portrait/basicInfo',
  CAPACITY_EVALUATOR_URL = '/portrait/capacityEvaluator',
  AWARD_RECORD_URL = '/portrait/awardRecord',
  ACTIVITY_RECORD_URL = '/portrait/activityRecord',
  RANKING_CURVE_URL = '/portrait/rankingCurve',
  GROWTH_ANALYSIS_URL = '/portrait/growthAnalysis',
  GROWTH_DATA_URL = '/portrait/growthData',
  GROWTH_COMPARISON_URL = '/portrait/growthComparison',
  STUDY_GRADE_URL = '/portrait/studyGrade',
  STUDY_COURSE_URL = '/portrait/studyCourse',
}

// 学生画像-基本信息
export const reqBasicInfo = (studentId: number) =>
  get<PortraitBasicInfo>(API.BASIC_INFO_URL, { studentId })

// 学生画像-成长能力
export const reqCapacityEvaluator = (studentId: number) =>
  get<PortraitCapacityEvaluatorList>(API.CAPACITY_EVALUATOR_URL, { studentId })

// 学生画像-获奖记录
export const reqAwardRecord = (studentId: number) =>
  get<PortraitAwardRecordList>(API.AWARD_RECORD_URL, { studentId })

// 学生画像-参加活动记录
export const reqActivityRecord = (studentId: number) =>
  get<PortraitActivityRecordList>(API.ACTIVITY_RECORD_URL, { studentId })

// 学生画像-学期成长排名曲线图
export const reqRankingCurve = (studentId: number) =>
  get<PortraitRankingCurveList>(API.RANKING_CURVE_URL, { studentId })

// 学生画像-成长分析
export const reqGrowthAnalysis = (studentId: number) =>
  get<PortraitGrowthAnalysisList>(API.GROWTH_ANALYSIS_URL, { studentId })

// 学生画像-成长数据
export const reqGrowthData = (studentId: number, semesterId: number) =>
  get<PortraitGrowthData>(API.GROWTH_DATA_URL, { studentId, semesterId })

// 学生画像-成长对比
export const reqGrowthComparison = (studentId: number, semesterId: number) =>
  get<PortraitGrowthComparisonList>(API.GROWTH_COMPARISON_URL, {
    studentId,
    semesterId,
  })

// 学生画像-学习成绩
export const reqStudyGrade = (studentId: number) =>
  get<PortraitStudyGradeList>(API.STUDY_GRADE_URL, { studentId })

// 学生画像-学习课程
export const reqStudyCourse = (semesterId: number) =>
  get<PortraitStudyCourseList>(API.STUDY_COURSE_URL + '/' + semesterId)

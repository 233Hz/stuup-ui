export interface PortraitBasicInfo {
  studentName: string
  studentNo: string
  phone: string
  avatar: string
  className: string
  classTeacher: string
  majorName: string
  totalScore: number
  totalMinusScore: number
  ranking: number
  associations: string[]
}

export interface PortraitCapacityEvaluator {
  indicatorName: string
  indicatorScore: number
  indicatorAvgScore: number
}
export type PortraitCapacityEvaluatorList = PortraitCapacityEvaluator[]

export interface PortraitAwardRecordVO {
  awardName: string
  awardType: number
  awardTime: Date
}
export type PortraitAwardRecordList = PortraitAwardRecordVO[]

export interface PortraitActivityRecord {
  activityName: string
  activityTime: Date
}
export type PortraitActivityRecordList = PortraitActivityRecord[]

export interface PortraitRankingCurve {
  semesterName: string
  rank: number
  score: number
}
export type PortraitRankingCurveList = PortraitRankingCurve[]

export interface PortraitGrowthAnalysis {
  semesterName: string
  avgScoreGap: number
}
export type PortraitGrowthAnalysisList = PortraitGrowthAnalysis[]

export interface PortraitGrowthData {
  score: number
  rank: number
  minusScore: number
  activityCount: number
  awardCount: number
  certificateCount: number
}

export interface PortraitGrowthComparison {
  growthName: string
  myScore: number
  avgScore: number
}
export type PortraitGrowthComparisonList = PortraitGrowthComparison[]

export interface PortraitStudyGrade {
  semesterName: string
  score: number
}
export type PortraitStudyGradeList = PortraitStudyGrade[]

export interface PortraitStudyCourse {
  courseName: string
  score: number
}
export type PortraitStudyCourseList = PortraitStudyCourse[]

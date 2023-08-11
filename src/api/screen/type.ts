export interface MajorPopulations {
  majorName: string
  count: number
}
export type MajorPopulationsList = MajorPopulations[]

export interface ScreenImportantData {
  atSchoolNum: number
  sexRatio: string
  classNum: number
  clubNum: number
  majorNum: number
  growthNum: number
  activityNum: number
  passRate: string
  scholarshipNum: number
}

export interface Near3YearsAtSchoolNum {
  year: string
  personNum: number
}
export type Near3YearsAtSchoolNumList = Near3YearsAtSchoolNum[]

export interface AwardsByCompetition {
  awardType: string
  awardNum: number
}
export type AwardsByCompetitionList = AwardsByCompetition[]

export interface GrowthScoreCount {
  growthName: string
  growthItemCount: number
  totalScore: number
  scoreChangeType: number
  changeValue: number
}
export type GrowthScoreCountList = GrowthScoreCount[]

export interface StudentGrowthMonitor {
  growItemName: string
  personNum: number
}
export type StudentGrowthMonitorList = StudentGrowthMonitor[]

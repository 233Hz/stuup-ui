import { PageResult } from '@/types/global'

export interface ScoreDetails {
  id: number
  name: string
  score: string
  description: string
  createTime: Date
}

export interface StudentScoreDetailsVO {
  totalScore: number
  detailPage: PageResult<ScoreDetails[]>
}

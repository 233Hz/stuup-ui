import type { Page } from '@/types/global'

export interface RecScoreVO {
  id: number
  yearName: string
  semesterName: string
  l1?: string
  l2?: string
  l3?: string
  growthItemName: string
  gradeName?: string
  className?: string
  studentName?: string
  studentNo?: string
  idCard?: string
  studentId: string
  score: string
  createTime: Date
}

export interface RecScoreQuery extends Page {
  yearId?: number
  semesterId?: number
  l1Id?: number
  l2Id?: number
  l3Id?: number
  growthItemName?: string
  gradeId?: number
  className?: string
  studentName?: string
  studentNo?: string
  startTime?: string
  endTime?: string
}

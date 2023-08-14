export interface StudentRecScoreVO {
  id: number
  name: string
  score: string
  createTime: Date
}

export interface StudentScoreDetailsVO {
  totalScore: number
  records: StudentRecScoreVO[]
}

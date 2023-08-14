export interface GrowthTreeVO {
  id?: number
  pid?: number
  name: string
  description?: string
  sort: number
  children?: GrowthTreeVO[] | []
}

export interface GrowthVO {
  id?: number
  pid?: number
  name: string
  description?: string
  sort?: number
}

export interface GrowthItemVO {
  id: number
  name: string
  code: string
  description?: string
  scorePeriod?: number
  scoreUpperLimit: number
  collectLimit: number
  calculateType?: number
  score?: number
  gatherer?: number
  growthItems: number[]
  firstLevelId: number
  secondLevelId?: number
  threeLevelId?: number
}

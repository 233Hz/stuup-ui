export interface Notify {
  id: number
  title: string
  type: number
  scope: number
  content: string
  state: number
  createUser: number
  createTime: Date
  updateTime: Date
}

export interface NotifyVO {
  id?: number
  title: string
  type: number
  scope: number
  userIds: number[]
  publish?: boolean
}

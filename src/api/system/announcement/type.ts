export interface Announcement {
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

export interface AnnouncementVO {
  id?: number
  title: string
  type: number
  scope: number
  userIds: number[]
  publish?: boolean
}

export interface AnnouncementPremUserVO {
  id?: number
  username: string
  userType: number
}

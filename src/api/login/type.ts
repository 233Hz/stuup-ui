import { WHETHER } from '@/utils/dict'

enum IS_CURRENT {
  YES = WHETHER.YES,
  NO = WHETHER.NO,
}

interface Semester {
  id: number
  name: string
  isCurrent: IS_CURRENT
}

export interface LoginForm {
  loginName: string
  password: string
}

export interface LoginUserVO {
  userId: number
  loginName: string
  userName: string
  mobile: string
  deptId: number
  userType: number
  roleIds: string
  yearId: number
  semesterId: number
  avatar: string
  ranking: number
  totalScore: number
  studentId?: number
  semesters?: Semester[]
}

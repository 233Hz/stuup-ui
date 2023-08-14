export interface UserVO {
  oid?: number
  loginName: string
  userName: string
  sex: number | undefined
  mobile: string
  degree: string
  teacherType: number | undefined
  userType: number | undefined
  deptId: number | undefined
  idCard: string
  birthday: Date | undefined
  state: number | undefined
  roles: number[]
  createTime?: Date
}

export interface SimpleUserVO {
  id: number
  username: string
  teacherNo: string
  deptName: string
}

export interface UserDictVO {
  oid: number
  value: string
  disabled: boolean
}

export interface CusUser {
  userId: number
  userName: string
  loginName: string
  sex: number
  idCard: string
  birthday: string
  mobile: string
  deptId: number
  deptName: string
  userType: number
  degree: string
  roleIds: number[]
  yearId: number
}

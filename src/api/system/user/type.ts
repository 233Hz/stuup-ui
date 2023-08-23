export interface UserVO {
  oid?: number
  loginName: string
  userName: string
  sex: number
  mobile: string
  degree: string
  teacherType: number
  userType: number
  deptId: number
  idCard: string
  birthday: Date
  state: number
  roles: number[]
  createTime: Date
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
  avatar: string
}

export interface UserMenu {
  oid: number
  pid: number
  name: string
  code: string
  path: string
  flag: number
  icon?: string
  type: number
  sort: number
  useLayout: number
  keepAlive: number
  hidden: boolean
  redirect?: string
}

export interface UpdatePasswordForm {
  opassword: string
  npassword: string
  rpassword: string
}

export interface Faculty {
  oid?: number
  facultyCode: string
  facultyName: string
  facultyAdmin?: number
}

export interface FacultyDict {
  oid: number
  facultyCode: string
  facultyName: string
  adminName: string
  facultyAdmin: number
  createTime: Date
}

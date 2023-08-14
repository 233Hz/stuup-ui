export interface TeacherVO {
  oid?: number
  jobNo: string
  name: string
  sex: number | undefined
  facultyId: number | undefined
  teachGroup: number | undefined
  phone: string
  idCard: string
  address: string
  state: number | undefined
  createTime?: Date
}

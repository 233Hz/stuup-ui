export interface StudentVO {
  oid?: number
  studentNo: string
  name: string
  sex: number | undefined
  classId: number | undefined
  gradeId: number | undefined
  majorId: number | undefined
  idCard: string
  nation: number | undefined
  phone: string
  statue: number | undefined
  createTime?: Date
}

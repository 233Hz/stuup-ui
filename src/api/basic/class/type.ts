export interface Class {
  id?: number
  code: string
  name: string
  facultyId: number | undefined
  gradeId: number | undefined
  majorId: number | undefined
  teacherId: number | undefined
  adminId: number | undefined
  count: number
  createTime?: Date
}

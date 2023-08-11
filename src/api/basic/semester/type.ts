export interface StudentSemesterInfo {
  id: number
  name: string
  isCurrent: 1 | 2
}
export type StudentSemesterInfoList = StudentSemesterInfo[]

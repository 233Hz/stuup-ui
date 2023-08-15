import { defineStore } from 'pinia'
import type { BasicInfoState } from './types/type'
import { getFacultyList } from '@/api/basic/faculty/index'
import { getGraderList } from '@/api/basic/grade/index'
import { getMajorList } from '@/api/basic/major/index'
import { getUserList } from '@/api/system/user'

export enum BasicInfoType {
  // 用户信息
  USER_INFO,
  // 年级信息
  GRADE_INFO,
  // 系部信息
  FACULTY_INFO,
  // 专业信息
  MAJOR_INFO,
}

let useBasicInfoStore = defineStore('BasicInfo', {
  state: (): BasicInfoState => ({
    user: [],
    grade: [],
    faculty: [],
    major: [],
  }),
  actions: {
    async init(...args: BasicInfoType[]) {
      for (let index = 0; index < args.length; index++) {
        const item = args[index]
        switch (item) {
          case BasicInfoType.USER_INFO:
            const { data: u } = await getUserList()
            this.user = u
            break
          case BasicInfoType.GRADE_INFO:
            const { data: g } = await getGraderList()
            this.grade = g
            break
          case BasicInfoType.FACULTY_INFO:
            const { data: f } = await getFacultyList()
            this.faculty = f
            break
          case BasicInfoType.MAJOR_INFO:
            const { data: m } = await getMajorList()
            this.major = m
            break
          default:
            break
        }
      }
    },
  },
})

export default useBasicInfoStore

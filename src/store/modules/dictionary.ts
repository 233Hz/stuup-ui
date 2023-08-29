import { defineStore } from 'pinia'
import type { BasicInfoState } from './types/type'
import { getFacultyList } from '@/api/basic/faculty/index'
import { getGraderList } from '@/api/basic/grade/index'
import { getMajorList } from '@/api/basic/major/index'
import { getUserList } from '@/api/system/user'
import { getYearList } from '@/api/basic/year'
import { getDeptList } from '@/api/basic/dept'
import { getRoleList } from '@/api/system/role'

export enum DictionaryType {
  // 用户字典
  USER,
  // 年级字典
  GRADE,
  // 系部字典
  FACULTY,
  // 专业字典
  MAJOR,
  // 年份字典
  YEAR,
  // 部门字典
  DEPT,
  // 角色字典
  ROLE,
}

const useDictionaryStore = defineStore('BasicInfo', {
  state: (): BasicInfoState => ({
    user: [],
    grade: [],
    faculty: [],
    major: [],
    year: [],
    dept: [],
    role: [],
  }),
  actions: {
    async init(...args: DictionaryType[]) {
      for (let index = 0; index < args.length; index++) {
        const item = args[index]
        switch (item) {
          case DictionaryType.USER:
            const { data: u } = await getUserList()
            this.user = u
            break
          case DictionaryType.GRADE:
            const { data: g } = await getGraderList()
            this.grade = g
            break
          case DictionaryType.FACULTY:
            const { data: f } = await getFacultyList()
            this.faculty = f
            break
          case DictionaryType.MAJOR:
            const { data: m } = await getMajorList()
            this.major = m
            break
          case DictionaryType.YEAR:
            const { data: y } = await getYearList()
            this.year = y
            break
          case DictionaryType.DEPT:
            const { data: d } = await getDeptList()
            this.dept = d
            break
          case DictionaryType.ROLE:
            const { data: r } = await getRoleList()
            this.role = r
            break
          default:
            break
        }
      }
    },
  },
})

export default useDictionaryStore

import { defineStore } from 'pinia'
import { getFacultyList } from '@/api/basic/faculty'
import { getGraderList } from '@/api/basic/grade'
import { getMajorList } from '@/api/basic/major'
import { getYearList } from '@/api/basic/year'
import { getDeptList } from '@/api/basic/dept'
import { getRoleList } from '@/api/system/role'
import { getClassList } from '@/api/basic/class'
import { reqSemesterList } from '@/api/basic/semester'
import type { BasicInfoState } from './types/type'

const useDictionaryStore = defineStore('BasicInfo', {
  state: (): BasicInfoState => ({
    year: [],
    semester: [],
    grade: [],
    faculty: [],
    major: [],
    dept: [],
    role: [],
    class: [],
    isInit: false,
  }),
  actions: {
    async init() {
      if (this.isInit) return
      const { data: gradeData } = await getGraderList()
      this.grade = gradeData
      const { data: facultyData } = await getFacultyList()
      this.faculty = facultyData
      const { data: majorData } = await getMajorList()
      this.major = majorData
      const { data: yearData } = await getYearList()
      this.year = yearData
      const { data: deptData } = await getDeptList()
      this.dept = deptData
      const { data: roleData } = await getRoleList()
      this.role = roleData
      const { data: classData } = await getClassList()
      this.class = classData
      const { data: semesterData } = await reqSemesterList()
      this.semester = semesterData
      this.isInit = true
      console.log('aaa')
    },
  },
})

export default useDictionaryStore

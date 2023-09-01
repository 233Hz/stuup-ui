<template>
  <div class="growth-record p-20">
    <div class="growth-record-wrapper">
      <ul class="record-link fs-14 line-h-42 flex">
        <li
          v-for="item in semester"
          :key="item.id"
          :class="active === item.id ? 'tab-active' : ''"
          class="min-w-80 text-center px-12 mx-12 br-8 hover:cursor-pointer hover:bg-teal-50 hover:text-teal-500 hover:font-bold"
          @click="handleTagClick(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <el-divider>成长数据</el-divider>
      <GrowthData :semesterId="active" />
      <el-divider>学习课程</el-divider>
      <div class="w-full flex">
        <!-- <div class="flex-1">
        </div> -->
        <el-table :data="courses" style="width: 100%">
          <el-table-column
            prop="courseName"
            label="课程名称"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="score"
            label="课程成绩"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="state"
            label="成长对比"
            header-align="center"
            align="center"
          />
        </el-table>
        <!-- <div class="flex-2">
          <CourseComparisonChart
            :semesterId="active"
            @change="handleCourseChange"
          />
        </div> -->
      </div>
      <el-divider>成长对比</el-divider>
      <GrowthComparisonChart :semesterId="active" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GrowthData from './GrowthData.vue'
import GrowthComparisonChart from './GrowthComparisonChart.vue'
import { WHETHER } from '@/utils/dict'
import { reqStudentSemester } from '@/api/basic/semester'

const semester = ref()
const courses = ref()
const active = ref<number>()

const getSemester = async () => {
  const { data } = await reqStudentSemester()
  semester.value = data
  active.value = data.find((item) => item.isCurrent === WHETHER.YES)?.id
}

onMounted(() => {
  getSemester()
  courses.value = generateCourseData()
})

const generateCourseData = () => {
  return Array.from({ length: 6 }).map((_, index) => {
    const random = Math.random()
    return {
      courseName: `课程${index + 1}`,
      score: Math.floor(Math.random() * 80) + 20,
      state: random > 0.5 ? '⬆️' : '⬇️',
    }
  })
}

const handleTagClick = async (id: number) => (active.value = id)

const handleCourseChange = (data: any) => {
  courses.value = data
}
</script>

<style scoped lang="scss">
.tab-active {
  font-weight: bold;
  color: rgb(20 184 166);
  background-color: rgb(240 253 250);
}
</style>

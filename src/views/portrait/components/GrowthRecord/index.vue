<template>
  <div class="growth-record p-20">
    <div class="growth-record-wrapper">
      <ul class="record-link fs-14 line-h-42 flex">
        <li
          v-for="item in semestes"
          :key="item.id"
          :class="active === item.id ? 'tab-active' : ''"
          class="min-w-80 text-center px-12 mx-12 br-8 hover:cursor-pointer hover:bg-teal-50 hover:text-teal-500 hover:font-bold"
          @click="handleTagClick(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <el-divider>成长数据</el-divider>
      <CrowthData :semesterId="active" />
      <el-divider>学习课程</el-divider>
      <div class="w-full flex">
        <div class="flex-1">
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
          </el-table>
        </div>
        <div class="flex-2">
          <CourseComparisonChart
            :semesterId="active"
            @change="handleCoursChange"
          />
        </div>
      </div>
      <el-divider>成长对比</el-divider>
      <GrowthComparisonChart :semesterId="active" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CrowthData from './CrowthData.vue'
import CourseComparisonChart from './CourseComparisonChart.vue'
import GrowthComparisonChart from './GrowthComparisonChart.vue'
import { WHETHER } from '@/utils/dict'
import { reqStudentSemester } from '@/api/basic/semester'

const semestes = ref()
const courses = ref()
const active = ref<number>()

const getSemestes = async () => {
  const { data } = await reqStudentSemester()
  semestes.value = data
  active.value = data.find((item) => item.isCurrent === WHETHER.YES)?.id
}

onMounted(() => {
  getSemestes()
})

const handleTagClick = async (id: number) => (active.value = id)

const handleCoursChange = (data: any) => {
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

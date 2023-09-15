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
      <CourseGrades :semesterId="active" />
      <el-divider>成长对比</el-divider>
      <GrowthComparisonChart :semesterId="active" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { reqStudentSemester } from '@/api/basic/student'
import { WHETHER } from '@/utils/dict'
import useUserStore from '@/store/modules/user'
import GrowthData from './GrowthData.vue'
import GrowthComparisonChart from './GrowthComparisonChart.vue'
import CourseGrades from './CourseGrades.vue'

const route = useRoute()
const userStore = useUserStore()

const semester = ref()
const active = ref<number>()

onMounted(async () => {
  await initSemester()
})

const initSemester = async () => {
  const { data } = await reqStudentSemester(+route.params.id)
  semester.value = data
  active.value =
    data.find((item) => item.isCurrent === WHETHER.YES)?.id || data[0]?.id
}

const handleTagClick = (id: number) => (active.value = id)
</script>

<style scoped lang="scss">
.tab-active {
  font-weight: bold;
  color: rgb(20 184 166);
  background-color: rgb(240 253 250);
}
</style>

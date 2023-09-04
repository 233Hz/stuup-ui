<template>
  <div class="w-full">
    <el-table :data="courseData">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  semesterId: number | undefined
}>()

watch(
  () => props.semesterId,
  () => {
    courseData.value = generateCourseData()
  },
)

const courseData = ref()

onMounted(() => {
  courseData.value = generateCourseData()
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
</script>

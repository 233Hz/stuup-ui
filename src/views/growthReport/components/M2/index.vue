<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleTitle from '../ModuleTitle/index.vue'
import M21 from './components/M21/index.vue'
import M22 from './components/M22/index.vue'
import M23 from './components/M23/index.vue'
import M24 from './components/M24/index.vue'
import {
  reqGrowthReportSkillsAndLearningLiteracy,
  type SubjectGrades,
  type DoubleInnovationCompetition,
} from '@/api/growthReport'

const props = defineProps<{
  studentId?: number
}>()

const subjectGrades = ref<SubjectGrades>()
const professionalQualifications = ref<string[]>()
const professionalism = ref<string[]>()
const doubleInnovationCompetition = ref<DoubleInnovationCompetition>()

const fetchData = async () => {
  const { data: res } = await reqGrowthReportSkillsAndLearningLiteracy(
    props.studentId,
  )
  subjectGrades.value = res.subjectGrades
  professionalQualifications.value = res.professionalQualifications
  professionalism.value = res.professionalism
  doubleInnovationCompetition.value = res.doubleInnovationCompetition
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <module-title
      title="技能与学习素养"
      :background2="['bg-gradient-to-r from-[#17c492] to-[#ffffff]']"
    />
    <M21 />
    <div class="flex gap-[10px]">
      <div class="flex-1"><M22 /></div>
      <div class="flex-1"><M23 /></div>
    </div>
    <M24 :data="doubleInnovationCompetition" />
  </div>
</template>

<style scoped lang="scss"></style>

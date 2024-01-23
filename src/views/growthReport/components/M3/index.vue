<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleTitle from '../ModuleTitle/index.vue'
import M31 from './components/M31/index.vue'
import M32 from './components/M32/index.vue'
import {
  reqGrowthReportExerciseAndPhysicalAndMentalHealth,
  type PsychologicalLiteracy,
  type PhysicalLiteracy,
} from '@/api/growthReport'

const props = defineProps<{
  studentId?: number
}>()

const psychologicalLiteracy = ref<PsychologicalLiteracy>()
const physicalLiteracy = ref<PhysicalLiteracy>()

const fetchData = async () => {
  const { data: res } = await reqGrowthReportExerciseAndPhysicalAndMentalHealth(
    props.studentId,
  )
  psychologicalLiteracy.value = res.psychologicalLiteracy
  physicalLiteracy.value = res.physicalLiteracy
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <module-title
      title="运动与身心健康"
      :background2="['bg-gradient-to-r from-[#17c492] to-[#ffffff]']"
    />
    <M31 :data="psychologicalLiteracy" />
    <M32 :data="physicalLiteracy" />
  </div>
</template>

<style scoped lang="scss"></style>

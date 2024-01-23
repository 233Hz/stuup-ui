<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleTitle from '../ModuleTitle/index.vue'
import M51 from './components/M51/index.vue'
import M52 from './components/M52/index.vue'
import M53 from './components/M53/index.vue'
import {
  reqGrowthReportLaborAndProfessionalism,
  type LArtisticActivities,
  type CreditCompletion,
} from '@/api/growthReport'

const props = defineProps<{
  studentId?: number
}>()

const artisticActivities = ref<LArtisticActivities>()
const creditsForShiharaActivities = ref<CreditCompletion[]>()
const productionLaborPracticeCredits = ref<CreditCompletion[]>()

const fetchData = async () => {
  const { data: res } = await reqGrowthReportLaborAndProfessionalism(
    props.studentId,
  )
  artisticActivities.value = res.artisticActivities
  creditsForShiharaActivities.value = res.creditsForShiharaActivities
  productionLaborPracticeCredits.value = res.productionLaborPracticeCredits
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <module-title
      title="劳动与职业素养"
      :background2="['bg-gradient-to-r from-[#17c492] to-[#ffffff]']"
    />
    <M51 :data="artisticActivities" />
    <div class="flex gap-[10px]">
      <div class="flex-1"><M52 :data="creditsForShiharaActivities" /></div>
      <div class="flex-1"><M53 :data="productionLaborPracticeCredits" /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  background-color: #00d2c91a;
  border-radius: 4px;
  border-left: 4px solid #00d2c9;
  padding: 8px 16px;
  color: #fff;
  margin: 10px 0;
}
</style>

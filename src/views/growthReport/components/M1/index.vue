<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleTitle from '../ModuleTitle/index.vue'
import M11 from './components/M11/index.vue'
import M12 from './components/M12/index.vue'
import M13 from './components/M13/index.vue'
import M14 from './components/M14/index.vue'
import M15 from './components/M15/index.vue'
import {
  reqGrowthReportEthicsAndCitizenship,
  type IdeologicalCharacter,
  type CivilizedCultivation,
  type BeDisciplinedAndSelfDisciplined,
  type IndividualHonors,
} from '@/api/growthReport'

const props = defineProps<{
  studentId?: number
}>()

const ideologicalCharacter = ref<IdeologicalCharacter>()
const civilizedCultivation = ref<CivilizedCultivation>()
const beDisciplinedAndSelfDisciplined = ref<BeDisciplinedAndSelfDisciplined>()
const individualHonors = ref<IndividualHonors>()

const fetchData = async () => {
  const { data: res } = await reqGrowthReportEthicsAndCitizenship(
    props.studentId,
  )
  ideologicalCharacter.value = res.ideologicalCharacter
  civilizedCultivation.value = res.civilizedCultivation
  beDisciplinedAndSelfDisciplined.value = res.beDisciplinedAndSelfDisciplined
  individualHonors.value = res.individualHonors
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <module-title
      title="道德与公民素养"
      :background2="['bg-gradient-to-r from-[#17c492] to-[#ffffff]']"
    />
    <M11 :data="ideologicalCharacter" />
    <div class="flex gap-[10px]">
      <div class="flex-1 flex flex-col h-full">
        <M12 :data="civilizedCultivation" class="flex-1" />
        <M13 :data="civilizedCultivation" class="flex-1" />
      </div>
      <M14 :data="beDisciplinedAndSelfDisciplined" class="flex-1" />
    </div>
    <M15 :data="individualHonors" />
  </div>
</template>

<style scoped lang="scss"></style>

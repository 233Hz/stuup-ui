<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleTitle from '../ModuleTitle/index.vue'
import M41 from './components/M41/index.vue'
import M42 from './components/M42/index.vue'
import M43 from './components/M43/index.vue'
import {
  reqGrowthReportAestheticAndArtisticAccomplishment,
  type AArtisticActivities,
  type TalentShow,
  type ArtSocieties,
} from '@/api/growthReport'

const props = defineProps<{
  studentId?: number
}>()

const artisticActivities = ref<AArtisticActivities>()
const talentShow = ref<TalentShow>()
const artSocieties = ref<ArtSocieties>()

const fetchData = async () => {
  const { data: res } = await reqGrowthReportAestheticAndArtisticAccomplishment(
    props.studentId,
  )
  artisticActivities.value = res.artisticActivities
  talentShow.value = res.talentShow
  artSocieties.value = res.artSocieties
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <module-title
      title="审美与艺术修养"
      :background2="['bg-gradient-to-r from-[#17c492] to-[#ffffff]']"
    />

    <M41 :data="artisticActivities" />
    <M42 :data="talentShow" />
    <M43 />
  </div>
</template>

<style scoped lang="scss">
.tag {
  padding: 6px 12px;
  border: 1px solid #916dff;
  box-sizing: border-box;
  width: auto;
  display: inline-flex;
}
</style>

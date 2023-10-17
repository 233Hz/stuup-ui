<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { CivilizedCultivation } from '@/api/growthReport/type'

defineProps<{
  data?: CivilizedCultivation
}>()
</script>

<template>
  <module-card header-left-text="文明修养" color="#2594ff33">
    <div class="p-[10px]">
      <custom-item>
        <p>
          获得六项评比流动红旗（班级前十）
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countMobileRedFlags || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          获得文明寝室（先进）
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countCivilizationBedroom || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>

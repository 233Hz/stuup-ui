<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { CivilizedCultivation } from '@/api/growthReport/type'

defineProps<{
  data?: CivilizedCultivation
}>()
</script>

<template>
  <module-card header-left-text="文明修养（违规）" color="#2594ff33">
    <div class="p-[10px]">
      <custom-item>
        <p>
          仪表仪容违规
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countGroomingViolations || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          文明礼仪违规
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countViolationOfCivilityAndEtiquette || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          卫生环境违规
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countSanitaryEnvironmentViolations || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>

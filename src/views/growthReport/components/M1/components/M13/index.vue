<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { CivilizedCultivation } from '@/api/growthReport/type'

defineProps<{
  data?: CivilizedCultivation
}>()
</script>

<template>
  <module-card header-left-text="文明修养（违规）" color="#17c492">
    <div class="p-[10px]">
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          仪表仪容违规
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countGroomingViolations || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          文明礼仪违规
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countViolationOfCivilityAndEtiquette || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          卫生环境违规
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countSanitaryEnvironmentViolations || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { PsychologicalLiteracy } from '@/api/growthReport/type'

defineProps<{
  data?: PsychologicalLiteracy
}>()
</script>

<template>
  <module-card header-left-text="身体素养" color="#17c492">
    <div class="p-[10px]">
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          参加心理剧或心理月展示活动
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countPsychodramaOrPsychoMonthShowcase || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          参与心理中心活动
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countPsychologicalCenter || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>

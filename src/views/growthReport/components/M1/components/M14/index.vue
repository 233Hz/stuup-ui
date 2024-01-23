<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { BeDisciplinedAndSelfDisciplined } from '@/api/growthReport/type'

defineProps<{
  data?: BeDisciplinedAndSelfDisciplined
}>()
</script>

<template>
  <module-card header-left-text="遵纪自律" color="#17c492">
    <div class="p-[10px]">
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          纪律处分
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countDisciplinaryAction || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          迟到早退
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countLateArrivalAndEarlyDeparture || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          上课缺勤
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countAbsenteeismFromClass || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          不准时出操
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countNotGettingOutOnTime || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

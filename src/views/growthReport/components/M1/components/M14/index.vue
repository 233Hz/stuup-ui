<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { BeDisciplinedAndSelfDisciplined } from '@/api/growthReport/type'

defineProps<{
  data?: BeDisciplinedAndSelfDisciplined
}>()
</script>

<template>
  <module-card header-left-text="遵纪自律" color="#2594ff33">
    <div class="p-[10px]">
      <custom-item>
        <p>
          纪律处分
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countDisciplinaryAction || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          迟到早退
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countLateArrivalAndEarlyDeparture || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          上课缺勤
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countAbsenteeismFromClass || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          不准时出操
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countNotGettingOutOnTime || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

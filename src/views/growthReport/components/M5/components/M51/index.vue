<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { LArtisticActivities } from '@/api/growthReport'

defineProps<{
  data?: LArtisticActivities
}>()
</script>

<template>
  <module-card header-left-text="艺术活动" color="#00d2c933">
    <div class="p-[10px]">
      <custom-item background-color="#00d2c91a" border-left-color="#00d2c9">
        <p>
          参加志愿者服务
          <span class="text-[24px] text-bold mx-[10px] text-[#00d2c9]">
            {{ data?.countVolunteerService || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#00d2c91a" border-left-color="#00d2c9">
        <p>
          参加交通岗值勤
          <span class="text-[24px] text-bold mx-[10px] text-[#00d2c9]">
            {{ data?.countTrafficPostsAreOnDuty || 0 }}
          </span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>

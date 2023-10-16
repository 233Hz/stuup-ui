<script setup lang="ts">
import { computed } from 'vue'
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { PhysicalLiteracy } from '@/api/growthReport/type'

const { data } = defineProps<{
  data?: PhysicalLiteracy
}>()

const isParticipateInCompetitions = computed(() => {
  return !(
    (data?.countNationalLevel || 0) === 0 ||
    (0 === 0 && data?.countMunicipalLevel) ||
    (0 === 0 && data?.countDistrictIndustryLevel) ||
    (0 === 0 && data?.countSchoolLevel)
  )
})
</script>

<template>
  <div class="h-full">
    <module-card header-left-text="身体素养" color="#fca93c33">
      <div class="p-[10px] flex gap-[10px]">
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="nation-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">国家级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                {{ data?.countNationalLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="city-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">市级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                {{ data?.countMunicipalLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="district-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">行（区）级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                {{ data?.countDistrictIndustryLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="school-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">校级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                {{ data?.countSchoolLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
      </div>
      <custom-item
        v-if="!isParticipateInCompetitions"
        background-color="#fca93c1a"
        :show-left-border="false"
      >
        <p class="text-center">未参加过体育比赛</p>
      </custom-item>
    </module-card>
  </div>
</template>

<style scoped lang="scss"></style>

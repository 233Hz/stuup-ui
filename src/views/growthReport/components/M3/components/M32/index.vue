<script setup lang="ts">
import { computed } from 'vue'
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { PhysicalLiteracy } from '@/api/growthReport/type'

const props = defineProps<{
  data?: PhysicalLiteracy
}>()

const isParticipateInCompetitions = computed(() => {
  return !(
    (props.data?.countNationalLevel || 0) === 0 ||
    (0 === 0 && props.data?.countMunicipalLevel) ||
    (0 === 0 && props.data?.countDistrictIndustryLevel) ||
    (0 === 0 && props.data?.countSchoolLevel)
  )
})
</script>

<template>
  <div class="h-full">
    <module-card header-left-text="身体素养" color="#17c492">
      <div class="p-[10px] flex gap-[10px]">
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="nation-level"
            color="#17c492"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[24px] font-bold">国家级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#17c492]">
                {{ data?.countNationalLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="city-level"
            color="#17c492"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[24px] font-bold">市级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#17c492]">
                {{ data?.countMunicipalLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="district-level"
            color="#17c492"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[24px] font-bold">行（区）级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#17c492]">
                {{ data?.countDistrictIndustryLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="school-level"
            color="#17c492"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[24px] font-bold">校级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#17c492]">
                {{ data?.countSchoolLevel || 0 }}
              </span>
              次
            </p>
          </div>
        </div>
      </div>
      <custom-item
        v-if="!isParticipateInCompetitions"
        background-color="#17c492"
        :show-left-border="false"
      >
        <p class="text-center text-white">未参加过体育比赛</p>
      </custom-item>
    </module-card>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import type { DoubleInnovationCompetition } from '@/api/growthReport/type'

defineProps<{
  data?: DoubleInnovationCompetition
}>()
</script>

<template>
  <module-card header-left-text="双创比赛" color="#fd3d7f33" class="h-full">
    <div class="p-[10px]">
      <div class="flex gap-[10px]">
        <div class="flex-1 p-[10px]">
          <div class="flex h-[80px] gap-[10px]">
            <svg-icon
              name="nation-level"
              width="80px"
              height="80px"
              color="#fd3d7f"
            />
            <div class="flex-1 flex flex-col justify-center text-white">
              <p class="text-[24px] font-bold">国家级</p>
              <p class="text-[18px] mt-[20px]">
                <span class="text-[24px] text-bold text-[#fd3d7f] mx-[4px]">
                  {{ data?.countNationalLevel || 0 }}
                </span>
                次
              </p>
            </div>
          </div>
        </div>
        <div class="flex-1 p-[10px]">
          <div class="flex h-[80px] gap-[10px]">
            <svg-icon
              name="city-level"
              width="80px"
              height="80px"
              color="#fd3d7f"
            />
            <div class="flex-1 flex flex-col justify-center text-white">
              <p class="text-[24px] font-bold">市级</p>
              <p class="text-[18px] mt-[20px]">
                <span class="text-[24px] text-bold text-[#fd3d7f] mx-[4px]">
                  {{ data?.countMunicipalLevel || 0 }}
                </span>
                次
              </p>
            </div>
          </div>
        </div>
        <div class="flex-1 p-[10px]">
          <div class="flex h-[80px] gap-[10px]">
            <svg-icon
              name="district-level"
              width="80px"
              height="80px"
              color="#fd3d7f"
            />
            <div class="flex-1 flex flex-col justify-center text-white">
              <p class="text-[24px] font-bold">区（行业）级</p>
              <p class="text-[18px] mt-[20px]">
                <span class="text-[24px] text-bold text-[#fd3d7f] mx-[4px]">
                  {{ data?.countDistrictIndustryLevel || 0 }}
                </span>
                次
              </p>
            </div>
          </div>
        </div>
        <div class="flex-1 p-[10px]">
          <div class="flex h-[80px] gap-[10px]">
            <svg-icon
              name="school-level"
              width="80px"
              height="80px"
              color="#fd3d7f"
            />
            <div class="flex-1 flex flex-col justify-center text-white">
              <p class="text-[24px] font-bold">校级</p>
              <p class="text-[18px] mt-[20px]">
                <span class="text-[24px] text-bold text-[#fd3d7f] mx-[4px]">
                  {{ data?.countSchoolLevel || 0 }}
                </span>
                次
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[10px]" />
      <div class="flex gap-[10px]">
        <div class="flex-1">
          <custom-item
            v-for="item in data?.nationalLevelRecords"
            :key="item"
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">{{ item }}</p>
          </custom-item>
          <custom-item
            v-if="
              !(
                data?.nationalLevelRecords &&
                data.nationalLevelRecords.length > 0
              )
            "
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">未参加任何国家级比赛</p>
          </custom-item>
        </div>
        <div class="flex-1">
          <custom-item
            v-for="item in data?.municipalLevelRecords"
            :key="item"
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">{{ item }}</p>
          </custom-item>
          <custom-item
            v-if="
              !(
                data?.municipalLevelRecords &&
                data.municipalLevelRecords.length > 0
              )
            "
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">未参加任何市级比赛</p>
          </custom-item>
        </div>
        <div class="flex-1">
          <custom-item
            v-for="item in data?.districtIndustryLevelRecords"
            :key="item"
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">{{ item }}</p>
          </custom-item>
          <custom-item
            v-if="
              !(
                data?.districtIndustryLevelRecords &&
                data.districtIndustryLevelRecords.length > 0
              )
            "
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">未参加任何区（行）级比赛</p>
          </custom-item>
        </div>
        <div class="flex-1">
          <custom-item
            v-for="item in data?.schoolLevelRecords"
            :key="item"
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">{{ item }}</p>
          </custom-item>
          <custom-item
            v-if="
              !(data?.schoolLevelRecords && data.schoolLevelRecords.length > 0)
            "
            :show-left-border="false"
            background-color="#fd3d7f1a"
          >
            <p class="text-center">未参加任何校级比赛</p>
          </custom-item>
        </div>
      </div>
    </div>
  </module-card>
</template>

<style scoped lang="scss">
table,
th,
td {
  border: 1px solid white;
  vertical-align: middle;
}

th,
td {
  line-height: 30px;
  color: white;
}
</style>

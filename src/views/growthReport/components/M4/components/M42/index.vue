<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import CustomTag from '../../../CustomTag/index.vue'
import type { TalentShow } from '@/api/growthReport/type'

defineProps<{
  data?: TalentShow
}>()
</script>

<template>
  <module-card header-left-text="才艺展示" color="#17c492">
    <div class="p-[10px]">
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          国家级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countNationalLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <template
            v-if="
              data?.nationalLevelRecords &&
              data?.nationalLevelRecords.length > 0
            "
          >
            <custom-tag
              v-for="item in data?.nationalLevelRecords"
              :key="item"
              class="mt-[10px] mr-[10px]"
              border-color="#17c492"
              :text="item"
            />
          </template>
          <custom-item
            v-else
            background-color="#17c492"
            :show-left-border="false"
          >
            <p class="text-center text-white">未参加任何国家级比赛</p>
          </custom-item>
        </div>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          市级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countMunicipalLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <template
            v-if="
              data?.municipalLevelRecords &&
              data?.municipalLevelRecords.length > 0
            "
          >
            <custom-tag
              v-for="item in data?.municipalLevelRecords"
              :key="item"
              class="mt-[10px] mr-[10px]"
              border-color="#17c492"
              :text="item"
            />
          </template>
          <custom-item
            v-else
            background-color="#17c492"
            :show-left-border="false"
          >
            <p class="text-center text-white">未参加任何市级比赛</p>
          </custom-item>
        </div>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          区（行）级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countDistrictIndustryLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <template
            v-if="
              data?.districtIndustryLevelRecords &&
              data?.districtIndustryLevelRecords.length > 0
            "
          >
            <custom-tag
              v-for="item in data?.districtIndustryLevelRecords"
              :key="item"
              class="mt-[10px] mr-[10px]"
              border-color="#17c492"
              :text="item"
            />
          </template>
          <custom-item
            v-else
            background-color="#17c492"
            :show-left-border="false"
          >
            <p class="text-center text-white">未参加任何区（行）级比赛</p>
          </custom-item>
        </div>
      </custom-item>
      <custom-item background-color="#f4f4f5" border-left-color="#17c492">
        <p>
          校级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#17c492]">
            {{ data?.countSchoolLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <template
            v-if="
              data?.schoolLevelRecords && data?.schoolLevelRecords.length > 0
            "
          >
            <custom-tag
              v-for="item in data?.schoolLevelRecords"
              :key="item"
              class="mt-[10px] mr-[10px]"
              border-color="#17c492"
              :text="item"
            />
          </template>
          <custom-item
            v-else
            background-color="#17c492"
            :show-left-border="false"
          >
            <p class="text-center text-white">未参加任何校级比赛</p>
          </custom-item>
        </div>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>

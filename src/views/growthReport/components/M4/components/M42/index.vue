<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import CustomTag from '../../../CustomTag/index.vue'
import type { TalentShow } from '@/api/growthReport/type'

const { data } = defineProps<{
  data?: TalentShow
}>()
</script>

<template>
  <module-card header-left-text="才艺展示" color="#916dff33">
    <div class="p-[10px]">
      <custom-item background-color="#916dff1a" border-left-color="#916dff">
        <p>
          国家级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">
            {{ data?.countNationalLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <custom-tag
            v-if="
              data?.nationalLevelRecords &&
              data?.nationalLevelRecords.length > 0
            "
            v-for="item in data?.nationalLevelRecords"
            class="mt-[10px] mr-[10px]"
            border-color="#916dff"
            :text="item"
          />
          <custom-item background-color="#916dff1a" :show-left-border="false">
            <p class="text-center">未参加任何国家级比赛</p>
          </custom-item>
        </div>
      </custom-item>
      <custom-item background-color="#916dff1a" border-left-color="#916dff">
        <p>
          市级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">
            {{ data?.countMunicipalLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <custom-tag
            v-if="
              data?.municipalLevelRecords &&
              data?.municipalLevelRecords.length > 0
            "
            v-for="item in data?.municipalLevelRecords"
            class="mt-[10px] mr-[10px]"
            border-color="#916dff"
            :text="item"
          />
          <custom-item background-color="#916dff1a" :show-left-border="false">
            <p class="text-center">未参加任何市级比赛</p>
          </custom-item>
        </div>
      </custom-item>
      <custom-item background-color="#916dff1a" border-left-color="#916dff">
        <p>
          区（行）级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">
            {{ data?.countDistrictIndustryLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <custom-tag
            v-if="
              data?.districtIndustryLevelRecords &&
              data?.districtIndustryLevelRecords.length > 0
            "
            v-for="item in data?.districtIndustryLevelRecords"
            class="mt-[10px] mr-[10px]"
            border-color="#916dff"
            :text="item"
          />
          <custom-item background-color="#916dff1a" :show-left-border="false">
            <p class="text-center">未参加任何区（行）级比赛</p>
          </custom-item>
        </div>
      </custom-item>
      <custom-item background-color="#916dff1a" border-left-color="#916dff">
        <p>
          校级获奖次数
          <span class="text-[24px] text-bold mx-[10px] text-[#916dff]">
            {{ data?.countSchoolLevel || 0 }}
          </span>
          次
        </p>
        <div>
          <custom-tag
            v-if="
              data?.schoolLevelRecords && data?.schoolLevelRecords.length > 0
            "
            v-for="item in data?.schoolLevelRecords"
            class="mt-[10px] mr-[10px]"
            border-color="#916dff"
            :text="item"
          />
          <custom-item background-color="#916dff1a" :show-left-border="false">
            <p class="text-center">未参加任何校级比赛</p>
          </custom-item>
        </div>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>

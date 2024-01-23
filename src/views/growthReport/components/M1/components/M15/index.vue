<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import type { IndividualHonors } from '@/api/growthReport/type'

defineProps<{
  data?: IndividualHonors
}>()
</script>

<template>
  <module-card header-left-text="个人荣誉" color="#17c492">
    <div class="grid grid-cols-6 grid-rows-3 gap-[10px] p-[10px]">
      <div class="col-span-3 p-[10px]">
        <div class="item">
          <div class="item_value">
            <div class="item_number">
              {{ data?.countNationalScholarships || 0 }}
            </div>
            <div class="item_units">次</div>
          </div>
          <div class="item_name">获得国家级奖学金</div>
        </div>
      </div>
      <div class="col-span-3 p-[10px]">
        <div class="item">
          <div class="item_value">
            <div class="item_number">
              {{ data?.countMunicipalHonors || 0 }}
            </div>
            <div class="item_units">次</div>
          </div>
          <div class="item_name">获得市级荣誉</div>
        </div>
      </div>
      <div class="col-span-2 p-[10px]">
        <div class="item">
          <div class="item_value">
            <div class="item_number">
              {{ data?.countDistrictLevelIndustryHonors || 0 }}
            </div>
            <div class="item_units">次</div>
          </div>
          <div class="item_name">获得区级（行业）荣誉</div>
        </div>
      </div>
      <div class="col-span-2 p-[10px]">
        <div class="item">
          <div class="item_value">
            <div class="item_number">
              {{ data?.countSchoolScholarships || 0 }}
            </div>
            <div class="item_units">次</div>
          </div>
          <div class="item_name">获得校级奖学金</div>
        </div>
      </div>
      <div class="col-span-2 p-[10px]">
        <div class="item">
          <div class="item_value">
            <div class="item_number">
              {{ data?.countMiyoshiStudent || 0 }}
            </div>
            <div class="item_units">次</div>
          </div>
          <div class="item_name">三好学生</div>
        </div>
      </div>
      <div class="col-span-3 p-[10px]">
        <div class="item">
          <div class="item_value">
            <div class="item_number">
              {{ data?.countOutstandingStudentRegimentCadres || 0 }}
            </div>
            <div class="item_units">次</div>
          </div>
          <div class="item_name">优秀学生（团）干部</div>
        </div>
      </div>
      <div class="col-span-3 p-[10px]">
        <div class="item">
          <div class="item_value">
            <div class="item_number">
              {{ data?.countGoodStudentsInPharmacySchool || 0 }}
            </div>
            <div class="item_units">次</div>
          </div>
          <div class="item_name">药校好学子</div>
        </div>
      </div>
    </div>
  </module-card>
</template>

<style scoped>
.item {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .item_value {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: end;

    .item_number {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #17c492;
      text-align: center;
      line-height: 80px;
      font-size: 42px;
      color: white;
      font-weight: 600;
    }

    .item_units {
      font-size: 14px;
      /* color: white; */
    }

    .item_name {
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      /* color: white; */
    }
  }
  .item_name {
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    /* color: white; */
  }
}
</style>

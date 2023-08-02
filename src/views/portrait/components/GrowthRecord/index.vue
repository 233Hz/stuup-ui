<template>
  <div class="growth-record p-20">
    <div class="growth-record-wrapper">
      <ul class="record-link fs-14 line-h-42 flex">
        <li
          v-for="(item, index) in ['2020上', '2020下', '2021上', '2021下', '2022上', '2022下']"
          :key="index"
          :class="index === 0 ? 'tab-active' : ''"
          class="min-w-80 text-center px-12 mx-12 br-8 hover:cursor-pointer hover:bg-teal-50 hover:text-teal-500 hover:font-bold">
          第{{ item }}学期
        </li>
      </ul>
      <el-divider>成长数据</el-divider>
      <CrowthData />
      <el-divider>学习课程</el-divider>
      <div class="w-full flex">
        <div class="flex-1">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="curseName" label="课程名称" header-align="center" align="center" />
            <el-table-column prop="curseScore" label="课程成绩" header-align="center" align="center" />
          </el-table>
        </div>
        <div class="flex-2">
          <CourseComparisonChart />
        </div>
      </div>
      <el-divider>成长对比</el-divider>
      <GrowthComparisonChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import CrowthData from './CrowthData.vue';
import CourseComparisonChart from './CourseComparisonChart.vue';
import GrowthComparisonChart from './GrowthComparisonChart.vue';

const list = [
  {
    label: '成长分',
    value: '200分',
  },
  {
    label: '全校排名',
    value: '123名',
  },
  {
    label: '成长扣除分',
    value: '100分',
  },
  {
    label: '参加活动次数',
    value: '12次',
  },
  {
    label: '获奖次数',
    value: '1次',
  },
  {
    label: '获得证书',
    value: '1次',
  },
];

const tableData = Array.from({ length: 7 }, (_, index) => {
  return {
    curseName: '课程' + (index + 1),
    curseScore: Math.floor(Math.random() * 50 + 50),
  };
});
</script>

<style scoped lang="scss">
.tab-active {
  font-weight: bold;
  color: rgb(20 184 166);
  background-color: rgb(240 253 250);
}
</style>

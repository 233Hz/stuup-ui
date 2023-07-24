<template>
  <div class="w-full h-400">
    <el-table :data="tableData" style="width: 100%" height="350">
      <el-table-column prop="awardName" label="获奖名称" header-align="center" align="center" />
      <el-table-column prop="awardType" label="获奖类型" header-align="center" align="center" />
      <el-table-column prop="awardTime" label="获奖时间" header-align="center" align="center" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
const tableData = [
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
  {
    awardName: 'XXX竞赛',
    awardType: '国家级',
    awardTime: '2023-01-01',
  },
];
</script>

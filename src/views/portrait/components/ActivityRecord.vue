<template>
  <div class="w-full h-400">
    <el-table :data="tableData" style="width: 100%" height="350">
      <el-table-column prop="activeName" label="活动名称" header-align="center" align="center" />
      <el-table-column prop="activeTime" label="参加时间" header-align="center" align="center" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
const tableData = [
  {
    activeName: 'XX活动',
    activeTime: '2023-01-01',
  },
  {
    activeName: 'XX活动',
    activeTime: '2023-01-01',
  },
  {
    activeName: 'XX活动',
    activeTime: '2023-01-01',
  },
  {
    activeName: 'XX活动',
    activeTime: '2023-01-01',
  },
  {
    activeName: 'XX活动',
    activeTime: '2023-01-01',
  },
];
</script>

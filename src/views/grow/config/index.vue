<template>
  <el-row :gutter="10" style="margin: 20px">
    <el-col :sm="24" :xl="6">
      <growth-tree />
    </el-col>
    <el-col :sm="24" :xl="18">
      <growth-item-table />
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="GrowConfig">
import GrowthTree from './growth-tree/index.vue'
import GrowthItemTable from './GrowthItemTable/index.vue'
</script>

<template>
  <el-row :gutter="10" style="margin: 20px">
    <el-col :span="6">
      <growth-tree />
    </el-col>
    <el-col :span="18">
      <growth-item-table />
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="GrowConfig">
import GrowthTree from './GrowthTree/index.vue'
import GrowthItemTable from './GrowthItemTable/index.vue'
</script>

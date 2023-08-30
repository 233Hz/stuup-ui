<template>
  <el-tabs class="m-20" tab-position="left">
    <el-tab-pane label="处理中"><un-handle-tab /></el-tab-pane>
    <el-tab-pane label="已完成"><handle-tab /></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import HandleTab from './HandleTab/index.vue'
import UnHandleTab from './UnHandleTab/index.vue'
</script>

<style scoped lang="scss"></style>

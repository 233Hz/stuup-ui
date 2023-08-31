<template>
  <div class="p-20">
    <el-page-header :icon="ArrowLeft" @back="router.back()">
      <template #content>
        <span class="text-large font-600 mr-3">学生日常采集</span>
      </template>
    </el-page-header>
    <el-tabs type="border-card" class="mt-20">
      <el-tab-pane label="处理中"><un-handle-tab /></el-tab-pane>
      <el-tab-pane label="已完成"><handle-tab /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import HandleTab from './HandleTab/index.vue'
import UnHandleTab from './UnHandleTab/index.vue'

const router = useRouter()
</script>

<style scoped lang="scss"></style>

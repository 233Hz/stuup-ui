<template>
  <div>
    <el-tabs v-model="activeTab" class="m-10" type="border-card">
      <el-tab-pane label="学生申请" :name="1">
        <student-audit />
      </el-tab-pane>
      <el-tab-pane label="学生干部采集" :name="2">
        <student-union-audit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts" name="Audit">
import { ref } from 'vue'
import StudentAudit from './StudentAudit/index.vue'
import StudentUnionAudit from './StudentUnionAudit/index.vue'

const activeTab = ref<1 | 2>(1)
</script>

<style scoped></style>

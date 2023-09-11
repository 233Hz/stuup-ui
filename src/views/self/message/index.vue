<template>
  <el-row>
    <el-col :span="12">
      <Notify />
    </el-col>
    <el-col :span="12">
      <System />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Notify from './Notify.vue'
import System from './System.vue'
</script>

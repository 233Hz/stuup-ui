<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const locale = computed(() => zhCn);
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>

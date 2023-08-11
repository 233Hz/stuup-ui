<template>
  <el-scrollbar class="bunga-aside">
    <Menu :routes="premissionStore.backAsideRouters" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import usePermissionStore from '@/store/modules/premission'
import Menu from './Menu.vue'

const premissionStore = usePermissionStore()
</script>

<style scoped lang="scss">
@include b(aside) {
  width: var(--aside-width);
  height: 100%;
  background-color: var(--aside-menu-background);
}
</style>

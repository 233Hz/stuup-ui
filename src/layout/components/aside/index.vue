<template>
  <div class="aside">
    <el-scrollbar class="menu">
      <Menu :routes="premissionStore.backAsideRouters" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import usePermissionStore from '@/store/modules/premission'
import Logo from '../logo/index.vue'
import Menu from '../menu/index.vue'

const premissionStore = usePermissionStore()
</script>

<style scoped lang="scss">
.aside {
  height: 100%;
  background-color: var(--aside-menu-background);
}
</style>

<template>
  <div class="aside">
    <el-scrollbar class="menu">
      <el-menu
        :default-active="route.path"
        unique-opened
        text-color="var(--aside-menu-text)"
        active-text-color="var(--aside-menu-text)"
        background-color="var(--aside-menu-background)"
        router
      >
        <Menu :routes="backRoutes" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import usePermissionStore from '@/store/modules/premission'
import Menu from '../menu/index.vue'
import { filterRouter } from '@/utils/util'
import { MENU_TYPE } from '@/utils/dict'

const route = useRoute()
const premissionStore = usePermissionStore()
const backRoutes = filterRouter(premissionStore.routes, MENU_TYPE.BACK)
console.log(backRoutes)
</script>

<style scoped lang="scss">
.aside {
  height: 100%;
  background-color: var(--aside-menu-background);
}
</style>

<style lang="scss">
.el-menu {
  .el-sub-menu__title:hover,
  .el-menu-item:hover {
    background-color: var(--aside-menu-active-background) !important;
  }

  .is-active {
    background-color: var(--aside-menu-active-background) !important;
  }
}
</style>

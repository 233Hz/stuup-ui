<template>
  <div class="aside">
    <div class="menu">
      <el-scrollbar>
        <el-menu
          :collapse="isCollapse"
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
    <div class="shrink">
      <el-icon
        :size="24"
        color="#fff"
        class="cursor-pointer"
        @click="isCollapse = !isCollapse"
      >
        <Expand v-show="isCollapse" />
        <Fold v-show="!isCollapse" />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import usePermissionStore from '@/store/modules/permission'
import Menu from '../menu/index.vue'
import { filterRouter } from '@/utils/util'
import { MENU_FLAG } from '@/utils/dict'
import { Expand, Fold } from '@element-plus/icons-vue'

const route = useRoute()
const permissionStore = usePermissionStore()
const backRoutes = filterRouter(permissionStore.routes, MENU_FLAG.BACK)

const isCollapse = ref(false)
</script>

<style scoped lang="scss">
.aside {
  height: 100%;
  background-color: var(--aside-menu-background);
  display: flex;
  flex-direction: column;

  .menu {
    flex: 1;
    overflow: hidden;
  }

  .shrink {
    height: 30px;
    border-top: #fff solid 2px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<style lang="scss">
.el-menu {
  border-right: 0;
  .el-sub-menu__title:hover,
  .el-menu-item:hover {
    background-color: var(--aside-menu-active-background) !important;
  }

  .is-active {
    background-color: var(--aside-menu-active-background) !important;
  }
}
</style>

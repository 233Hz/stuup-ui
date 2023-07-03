<template>
  <el-menu
    v-bind="$attrs"
    :default-active="route.path"
    unique-opened
    text-color="var(--aside-menu-text)"
    active-text-color="var(--aside-menu-text)"
    background-color="var(--aside-menu-background)">
    <menu-item v-for="(route, index) in routes" :key="route.path + index" :route="route" />
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuVO } from '@/api/system/menu/index';
import MenuItem from './MenuItem.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

type Props<T> = {
  routes?: T[] | [];
};

defineProps<Props<MenuVO>>();
</script>

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

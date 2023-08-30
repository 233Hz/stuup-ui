<template>
  <template v-for="route in routes" :key="route.name">
    <!--没有子路由-->
    <template v-if="!route.children || route.children.length === 0">
      <el-menu-item :index="route.path" v-if="!route.meta?.hidden">
        <el-icon v-if="route.meta?.icon">
          <component :is="route.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ route.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但是只有一个子路由 -->
    <template v-if="route.children && route.children.length == 1">
      <el-menu-item
        :index="route.children[0].path"
        v-if="!route.children[0].meta?.hidden"
      >
        <el-icon v-if="route.children[0].meta?.icon">
          <component :is="route.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ route.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且个数大于一个1 -->
    <el-sub-menu
      :index="route.path"
      v-if="route.children && route.children.length > 1"
    >
      <template #title>
        <el-icon v-if="route.meta?.icon">
          <component :is="route.meta.icon"></component>
        </el-icon>
        <span>{{ route.meta?.title }}</span>
      </template>
      <Menu :routes="route.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

type Props = {
  routes: RouteRecordRaw[]
}
defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

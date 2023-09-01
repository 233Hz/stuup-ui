<template>
  <div class="w-500">
    <div class="relative flex flex-wrap">
      <menu-item
        v-for="item in frontRoute"
        :key="item.name"
        :title="item.meta?.title"
        :path="item.path"
        :icon="item.meta?.icon"
      />
      <menu-item
        v-if="permissionStore.hasBackEntrance"
        title="后台管理"
        path="/dashboard"
        icon="home-icon-back"
      />
      <menu-item
        title="智慧提醒"
        path="/self/notify"
        icon="home-icon-message"
      />
      <menu-item title="个人中心" path="/self/center" icon="home-icon-self" />
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissionStore from '@/store/modules/permission'
import { filterRouter } from '@/utils/util'
import { MENU_FLAG } from '@/utils/dict'
import MenuItem from './MenuItem.vue'

const permissionStore = usePermissionStore()

const frontRoute = filterRouter(permissionStore.routes, MENU_FLAG.FRONT)
</script>

<style scoped lang="scss"></style>

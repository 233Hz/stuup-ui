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
      <menu-item title="个人中心" path="/self/center" icon="home-icon-self" />
      <menu-item
        title="我的消息"
        path="/self/notify"
        icon="home-icon-message"
      />
      <menu-item
        title="后台管理"
        path="/dashboard"
        icon="home-icon-back"
        v-if="userStore.userInfo.userType === USER_TYPE.TEACHER"
      />
      <menu-item
        title="退出登入"
        icon="home-icon-logout"
        @click="handleLogout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'
import { filterRouter } from '@/utils/util'
import { USER_TYPE, MENU_FLAG } from '@/utils/dict'
import MenuItem from './MenuItem.vue'
import { ElMessageBox } from 'element-plus'

const userStore = useUserStore()
const permissionStore = usePermissionStore()

const frontRoute = filterRouter(permissionStore.routes, MENU_FLAG.FRONT)

const handleLogout = () => {
  ElMessageBox.confirm('确认退出？', '退出登入', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await userStore.userLogout()
      window.location.reload()
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>

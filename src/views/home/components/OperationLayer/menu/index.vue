<template>
  <div>
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
        v-if="userStore.userInfo.userType === USER_TYPE.STUDENT"
        title="我的成长画像"
        icon="home-icon-portrait"
        :path="portraitPath"
      />
      <menu-item title="个人中心" path="/self/center" icon="home-icon-self" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'
import { filterRouter } from '@/utils/util'
import { MENU_FLAG, USER_TYPE } from '@/utils/dict'
import MenuItem from './MenuItem.vue'

const userStore = useUserStore()
const permissionStore = usePermissionStore()

const frontRoute = computed(() => {
  return filterRouter(permissionStore.routes, MENU_FLAG.FRONT)
})
const portraitPath = computed(
  () => `/portrait/${userStore.otherInfo.studentId}`,
)
</script>

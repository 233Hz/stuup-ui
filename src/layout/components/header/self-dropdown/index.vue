<template>
  <el-dropdown>
    <el-link icon="ArrowDown">{{ selfName }}</el-link>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="router.push('/self/center')">
          个人中心
        </el-dropdown-item>
        <el-dropdown-item @click="router.push('/self/notify')">
          消息通知
        </el-dropdown-item>
        <el-dropdown-item @click="handlerLogout">退出登入</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

let router = useRouter()
const userStore = useUserStore()

const selfName = computed(() => {
  let userType
  if (userStore.userInfo.userType === 1) {
    userType = '同学'
  } else if (userStore.userInfo.userType === 2) {
    userType = '老师'
  }
  return '欢迎' + userStore.userInfo.userName + userType
})

const handlerLogout = () => {
  ElMessageBox.confirm('确认退出？', '退出登入', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await userStore.userLogout()
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>

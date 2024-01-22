<template>
  <div
    class="w-full h-full flex justify-center items-center"
    style="background-color: #d5d1c2"
  >
    <div
      v-fullscreen
      class="bg w-1920 h-1080 relative overflow-hidden select-none"
    >
      <AnimationLayer class="z-10" />
      <OperationLayer class="z-20" />
      <GrowthAnimation class="z-30" />
      <Rank class="z-30" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import AnimationLayer from './components/AnimationLayer/index.vue'
import OperationLayer from './components/OperationLayer/index.vue'
import GrowthAnimation from './components/GrowthAnimation/index.vue'
import Rank from './components/Rank/index.vue'
import { ElMessageBox } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  if (userStore.updatePasswordTips) {
    ElMessageBox.confirm('当前密码较弱，建议修改密码', '提示', {
      confirmButtonText: '前去修改',
      cancelButtonText: '暂不修改',
    })
      .then(() => {
        router.push('/self/center')
      })
      .catch(() => {})
      .finally(() => {
        userStore.cancelUpdatePasswordTips()
      })
  }
})
</script>

<style lang="scss" scoped>
.bg {
  background: url(@/assets/image/home_bg.png) no-repeat center 0;
  background-size: 100% 100%;
}
</style>

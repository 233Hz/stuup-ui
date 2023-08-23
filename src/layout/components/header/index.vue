<template>
  <div class="header">
    <div class="logo"><Logo /></div>
    <div class="navbar">
      <el-space>
        <el-button
          icon="FullScreen"
          type="success"
          circle
          text
          bg
          @click="fullScreen"
        ></el-button>
        <el-button
          icon="ArrowLeft"
          type="success"
          text
          bg
          @click="router.push('/home')"
        >
          回到前台
        </el-button>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.userName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/self/center')">
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click="router.push('/self/notify')">
                我的消息
              </el-dropdown-item>
              <el-dropdown-item @click="handlerLogout">
                退出登入
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../logo/index.vue'
import useUserStore from '@/store/modules/user'
import { ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

let router = useRouter()
let route = useRoute()
const userStore = useUserStore()

//全屏按钮点击的回调
const fullScreen = () => {
  //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  let full = document.fullscreenElement
  //切换为全屏模式
  if (!full) {
    //文档根节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //变为不是全屏模式->退出全屏模式
    document.exitFullscreen()
  }
}

const handlerLogout = () => {
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

<style scoped lang="scss">
.header {
  height: 100%;
  background-color: var(--header-background);

  .logo {
    height: 100%;
    float: left;
  }

  .navbar {
    height: 100%;
    float: right;
    display: flex;
    justify-content: end;
  }
}
</style>

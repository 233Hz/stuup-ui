<template>
  <div class="header">
    <div class="logo"><Logo /></div>
    <div class="navbar">
      <el-space>
        <el-button
          icon="FullScreen"
          circle
          plain
          @click="fullScreen"
        ></el-button>
        <el-button icon="ArrowLeftBold" @click="router.push('/home')">
          回到前台
        </el-button>
        <self-drop-down />
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Logo from '../logo/index.vue'
import SelfDropDown from './self-dropdown/index.vue'

let router = useRouter()

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

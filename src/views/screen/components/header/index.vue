<template>
  <div class="header">
    <div class="left">
      <ul class="lbtns">
        <li class="lbtn" @click="$router.push('/')">首页</li>
        <li class="lbtn" @click="$router.back()">返回</li>
      </ul>
    </div>
    <div class="center">
      <h1 class="title">学生成长可视化大屏</h1>
    </div>
    <div class="right">
      <span class="rtime">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/util'

const $router = useRouter()

const time = ref(formatDate(String(new Date()), 'YYYY年MM月DD日 hh:mm:ss'))
const timer = ref(0)
onMounted(() => {
  console.log(
    setInterval(() => {
      time.value = formatDate(String(new Date()), 'YYYY年MM月DD日 hh:mm:ss')
    }, 1000),
  )
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
$margin-top: 15px;

.header {
  width: 100%;
  height: 100%;
  background: url(../../images/data-screen-header-bg.png) no-repeat;
  background-size: 100% auto;
  display: flex;

  .left,
  .center,
  .right {
    color: #29fcff;
    padding: 0 10px;
  }

  .left {
    flex: 1.5;

    .lbtns {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;

      .lbtn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        background: url(../../images/data-screen-header-btn-bg.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .center {
    flex: 2;
    .title {
      text-align: center;
      font-size: 30px;
      margin-top: 15px;
    }
  }
  .right {
    flex: 1.5;

    .rtime {
      margin-top: 20px;
      text-align: center;
      float: right;
    }
  }
}
</style>

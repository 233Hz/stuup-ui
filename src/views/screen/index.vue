<template>
  <div class="wrapper">
    <div ref="screen" class="screen" v-fullscreen>
      <div class="header">
        <Header />
      </div>
      <div class="main">
        <div class="left">
          <div class="top"><Line1 /></div>
          <div class="center"><Line2 /></div>
          <div class="bottom"><Bar1 /></div>
        </div>
        <div class="right">
          <div class="top"><r-top /></div>
          <div class="center">
            <div class="left"><Pie /></div>
            <div class="right"><Table /></div>
          </div>
          <div class="bottom">
            <Bar2 />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Screen">
import Header from './components/header/index.vue'
import Line1 from './components/line1/index.vue'
import Line2 from './components/line2/index.vue'
import Bar1 from './components/bar1/index.vue'
import RTop from './components/rtop/index.vue'
import Pie from './components/pie/index.vue'
import Table from './components/table/index.vue'
import Bar2 from './components/bar2/index.vue'
</script>

<style lang="scss" scoped>
$header-height: 70px;
$gap: 12px;

.wrapper {
  width: 100vw;
  height: 100vh;
  background: url(./images/data-screen-bg.png) no-repeat;
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    user-select: none;

    .header {
      height: $header-height;
    }

    .main {
      height: calc(100% - #{$header-height});
      display: flex;
      gap: $gap;
      padding: $gap;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: $gap;

        .top,
        .center,
        .bottom {
          flex: 1;
        }
      }

      .right {
        flex: 3;
        display: flex;
        flex-direction: column;
        gap: $gap;

        .top,
        .center,
        .bottom {
          flex: 1;
          font-size: 24px;
        }

        .center {
          display: flex;
          gap: $gap;

          .left,
          .right {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts" name="growthReport">
import Bg from './components/Bg/index.vue'
import BasicInfo from './components/BasicInfo/index.vue'
import Header from './components/Header/index.vue'
import M1 from './components/M1/index.vue'
import M2 from './components/M2/index.vue'
import M3 from './components/M3/index.vue'
import M4 from './components/M4/index.vue'
import M5 from './components/M5/index.vue'
</script>

<template>
  <div class="w-full h-full relative overflow-hidden">
    <div class="absolute left-0 top-0 w-full h-full">
      <bg />
    </div>
    <div class="w-full h-full relative overflow-y-auto">
      <div class="w-[1200px] m-auto py-[20px]">
        <Header />
        <basic-info />
        <M1 />
        <M2 />
        <M3 />
        <M4 />
        <M5 />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.module_item {
  padding: 20px;

  .module_header {
    height: 32px;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    padding-left: 20px;
    position: relative;
    color: white;
    z-index: 0;
    margin: 20px 0;
    border-radius: 4px;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      width: 200px;
      height: 100%;
      opacity: 0.3;
      background: linear-gradient(to right, #00ff95, #050d19);
    }

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      position: absolute;
      height: 2px;
      width: 100%;
      background: linear-gradient(to right, #00cd8d, #050d19);
    }
  }
}
</style>

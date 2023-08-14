<template>
  <div
    class="w-full h-full flex justify-center items-center"
    style="background-color: #d5d1c2"
  >
    <div
      v-fullscreen
      class="w-1920 h-1080 relative overflow-hidden select-none"
      style="
        background: url(src/assets/image/home_bg.png) no-repeat center 0;
        background-size: 100% 100%;
      "
    >
      <AnimationLayer class="z-10" />
      <OperationLayer class="z-20" />
      <GrowthAnimation class="z-30" />
      <Rank class="z-30" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimationLayer from './components/AnimationLayer/index.vue'
import OperationLayer from './components/OperationLayer/index.vue'
import GrowthAnimation from './components/GrowthAnimation/index.vue'
import Rank from './components/Rank/index.vue'
</script>

<template>
  <div
    class="w-full h-full flex justify-center items-center"
    style="background-color: #d5d1c2"
  >
    <div
      ref="wrapperRef"
      class="w-1920 h-1080 min-w-1920 min-h-1080 relative overflow-hidden select-none"
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
import { ref, onMounted } from 'vue'
import AnimationLayer from './components/AnimationLayer/index.vue'
import OperationLayer from './components/OperationLayer/index.vue'
import GrowthAnimation from './components/GrowthAnimation/index.vue'
import Rank from './components/Rank/index.vue'

onMounted(() => {
  resetSize()
})

const width = 1920
const height = 1080
const wrapperRef = ref()

const resetSize = () => {
  const { innerWidth, innerHeight } = window
  console.log(innerWidth, innerHeight)

  if (innerWidth > innerHeight && innerWidth / innerHeight > 16 / 9) {
    wrapperRef.value.style.transform = `scale(${innerHeight / height})`
  } else {
    wrapperRef.value.style.transform = `scale(${innerWidth / width})`
  }
}
window.onresize = () => {
  resetSize()
}
</script>

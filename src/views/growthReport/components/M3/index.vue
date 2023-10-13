<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import M31 from './components/M31/index.vue'
import M32 from './components/M32/index.vue'
</script>

<template>
  <div>
    <module-title
      title="运动与身心健康"
      :background1="['bg-gradient-to-r from-[#fca93c] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#fca93c] to-[#050c19]']"
    />
    <M31 />
    <M32 />
  </div>
</template>

<style scoped lang="scss"></style>

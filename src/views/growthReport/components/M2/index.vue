<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import M21 from './components/M21/index.vue'
import M22 from './components/M22/index.vue'
import M23 from './components/M23/index.vue'
import M24 from './components/M24/index.vue'
</script>

<template>
  <div>
    <module-title
      title="技能与学习素养"
      :background1="['bg-gradient-to-r from-[#fd3d7f] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#fd3d7f] to-[#050c19]']"
    />
    <M21 />
    <div class="flex gap-[10px]">
      <div class="flex-1"><M22 /></div>
      <div class="flex-1"><M23 /></div>
    </div>
    <M24 />
  </div>
</template>

<style scoped lang="scss"></style>

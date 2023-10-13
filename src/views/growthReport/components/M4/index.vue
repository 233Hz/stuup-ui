<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import M41 from './components/M41/index.vue'
import M42 from './components/M42/index.vue'
import M43 from './components/M43/index.vue'
</script>

<template>
  <div>
    <module-title
      title="审美与艺术修养"
      :background1="['bg-gradient-to-r from-[#916dff] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#916dff] to-[#050c19]']"
    />

    <M41 />
    <M42 />
    <M43 />
  </div>
</template>

<style scoped lang="scss">
.tag {
  padding: 6px 12px;
  border: 1px solid #916dff;
  box-sizing: border-box;
  width: auto;
  display: inline-flex;
}
</style>

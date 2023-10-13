<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import M51 from './components/M51/index.vue'
import M52 from './components/M52/index.vue'
import M53 from './components/M53/index.vue'
</script>

<template>
  <div>
    <module-title
      title="劳动与职业素养"
      :background1="['bg-gradient-to-r from-[#00d2c9] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#00d2c9] to-[#050c19]']"
    />
    <M51 />
    <div class="flex gap-[10px]">
      <div class="flex-1"><M52 /></div>
      <div class="flex-1"><M53 /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  background-color: #00d2c91a;
  border-radius: 4px;
  border-left: 4px solid #00d2c9;
  padding: 8px 16px;
  color: #fff;
  margin: 10px 0;
}
</style>

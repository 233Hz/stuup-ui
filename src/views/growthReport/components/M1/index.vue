<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import M11 from './components/M11/index.vue'
import M12 from './components/M12/index.vue'
import M13 from './components/M13/index.vue'
import M14 from './components/M14/index.vue'
</script>

<template>
  <div>
    <module-title
      title="道德与公民素养"
      :background1="['bg-gradient-to-r from-[#2594ff] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#2594ff] to-[#050c19]']"
    />
    <div class="flex flex-col gap-[10px]">
      <M11 />
      <div class="h-full flex gap-[10px]">
        <M12 class="flex-1" />
        <M13 class="flex-1" />
      </div>
      <M14 class="col-span-2" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

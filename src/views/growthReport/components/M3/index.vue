<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import CustomItem from '../CustomItem/index.vue'
import M31 from './components/M31/index.vue'
import M32 from './components/M32/index.vue'
</script>

<template>
  <div>
    <module-title
      title="社会实践与志愿服务"
      :background1="['bg-gradient-to-r from-[#fca93c] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#fca93c] to-[#050c19]']"
    />
    <custom-item background-color="#fca93c1a" border-left-color="#fca93c">
      <p>
        参加心理剧或心理月展示活动
        <span class="text-[24px] text-bold mx-[10px] text-[#fca93c]">1</span>
        次
      </p>
    </custom-item>
    <custom-item background-color="#fca93c1a" border-left-color="#fca93c">
      <p>
        参与心理中心活动
        <span class="text-[24px] text-bold mx-[10px] text-[#fca93c]">1</span>
        次
      </p>
    </custom-item>
    <M31 />
  </div>
</template>

<style scoped lang="scss"></style>

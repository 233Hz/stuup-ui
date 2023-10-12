<script setup lang="ts">
import ModuleTitle from '../ModuleTitle/index.vue'
import CustomItem from '../CustomItem/index.vue'
import M51 from './components/M51/index.vue'
import M52 from './components/M52/index.vue'
</script>

<template>
  <div>
    <module-title
      title="社会实践与志愿服务"
      :background1="['bg-gradient-to-r from-[#00d2c9] to-[#050c19]']"
      :background2="['bg-gradient-to-r from-[#00d2c9] to-[#050c19]']"
    />
    <custom-item background-color="#00d2c91a" border-left-color="#00d2c9">
      <p>
        参加志愿者服务
        <span class="text-[24px] text-bold mx-[10px] text-[#00d2c9]">1</span>
        次
      </p>
    </custom-item>
    <custom-item background-color="#00d2c91a" border-left-color="#00d2c9">
      <p>
        参加交通岗值勤
        <span class="text-[24px] text-bold mx-[10px] text-[#00d2c9]">1</span>
        次
      </p>
    </custom-item>
    <div class="flex gap-[10px]">
      <div class="flex-1"><M51 /></div>
      <div class="flex-1"><M52 /></div>
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

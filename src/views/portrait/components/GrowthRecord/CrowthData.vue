<template>
  <div class="flex gap-16 flex-wrap">
    <div
      class="w-240 h-80 br-8 bg-white px-12 py-4 flex gap-12 el-shadow-light"
      v-for="(item, index) in data"
      :key="index">
      <div class="w-60 flex">
        <img :src="icon" class="w-60 h-60 m-auto object-cover" />
      </div>
      <div class="flex-1 text-center">
        <p>
          <span class="fs-18 text-gray-400">{{ item.label }}</span>
        </p>
        <h1 class="fs-32 font-bold text-gray-600">{{ item.value }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import icon from '@/assets/svg/home-applay.svg';

const data = [
  {
    label: '成长值',
    value: 1000,
  },
  {
    label: '全校排名',
    value: 123,
  },
  {
    label: '成长扣除分',
    value: 100,
  },
  {
    label: '参加活动次数',
    value: 12,
  },
  {
    label: '获奖次数',
    value: 1,
  },
  {
    label: '获得证书',
    value: 1,
  },
];
</script>

<style scoped lang="scss">
img {
  -webkit-user-drag: none;
}
</style>

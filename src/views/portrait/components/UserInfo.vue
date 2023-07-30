<template>
  <div class="flex">
    <div class="w-198 relative">
      <div class="w-150 h-150 m-auto br-8 overflow-hidden">
        <img :src="defaultAvatar" alt="avatar" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="flex-1 flex flex-col gap-12">
      <p class="line-h-42">
        <span class="fs-24 text-black font-bold cursor-pointer hover:text-sky-400">张三</span>
      </p>
      <p class="fs-18">
        <span class="text-gray-500 mr-24">班级:</span>
        <span class="text-gray-400">22药剂（药品物流）中澳合作22623</span>
      </p>
      <p class="fs-18">
        <span class="text-gray-500 mr-24">专业:</span>
        <span class="text-gray-400">药品食品检验（药品质量检验）（中高职）</span>
      </p>
      <p class="fs-18">
        <span class="text-gray-500 mr-24">年级:</span>
        <span class="text-gray-400">2023级</span>
      </p>
      <p class="fs-18">
        <span class="text-gray-500 mr-24">手机号:</span>
        <span class="text-gray-400">13888888888</span>
      </p>
      <div class="flex mt-24 items-end gap-24">
        <div class="min-w-100 br-8 px-12 py-6 border-dashed border-1 border-gray-300">
          <p><span class="fs-18 text-gray-400">当前排名</span></p>
          <h1 class="fs-32 text-gray-700 font-bold mt-12">1</h1>
        </div>
        <div class="min-w-100 br-8 px-12 py-6 border-dashed border-1 border-gray-300">
          <p><span class="fs-18 text-gray-400">总成长值</span></p>
          <h1 class="fs-32 text-gray-700 font-bold mt-12">10000</h1>
        </div>
        <div class="min-w-100 br-8 px-12 py-6 border-dashed border-1 border-gray-300">
          <p><span class="fs-18 text-gray-400">成长扣分</span></p>
          <h1 class="fs-32 text-gray-700 font-bold mt-12">0</h1>
        </div>
        <div class="min-w-98 br-8 px-12 py-6 border-dashed border-1 border-gray-300">
          <p><span class="fs-18 text-gray-400">成长等级</span></p>
          <div class="flex gap-12 junstify-center pt-12">
            <div
              class="w-60 h-60 relative"
              v-for="(item, index) in conversionFlower.calculateConversionFlower(100)"
              :key="index">
              <div class="absolute w-full l-0 b-0 text-center text-white fs-12 bg-orange-400 rounded-full">
                <span class="mr-2">x</span>
                <span class="fs-14">{{ item.value }}</span>
              </div>
              <img
                :src="item.imageSrc"
                class="w-full h-full object-cover rounded-full"
                style="-webkit-user-drag: none"
                alt="用户等级" />
            </div>
          </div>
        </div>
      </div>
      <div class="fs-18">
        <p><span class="text-gray-500 mr-24">参加社团</span></p>
        <div class="mt-12 flex gap-12 flex-wrap">
          <div class="mb-12" v-for="item in 10" :key="item">
            <span class="bg-sky-300 br-4 px-12 py-8 text-white mr-12">社团{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/image/default_avatar.webp';
import { useConversionFlower } from '@/utils/conversionFlower';

const conversionFlower = useConversionFlower();
</script>

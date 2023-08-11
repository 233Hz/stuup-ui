<template>
  <div class="h-full flex flex-col gap-12">
    <div class="flex-1 h-full">
      <dv-border-box10>
        <div class="h-full p-10">
          <div
            class="h-full flex justify-center flex-wrap gap-12 overflow-y-auto"
          >
            <div
              class="w-240 h-full flex items-center gap-12"
              v-for="(item, index) in option1DataArr"
              :key="index"
            >
              <div class="flex-1 flex">
                <svg-icon
                  class="m-auto"
                  :name="item.icon"
                  width="70px"
                  height="70px"
                ></svg-icon>
              </div>
              <div
                class="flex-2 h-full text-center flex flex-col justify-center gap-20"
              >
                <h3 class="fs-18 font-semibold text-white">{{ item.name }}</h3>
                <p class="fs-24 font-bold text-#29fcff">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </dv-border-box10>
    </div>
    <div class="flex-1 h-full">
      <dv-border-box10>
        <div class="h-full p-10">
          <div
            class="h-full flex justify-center flex-wrap gap-12 overflow-y-auto"
          >
            <div
              class="w-240 h-full flex items-center gap-12"
              v-for="(item, index) in option2DataArr"
              :key="index"
            >
              <div class="flex-2 flex">
                <svg-icon
                  class="m-auto"
                  :name="item.icon"
                  width="70px"
                  height="70px"
                ></svg-icon>
              </div>
              <div
                class="flex-3 h-full text-center flex flex-col justify-center gap-20"
              >
                <h3 class="fs-18 font-semibold text-white">{{ item.name }}</h3>
                <p class="fs-24 font-bold text-#29fcff">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </dv-border-box10>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import { option1, option2 } from './config'

const option1DataArr = Object.values(option1).map((item) => {
  return {
    ...item,
    value: Math.floor(Math.random() * 1000),
  }
})
const option2DataArr = Object.values(option2).map((item) => {
  return {
    ...item,
    value: Math.floor(Math.random() * 1000),
  }
})
</script>

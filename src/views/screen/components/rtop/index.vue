<template>
  <div class="h-full flex flex-col gap-12">
    <div class="flex-1 h-full">
      <dv-border-box10>
        <div class="h-full p-10">
          <div
            v-loading="loading"
            element-loading-text="Loading"
            element-loading-background="rgba(255, 255, 255, 0.9)"
            class="h-full flex justify-center flex-wrap gap-12 overflow-y-auto"
          >
            <div
              class="w-240 h-full flex items-center gap-12"
              v-for="(item, index) in rowArr1"
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
                <p class="fs-24 font-bold text-#29fcff">
                  {{ !isNull(item.value) ? item.value : '暂无数据' }}
                </p>
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
            v-loading="loading"
            element-loading-text="Loading"
            element-loading-background="rgba(255, 255, 255, 0.9)"
            class="h-full flex justify-center flex-wrap gap-12 overflow-y-auto"
          >
            <div
              class="w-240 h-full flex items-center gap-12"
              v-for="(item, index) in rowArr2"
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
                <p class="fs-24 font-bold text-#29fcff">
                  {{ !isNull(item.value) ? item.value : '暂无数据' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </dv-border-box10>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import { option1, option2 } from './config'
import { reqImportantData } from '@/api/screen'
import type { ScreenImportantData } from '@/api/screen/type'

const loading = ref(false)
const rowArr1 = ref()
const rowArr2 = ref()

const fetch = async () => {
  loading.value = true
  try {
    const { data } = await reqImportantData()
    rowArr1.value = Object.keys(option1).map((key) => {
      return {
        ...option1[key],
        value: data[key as keyof ScreenImportantData],
      }
    })
    rowArr2.value = Object.keys(option2).map((key) => {
      return {
        ...option2[key],
        value: data[key as keyof ScreenImportantData],
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const isNull = (val: string | number) => {
  return val === '' || val === null || val === undefined
}

onMounted(() => {
  fetch()
})
</script>

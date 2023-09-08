<template>
  <div class="h-full">
    <dv-border-box10>
      <div class="h-full relative">
        <p class="absolute w-full t-10 text-white fs-16 font-bold text-center">
          本月访问人次
        </p>
        <div class="h-full p-10 flex justify-center items-center">
          <dv-decoration9 style="width: 240px; height: 240px">
            <dv-digital-flop :config="config" />
          </dv-decoration9>
        </div>
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  BorderBox10 as DvBorderBox10,
  Decoration9 as DvDecoration9,
  DigitalFlop as DvDigitalFlop,
} from '@kjgl77/datav-vue3'
import { countVisitsThisMonth } from '@/api/screen'

let timer: number
const config = ref({
  number: [0],
  content: '{nt}人次',
})

const fetchData = async () => {
  const { data } = await countVisitsThisMonth()
  config.value.number[0] = data
}

onMounted(() => {
  fetchData()
  timer = setInterval(() => {
    fetchData()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

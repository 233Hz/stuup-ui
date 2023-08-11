<template>
  <div class="h-full">
    <dv-border-box10>
      <div class="h-full p-10">
        <div ref="chartRef" class="w-full h-full" />
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref()

watch(
  dataArr,
  (newVal) => {
    chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: number[]): echarts.EChartOption => {
  return {
    title: {
      text: '每日访问量',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data,
        type: 'line',
      },
    ],
  }
}

onMounted(() => {
  echarts.registerTheme('CustomTheme', CustomTheme)
  chart = echarts.init(chartRef.value, 'CustomTheme')
  dataArr.value = Array.from({ length: 7 }).map((_) => {
    return Math.round(Math.random() * 100)
  })
})
</script>

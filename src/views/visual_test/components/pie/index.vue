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

watch(dataArr, (newVal) => chart.setOption(update(newVal)), { deep: true })

const update = (data: number[]): echarts.EChartOption => {
  return {
    title: {
      text: '各类竞赛获奖人数',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: 0,
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
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

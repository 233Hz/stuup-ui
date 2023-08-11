<template>
  <div ref="chartRef" class="w-full h-300"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const getVirtualData = (year: string) => {
  const date = +echarts.time.parse(year + '-01-01')
  const end = +echarts.time.parse(+year + 1 + '-01-01')
  const dayTime = 3600 * 24 * 1000
  const data = []
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10),
    ])
  }
  return data
}

const chartRef = ref()
const option = ref({
  tooltip: {},
  visualMap: {
    min: 0,
    max: 10,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65,
  },
  calendar: {
    top: 120,
    left: 30,
    right: 30,
    cellSize: ['auto', 15],
    range: '2023',
    itemStyle: {
      borderWidth: 0.5,
    },
    dayLabel: { nameMap: 'ZH' },
    monthLabel: { nameMap: 'ZH' },
    yearLabel: { show: false },
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: getVirtualData('2023'),
  },
})

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  option.value && chart.setOption(option.value)
})
</script>

<template>
  <div class="w-full h-400" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref()
const option = {
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['第1学期', '第2学期', '第3学期', '第4学期', '第5学期', '第6学期'],
  },
  yAxis: {
    type: 'value',
    inverse: true,
  },
  series: [
    {
      data: [567, 32, 45, 21, 1, 2000],
      type: 'line',
      label: {
        show: true,
        formatter: '{c} 名',
      },
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  option && chart.setOption(option)
})
</script>

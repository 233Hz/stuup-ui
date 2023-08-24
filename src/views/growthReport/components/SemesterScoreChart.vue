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
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1100],
      type: 'line',
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
  ],
}

onMounted(() => {
  // const chart = echarts.init(chartRef.value)
  // option && chart.setOption(option)
})
</script>

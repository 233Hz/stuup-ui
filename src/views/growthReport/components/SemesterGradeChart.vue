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
  legend: {},
  xAxis: {
    type: 'category',
    data: ['第1学期', '第2学期', '第3学期', '第4学期', '第5学期', '第6学期'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '课程1',
      data: [95, 85, 74, 68, 91, 71],
      type: 'bar',
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
    {
      name: '课程2',
      data: [83, 78, 86, 65, 79, 88],
      type: 'bar',
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
    {
      name: '课程3',
      data: [96, 65, 80, 85, 73, 75],
      type: 'bar',
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
    {
      name: '课程4',
      data: [83, 79, 93, 75, 95, 92],
      type: 'bar',
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
    {
      name: '课程5',
      data: [88, 86, 78, 71, 82, 97],
      type: 'bar',
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
    {
      name: '课程6',
      data: [70, 78, 87, 97, 75, 68],
      type: 'bar',
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
    {
      name: '课程7',
      data: [76, 96, 65, 95, 90, 85],
      type: 'bar',
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

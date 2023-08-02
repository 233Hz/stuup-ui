<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
const xData = ['2020上学期', '2020下学期', '2021上学期', '2021下学期', '2022上学期', '2022下学期'];
const data = Array.from({ length: 7 }, (_, index) => {
  return Math.floor(Math.random() * 50 + 50);
});

const chartRef = ref();
const option = ref({
  xAxis: {
    type: 'category',
    data: xData,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      label: {
        show: true,
        formatter: '{c} 分',
        fontSize: 18,
        color: '#03aa8c',
      },
      data: data,
      type: 'line',
      smooth: true,
    },
  ],
});

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option.value && chart.setOption(option.value);
});
</script>

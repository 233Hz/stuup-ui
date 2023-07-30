<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const data = Array.from({ length: 7 }, (_, index) => {
  return Math.floor(Math.random() * 1000 + 200);
});

const chartRef = ref();
const option = ref({
  xAxis: {
    type: 'category',
    data: ['第一学期', '第二学期', '第三学期', '第四学期', '第五学期', '第六学期'],
  },
  yAxis: {
    type: 'value',
    inverse: true,
  },
  series: [
    {
      label: {
        show: true,
        formatter: ({ value }: { value: number }) => {
          return `${value} 名(${Math.floor(Math.random() * 1000 + 500)}分)`;
        },
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
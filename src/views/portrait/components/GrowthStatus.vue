<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref();

const data = Array.from({ length: 6 }, (_, index) => {
  const result = Math.floor(Math.random() * 100);
  if (Math.random() > 0.5) {
    return result;
  } else {
    return -result;
  }
});

const option = ref({
  xAxis: {
    type: 'category',
    name: '平均值',
    boundaryGap: false,
    data: ['第一学期', '第二学期', '第三学期', '第四学期', '第五学期', '第六学期'],
  },
  yAxis: {
    type: 'value',
    // interval: 5,
  },
  series: [
    {
      data: data,
      type: 'line',
      areaStyle: {},
      smooth: true,
      label: {
        show: true,
        formatter: '{c} 分',
      },
    },
  ],
});

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option.value && chart.setOption(option.value);
});
</script>

<style scoped lang="scss"></style>

<template>
  <div style="color: #00866e" ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref();
const xData = ['2020上学期', '2020下学期', '2021上学期', '2021下学期', '2022上学期', '2022下学期'];
const data = Array.from({ length: 6 }, (_, index) => {
  const result = Math.floor(Math.random() * 100);
  if (Math.random() > 0.5) {
    return result;
  } else {
    return -result;
  }
});

let option: echarts.EChartsOption = {
  xAxis: {
    type: 'category',
    name: '全校成长平均值',
    boundaryGap: false,
    data: xData,
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
        position: 'insideBottomLeft',
        fontSize: 18,
        color: '#03bb9a',
      },
    },
  ],
  areaStyle: {
    color: '#a9df96',
  },
};

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option && chart.setOption(option);
});
</script>

<style scoped lang="scss"></style>

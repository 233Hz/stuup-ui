<template>
  <div ref="chartRef" class="w-full h-400" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref();

const data1 = Array.from({ length: 7 }, (_, index) => {
  return Math.floor(Math.random() * 50 + 50);
});
const data2 = Array.from({ length: 7 }, (_, index) => {
  return Math.floor(Math.random() * 50 + 50);
});

const option = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
  },
  radar: {
    shape: 'circle',
    indicator: [
      { name: '课程1', max: 100 },
      { name: '课程2', max: 100 },
      { name: '课程3', max: 100 },
      { name: '课程4', max: 100 },
      { name: '课程5', max: 100 },
      { name: '课程6', max: 100 },
      { name: '课程7', max: 100 },
    ],
  },
  series: [
    {
      name: '课程成绩',
      type: 'radar',
      data: [
        {
          value: data1,
          name: '课程成绩',
        },
        {
          value: data2,
          name: '平均成绩',
        },
      ],
    },
  ],
});

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option.value && chart.setOption(option.value);
});
</script>

<style scoped lang="scss"></style>

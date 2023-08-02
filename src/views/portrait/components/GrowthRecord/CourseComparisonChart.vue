<template>
  <div ref="chartRef" class="w-full h-400" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref();

const indicator = ['课程1', '课程2', '课程3', '课程4', '课程5', '课程6', '课程7'];
const data = indicator.map(item => {
  const value = Math.floor(Math.random() * 80 + 20);
  return {
    name: `${item}(${value}分)`,
    max: 100,
    value,
  };
});

const indicatorData = data.map(({ name, max }) => {
  return { name, max };
});

const values = data.map(({ value }) => value);

let option: echarts.EChartOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
  },
  radar: {
    shape: 'circle',
    indicator: indicatorData,
    axisName: {
      fontSize: 18,
      color: '#03aa8c',
    },
  },
  series: [
    {
      name: '课程成绩',
      type: 'radar',
      data: [
        {
          value: values,
          name: '课程成绩',
        },
      ],
    },
  ],
};

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option && chart.setOption(option);
});
</script>

<style scoped lang="scss"></style>

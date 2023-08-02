<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const indicator = ['道德与公民素养', '技能与学习素养', '运动与身心健康', '审美与艺术修养', '劳动与职业素养'];
const data = indicator.map(item => {
  const value = Math.floor(Math.random() * 1500 + 200);
  return {
    name: `${item}(${value}分)`,
    max: 1000,
    value,
  };
});

const indicatorData = data.map(({ name, max }) => {
  return { name, max };
});

const values = data.map(({ value }) => value);

const chartRef = ref();
let option: echarts.EChartOption = {
  tooltip: {
    trigger: 'item',
  },
  grid: {
    top: '50%',
    bottom: '50%',
    left: '50%',
    right: '50%',
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
      name: '成长综合评价',
      type: 'radar',
      data: [
        {
          value: values,
          name: '成长方向',
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
